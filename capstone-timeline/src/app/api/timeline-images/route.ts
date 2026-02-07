import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.heic'];

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

// Extract number from filename for sorting (e.g., "photo_1.jpg" -> 1, "2_image.png" -> 2)
function extractNumber(filename: string): number {
  const match = filename.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');
    
    if (!folder) {
      return NextResponse.json({ images: [], error: 'Folder parameter required' }, { status: 400 });
    }

    // Sanitize folder name to prevent directory traversal
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9-_ ]/g, '');
    const folderPath = path.join(process.cwd(), 'public', 'images', 'timeline', sanitizedFolder);
    
    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files in the folder
    const files = fs.readdirSync(folderPath);
    
    // Filter only image files and sort by number in filename
    const imageFiles = files
      .filter(file => isImageFile(file))
      .sort((a, b) => extractNumber(a) - extractNumber(b));

    // Create image URLs
    const images = imageFiles.map(file => `/images/timeline/${sanitizedFolder}/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading timeline images:', error);
    return NextResponse.json({ images: [], error: 'Failed to load images' }, { status: 500 });
  }
}
