export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  images?: string[];  // Multiple images for carousel
  imageFolder?: string;  // Folder name in public/images/timeline/
  icon?: string;
  color?: string;
  category?: string;
}

export interface TimelineData {
  title: string;
  subtitle?: string;
  events: TimelineEvent[];
}
