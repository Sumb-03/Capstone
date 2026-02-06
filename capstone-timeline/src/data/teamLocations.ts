// Team member locations across Portugal
// Coordinates are percentages (0-100) relative to the visible mainland map
// x: 0 = left edge of mainland, 100 = right edge
// y: 0 = top (north), 100 = bottom (south)

export interface TeamLocation {
  id: number;
  city: string;
  x: number; // Percentage position (0-100)
  y: number; // Percentage position (0-100)
  memberCount: number;
  memberNames?: string[]; // Optional: Add specific team member names
}

export const teamLocations: TeamLocation[] = [
  {
    id: 1,
    city: 'Porto',
    x: 35,
    y: 12,
    memberCount: 3,
    memberNames: ['Team Member 1', 'Team Member 2', 'Team Member 3'],
  },
  {
    id: 2,
    city: 'Coimbra',
    x: 45,
    y: 22,
    memberCount: 2,
    memberNames: ['Team Member 4', 'Team Member 5'],
  },
  {
    id: 3,
    city: 'Braga',
    x: 32,
    y: 7,
    memberCount: 1,
    memberNames: ['Team Member 6'],
  },
  {
    id: 4,
    city: 'Faro',
    x: 55,
    y: 90,
    memberCount: 2,
    memberNames: ['Team Member 7', 'Team Member 8'],
  },
  {
    id: 5,
    city: 'Évora',
    x: 58,
    y: 68,
    memberCount: 1,
    memberNames: ['Team Member 9'],
  },
  // Add more locations as needed:
  // {
  //   id: 6,
  //   city: 'Aveiro',
  //   x: 38,
  //   y: 18,
  //   memberCount: 2,
  //   memberNames: ['Team Member 10', 'Team Member 11'],
  // },
];

// Cisco office location in Lisbon
// Coordinates are percentages (0-100) relative to the visible mainland map
export const ciscoLocation = {
  city: 'Lisbon',
  address: 'Cisco Office Lisbon',
  x: 35,
  y: 55,
};
