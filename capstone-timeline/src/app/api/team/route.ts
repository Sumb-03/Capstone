import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Match the existing TeamMember interface from membersData.ts
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar?: string;
  skills: string[];
  linkedin?: string;
  credly?: string;
  email?: string;
  hobbies?: string[];
  interests?: string[];
  education?: string;
  quote?: string;
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
    const teamDir = path.join(process.cwd(), 'public', 'team');
    
    // Check if team directory exists
    if (!fs.existsSync(teamDir)) {
      return NextResponse.json({ members: [] });
    }

    // Read all folders in the team directory
    const entries = fs.readdirSync(teamDir, { withFileTypes: true });
    const memberFolders = entries.filter(entry => 
      entry.isDirectory() && !entry.name.startsWith('_') // Skip template folders
    );

    const members: TeamMember[] = [];

    for (const folder of memberFolders) {
      const folderPath = path.join(teamDir, folder.name);
      const infoPath = path.join(folderPath, 'info.json');
      
      // Check if info.json exists
      if (!fs.existsSync(infoPath)) {
        continue;
      }

      try {
        // Read and parse info.json
        const infoContent = fs.readFileSync(infoPath, 'utf-8');
        const info = JSON.parse(infoContent);

        // Skip if it has _instructions (template file)
        if (info._instructions) {
          continue;
        }

        // Find profile image
        const files = fs.readdirSync(folderPath);
        const imageFile = files.find(file => 
          isImageFile(file) && !file.startsWith('.')
        );

        const avatar = imageFile 
          ? `/team/${folder.name}/${imageFile}`
          : undefined;

        const member: TeamMember = {
          id: generateId(folder.name),
          name: info.name || folder.name,
          role: info.role || 'Team Member',
          city: info.city || 'Portugal',
          avatar,
          skills: info.skills || [],
          linkedin: info.linkedin,
          credly: info.credly,
          email: info.email,
          hobbies: info.hobbies,
          interests: info.interests,
          education: info.education,
          quote: info.quote,
        };

        members.push(member);
      } catch (err) {
        console.error(`Error reading member ${folder.name}:`, err);
      }
    }

    // Sort members alphabetically by city, then by name within the same city
    members.sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name));

    return NextResponse.json({ members });
  } catch (error) {
    console.error('Error reading team members:', error);
    return NextResponse.json({ members: [], error: 'Failed to load team members' }, { status: 500 });
  }
}
