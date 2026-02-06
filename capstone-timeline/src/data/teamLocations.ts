// Team member locations across Portugal
// You can easily add, remove, or modify locations here

export interface TeamLocation {
  id: number;
  city: string;
  x: number; // SVG coordinate
  y: number; // SVG coordinate
  memberCount: number;
  memberNames?: string[]; // Optional: Add specific team member names
}

export const teamLocations: TeamLocation[] = [
  {
    id: 1,
    city: 'Porto',
    x: 140,
    y: 195,
    memberCount: 3,
    memberNames: ['Team Member 1', 'Team Member 2', 'Team Member 3'],
  },
  {
    id: 2,
    city: 'Coimbra',
    x: 165,
    y: 310,
    memberCount: 2,
    memberNames: ['Team Member 4', 'Team Member 5'],
  },
  {
    id: 3,
    city: 'Braga',
    x: 200,
    y: 100,
    memberCount: 1,
    memberNames: ['Team Member 6'],
  },
  {
    id: 4,
    city: 'Faro',
    x: 128,
    y: 640,
    memberCount: 2,
    memberNames: ['Team Member 7', 'Team Member 8'],
  },
  {
    id: 5,
    city: 'Évora',
    x: 185,
    y: 510,
    memberCount: 1,
    memberNames: ['Team Member 9'],
  },
  // Add more locations as needed:
  // {
  //   id: 6,
  //   city: 'Aveiro',
  //   x: 135,
  //   y: 240,
  //   memberCount: 2,
  //   memberNames: ['Team Member 10', 'Team Member 11'],
  // },
];

// Cisco office location in Lisbon
export const ciscoLocation = {
  city: 'Lisbon',
  address: 'Cisco Office Lisbon',
  x: 140,
  y: 460,
};
