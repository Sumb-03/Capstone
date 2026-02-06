// Team member locations across Portugal
// The city name is used to look up coordinates from CITY_COORDINATES in PortugalMap
// Supported cities: Porto, Braga, Viana do Castelo, Vila Real, Bragança, Guarda,
// Viseu, Aveiro, Coimbra, Castelo Branco, Leiria, Santarém, Portalegre,
// Lisbon/Lisboa, Setúbal, Évora, Beja, Faro

export interface TeamLocation {
  id: number;
  city: string;  // Must match a key in CITY_COORDINATES
  x: number;     // Not used anymore - kept for backwards compatibility
  y: number;     // Not used anymore - kept for backwards compatibility
  memberCount: number;
  memberNames?: string[];
}

export const teamLocations: TeamLocation[] = [
  {
    id: 1,
    city: 'Porto',
    x: 0,  // Not used - coordinates come from CITY_COORDINATES
    y: 0,
    memberCount: 4,
    memberNames: [
      'Diogo Campos',
      'Francisco Inacio',
      'Hugo Dias',
      'Paris Krystallis'
    ],
  },
  {
    id: 2,
    city: 'Aveiro',
    x: 0,
    y: 0,
    memberCount: 1,
    memberNames: [
      'Ricardo Simoes'
    ],
  },
  {
    id: 3,
    city: 'Leiria',
    x: 0,
    y: 0,
    memberCount: 1,
    memberNames: [
      'Jorge Grabovschi'
    ],
  },
  {
    id: 4,
    city: 'Lisboa',
    x: 0,
    y: 0,
    memberCount: 1,
    memberNames: [
      'Joao Estevao'
    ],
  },
];

// Cisco office location - uses city name for coordinates
export const ciscoLocation = {
  city: 'Lisbon',
  address: 'Cisco Office Lisbon',
  x: 0,  // Not used
  y: 0,
};
