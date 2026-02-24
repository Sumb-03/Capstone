export interface TimelineLinkedAlbum {
  folder: string;
  title: string;
  images: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  images?: string[];  // Multiple images for carousel
  imageFolder?: string;  // Folder name in public/images/timeline/
  albumFolder?: string; // Optional folder name in public/albums/
  albumFolders?: string[]; // Optional multiple album folders for showcase events
  linkedAlbums?: TimelineLinkedAlbum[]; // Resolved linked albums with image lists
  icon?: string;
  color?: string;
  category?: string;
}

export interface TimelineData {
  title: string;
  subtitle?: string;
  events: TimelineEvent[];
}
