import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
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

          // Find an image file in the milestone folder
          const files = fs.readdirSync(milestonePath);
          const imageFile = files.find(file => 
            isImageFile(file) && file !== 'info.json'
          );

          const event: TimelineEvent = {
            id: generateId(monthFolder.name, milestoneFolder.name),
            title: info.title || milestoneFolder.name.replace(/^\d+-/, ''),
            date: info.date || monthFolder.name.replace(/^\d+-/, ''),
            description: info.description || '',
            image: imageFile 
              ? `/timeline/${encodeURIComponent(monthFolder.name)}/${encodeURIComponent(milestoneFolder.name)}/${encodeURIComponent(imageFile)}`
              : info.image,
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
