import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
}

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.heic'];

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function generateId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export async function GET() {
  try {
    const albumsDir = path.join(process.cwd(), 'public', 'albums');
    
    // Check if albums directory exists
    if (!fs.existsSync(albumsDir)) {
      return NextResponse.json({ albums: [] });
    }

    // Read all folders in the albums directory
    const entries = fs.readdirSync(albumsDir, { withFileTypes: true });
    const albumFolders = entries.filter(entry => entry.isDirectory());

    const albums: Album[] = albumFolders.map(folder => {
      const folderPath = path.join(albumsDir, folder.name);
      const files = fs.readdirSync(folderPath);
      
      // Filter only image files
      const imageFiles = files.filter(file => isImageFile(file));
      
      // Create photos array
      const photos: Photo[] = imageFiles.map((file, index) => {
        const fileName = path.basename(file, path.extname(file));
        return {
          id: `${generateId(folder.name)}-${index + 1}`,
          src: `/albums/${folder.name}/${file}`,
          alt: fileName.replace(/[-_]/g, ' '),
          caption: fileName.replace(/[-_]/g, ' '),
        };
      });

      // Use first image as cover, or a placeholder
      const coverImage = photos.length > 0 
        ? photos[0].src 
        : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop';

      return {
        id: generateId(folder.name),
        title: folder.name,
        description: `Photos from ${folder.name}`,
        coverImage,
        photos,
      };
    });

    // Sort albums alphabetically
    albums.sort((a, b) => a.title.localeCompare(b.title));

    return NextResponse.json({ albums });
  } catch (error) {
    console.error('Error reading albums:', error);
    return NextResponse.json({ albums: [], error: 'Failed to load albums' }, { status: 500 });
  }
}
