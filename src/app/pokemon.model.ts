

export interface Pokemon {
  id : number;
  name: string; 
  life: number; 
  picture : string; 
  dammage : number ;
  types : string[] ;
  created_at : Date;
  
  


}
export type PokemonList = Pokemon[];
export function getPokemonColor(type: string): string {
  switch (type) {
    case 'fire':
      return 'red';
    case 'water':
      return 'blue';
    case 'grass':
      return 'green';
    case 'electric':
      return 'yellow';
    case 'psychic':
      return 'purple';
    case 'ice':
      return 'lightblue';
    case 'dragon':
      return 'orange';
    case 'dark':
      return 'black';
    case 'fairy':
      return 'pink';
    case 'unknown':
      return 'gray';
    default:
      return 'white';
  }

  
}

export const POKEMON_RULES = {
  NAME_PATTERN: /^[a-zA-Z0-9 ]*$/, 
   MAX_NAME: 20,
  MIN_NAME: 3,
  MAX_LIFE: 30,
  HIGH_LIFE: 25,
  LOW_LIFE: 15,
  MIN_LIFE: 10,
  MAX_DAMAGE: 10,
  MIN_DAMAGE: 1,
  MIN_TYPES: 1,
  MAX_TYPES: 3,
}as const;