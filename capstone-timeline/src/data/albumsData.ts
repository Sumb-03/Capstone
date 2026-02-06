// Albums data for the photo gallery
// Replace with your actual team photos

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

export const albums: Album[] = [
  {
    id: 'team-building',
    title: 'Team Building',
    description: 'Fun moments during our team building activities',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
    photos: [
      {
        id: 'tb-1',
        src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
        alt: 'Team building activity',
        caption: 'Team bonding session',
        date: 'October 2025',
      },
      {
        id: 'tb-2',
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
        alt: 'Team collaboration',
        caption: 'Working together',
        date: 'October 2025',
      },
      {
        id: 'tb-3',
        src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop',
        alt: 'Team meeting',
        caption: 'Planning session',
        date: 'October 2025',
      },
    ],
  },
  {
    id: 'office-life',
    title: 'Office Life',
    description: 'Day-to-day moments at Cisco Lisbon',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    photos: [
      {
        id: 'ol-1',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        alt: 'Office space',
        caption: 'Our workspace',
        date: 'November 2025',
      },
      {
        id: 'ol-2',
        src: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&h=600&fit=crop',
        alt: 'Office building',
        caption: 'Cisco Lisbon office',
        date: 'November 2025',
      },
      {
        id: 'ol-3',
        src: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&h=600&fit=crop',
        alt: 'Meeting room',
        caption: 'Collaboration space',
        date: 'November 2025',
      },
      {
        id: 'ol-4',
        src: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop',
        alt: 'Break area',
        caption: 'Taking a break',
        date: 'December 2025',
      },
    ],
  },
  {
    id: 'project-milestones',
    title: 'Project Milestones',
    description: 'Celebrating our achievements',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    photos: [
      {
        id: 'pm-1',
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
        alt: 'Team celebration',
        caption: 'First milestone completed!',
        date: 'December 2025',
      },
      {
        id: 'pm-2',
        src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
        alt: 'Presentation',
        caption: 'Mid-project review',
        date: 'January 2026',
      },
      {
        id: 'pm-3',
        src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
        alt: 'Success celebration',
        caption: 'Project completion',
        date: 'February 2026',
      },
    ],
  },
  {
    id: 'portugal-exploration',
    title: 'Exploring Portugal',
    description: 'Discovering the beauty of our home country',
    coverImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop',
    photos: [
      {
        id: 'pe-1',
        src: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop',
        alt: 'Lisbon view',
        caption: 'Beautiful Lisbon',
        date: 'September 2025',
      },
      {
        id: 'pe-2',
        src: 'https://images.unsplash.com/photo-1513735492246-483525079686?w=800&h=600&fit=crop',
        alt: 'Porto riverside',
        caption: 'Porto Ribeira',
        date: 'October 2025',
      },
      {
        id: 'pe-3',
        src: 'https://images.unsplash.com/photo-1534476478164-b15fec4f091c?w=800&h=600&fit=crop',
        alt: 'Portuguese coast',
        caption: 'Coastal beauty',
        date: 'November 2025',
      },
      {
        id: 'pe-4',
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        alt: 'Portuguese architecture',
        caption: 'Historic charm',
        date: 'December 2025',
      },
    ],
  },
];
