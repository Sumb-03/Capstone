import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  images?: string[];
  albumFolder?: string;
  albumFolders?: string[];
  linkedAlbums?: {
    folder: string;
    title: string;
    images: string[];
  }[];
  icon?: string;
  color?: string;
  category?: string;
}

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.heic'];

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function extractNumber(filename: string): number {
  const match = filename.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
}

function sanitizeFolderName(folder: string): string {
  const normalized = folder
    .replace(/\\/g, '/')
    .replace(/^\/?public\/?albums\//i, '')
    .replace(/^\/?albums\//i, '')
    .trim();

  const segments = normalized.split('/').filter((segment) => segment.trim().length > 0);
  const folderName = segments.length > 0 ? segments[segments.length - 1] : '';

  return folderName.replace(/[^a-zA-Z0-9-_ ]/g, '').trim();
}

function toDisplayTitle(folder: string): string {
  return folder.replace(/[-_]+/g, ' ').trim();
}

function getAlbumImages(albumFolder: string): string[] {
  const albumPath = path.join(process.cwd(), 'public', 'albums', albumFolder);
  if (!fs.existsSync(albumPath)) {
    return [];
  }

  const albumFiles = fs.readdirSync(albumPath);
  return albumFiles
    .filter((file) => isImageFile(file))
    .sort((a, b) => extractNumber(a) - extractNumber(b))
    .map((file) => toPublicUrl('albums', albumFolder, file));
}

function getAllAlbumFolders(): string[] {
  const albumsRoot = path.join(process.cwd(), 'public', 'albums');
  if (!fs.existsSync(albumsRoot)) {
    return [];
  }

  const entries = fs.readdirSync(albumsRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function toPublicUrl(...segments: string[]): string {
  return `/${segments.map((segment) => encodeURIComponent(segment)).join('/')}`;
}

function extractOrder(name: string): number {
  const match = name.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : 999;
}

function generateId(monthFolder: string, milestoneFolder: string): string {
  return `${monthFolder}-${milestoneFolder}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export async function GET() {
  try {
    const timelineDir = path.join(process.cwd(), 'public', 'timeline');
    
    // Check if timeline directory exists
    if (!fs.existsSync(timelineDir)) {
      return NextResponse.json({ events: [] });
    }

    // Read all month folders in the timeline directory
    const monthEntries = fs.readdirSync(timelineDir, { withFileTypes: true });
    const monthFolders = monthEntries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('_'))
      .sort((a, b) => extractOrder(a.name) - extractOrder(b.name));

    const events: TimelineEvent[] = [];

    for (const monthFolder of monthFolders) {
      const monthPath = path.join(timelineDir, monthFolder.name);
      
      // Read all milestone folders within each month
      const milestoneEntries = fs.readdirSync(monthPath, { withFileTypes: true });
      const milestoneFolders = milestoneEntries
        .filter(entry => entry.isDirectory() && !entry.name.startsWith('_'))
        .sort((a, b) => extractOrder(a.name) - extractOrder(b.name));

      for (const milestoneFolder of milestoneFolders) {
        const milestonePath = path.join(monthPath, milestoneFolder.name);
        const infoPath = path.join(milestonePath, 'info.json');
        
        // Check if info.json exists
        if (!fs.existsSync(infoPath)) {
          continue;
        }

        try {
          // Read and parse info.json
          const infoContent = fs.readFileSync(infoPath, 'utf-8');
          const info = JSON.parse(infoContent);

          // Find images in the milestone folder
          const files = fs.readdirSync(milestonePath);
          const eventFolderImages = files
            .filter((file) => isImageFile(file) && file !== 'info.json')
            .sort((a, b) => extractNumber(a) - extractNumber(b))
            .map((file) =>
              toPublicUrl('timeline', monthFolder.name, milestoneFolder.name, file)
            );

          // Optional linked album folder (public/albums/<folder>)
          const albumFolder = typeof info.albumFolder === 'string'
            ? sanitizeFolderName(info.albumFolder)
            : '';

          const albumFoldersFromInfo = Array.isArray(info.albumFolders)
            ? info.albumFolders
                .filter((folder: unknown): folder is string => typeof folder === 'string')
                .map((folder: string) => sanitizeFolderName(folder))
                .filter((folder: string) => folder.length > 0)
            : [];

          const includeAllAlbums = info.includeAllAlbums === true;
          const allAlbumFoldersFromDisk = includeAllAlbums ? getAllAlbumFolders() : [];

          const allAlbumFolders = Array.from(
            new Set([
              ...allAlbumFoldersFromDisk,
              ...albumFoldersFromInfo,
              ...(albumFolder ? [albumFolder] : []),
            ])
          );

          const linkedAlbums = allAlbumFolders
            .map((folder) => {
              const images = getAlbumImages(folder);
              if (images.length === 0) {
                return null;
              }

              return {
                folder,
                title: toDisplayTitle(folder),
                images,
              };
            })
            .filter((album): album is { folder: string; title: string; images: string[] } => album !== null);

          const albumImages = linkedAlbums.flatMap((album) => album.images);

          // Optional custom images in info.json
          const jsonImages = Array.isArray(info.images)
            ? info.images.filter((img: unknown): img is string => typeof img === 'string' && img.length > 0)
            : [];

          const combinedImages = [...eventFolderImages, ...albumImages, ...jsonImages];
          if (typeof info.image === 'string' && info.image.length > 0) {
            combinedImages.push(info.image);
          }

          const uniqueImages = Array.from(new Set(combinedImages));

          const event: TimelineEvent = {
            id: generateId(monthFolder.name, milestoneFolder.name),
            title: info.title || milestoneFolder.name.replace(/^\d+-/, ''),
            date: info.date || monthFolder.name.replace(/^\d+-/, ''),
            description: info.description || '',
            image: uniqueImages[0],
            images: uniqueImages.length > 0 ? uniqueImages : undefined,
            albumFolder: albumFolder || undefined,
            albumFolders: allAlbumFolders.length > 0 ? allAlbumFolders : undefined,
            linkedAlbums: linkedAlbums.length > 0 ? linkedAlbums : undefined,
            icon: info.icon,
            color: info.color,
            category: info.category,
          };

          events.push(event);
        } catch (parseError) {
          console.error(`Error parsing info.json for ${milestoneFolder.name}:`, parseError);
        }
      }
    }

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error reading timeline data:', error);
    return NextResponse.json(
      { error: 'Failed to load timeline data' },
      { status: 500 }
    );
  }
}
