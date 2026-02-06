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

export interface TimelineData {
  title: string;
  subtitle?: string;
  events: TimelineEvent[];
}
