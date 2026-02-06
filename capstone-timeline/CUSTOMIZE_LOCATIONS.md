# Customizing Team Locations

This guide explains how to customize the team member locations displayed on the Portugal map.

## Editing Team Locations

1. **Open the teamLocations file**:
   - Navigate to: `src/data/teamLocations.ts`

2. **Add a new location**:
   ```typescript
   {
     id: 6,  // Unique ID
     city: 'Aveiro',  // City name
     x: 330,  // X coordinate on the map (adjust to position)
     y: 240,  // Y coordinate on the map (adjust to position)
     memberCount: 2,  // Number of team members
     memberNames: ['John Doe', 'Jane Smith'],  // Optional: specific names
   }
   ```

3. **Remove a location**:
   - Simply delete the entire object from the array

4. **Update existing locations**:
   - Modify the `memberCount` to change the number displayed
   - Update `memberNames` array to reflect actual team members
   - Adjust `x` and `y` coordinates to reposition pins

## Finding the Right Coordinates

The Portugal map SVG has a viewBox of `0 0 600 700`:
- **X axis**: Runs from 0 (left) to 600 (right)
- **Y axis**: Runs from 0 (top) to 700 (bottom)

**Approximate Guide**:
- **Porto/Braga** (North): x: 300-330, y: 150-200
- **Coimbra/Aveiro** (Center-West): x: 320-350, y: 240-300
- **Lisbon** (Center): x: 370-400, y: 370-390
- **Évora** (Center-East): x: 410-440, y: 400-440
- **Faro** (South): x: 360-400, y: 500-540

## Customizing Cisco Office Location

To change the Cisco office address or position:

```typescript
export const ciscoLocation = {
  city: 'Lisbon',
  address: 'Cisco Office Lisbon',  // Change this text
  x: 385,  // Adjust position
  y: 380,  // Adjust position
};
```

## After Making Changes

1. **Save the file** (`Ctrl+S` or `Cmd+S`)
2. **Reload your browser** - the development server will auto-update
3. **View your changes** on the Portugal map view

## Tips

- Start with small coordinate adjustments (±10-20 pixels)
- Test in the browser after each change
- Use descriptive member names instead of placeholders
- Keep member counts accurate to reflect your actual team size

## Example: Complete Custom Setup

```typescript
export const teamLocations: TeamLocation[] = [
  {
    id: 1,
    city: 'Porto',
    x: 320,
    y: 180,
    memberCount: 5,
    memberNames: ['Alice Silva', 'Bob Santos', 'Carlos Pereira', 'Diana Costa', 'Eduardo Rodrigues'],
  },
  {
    id: 2,
    city: 'Lisbon',
    x: 390,
    y: 360,
    memberCount: 8,
    memberNames: ['Fernanda Alves', 'Gabriel Martins', 'Helena Ferreira', 'Igor Sousa', 'Julia Pinto', 'Kevin Dias', 'Laura Carvalho', 'Miguel Correia'],
  },
  {
    id: 3,
    city: 'Faro',
    x: 380,
    y: 520,
    memberCount: 3,
    memberNames: ['Nuno Oliveira', 'Olga Teixeira', 'Paulo Gomes'],
  },
];
```

Now you're ready to customize your team's locations! 🗺️
