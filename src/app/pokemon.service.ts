import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-list.fake';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn:'root',
  }
)
export class PokemonService {
  readonly #POKEMON_API_URL = 'http://localhost:3000/pokemons';
  readonly #http = inject(HttpClient);

  getPokemons(): Observable<PokemonList> {
    return this.#http.get<PokemonList>(this.#POKEMON_API_URL);
  }
  
  getPokemonById(id: number): Observable<Pokemon> {
    const POKEMON_API_URL2 = this.#POKEMON_API_URL + '/'+ id;
    return this.#http.get<Pokemon>(POKEMON_API_URL2);
    
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const POKEMON_API_URL2 = this.#POKEMON_API_URL + '/' + pokemon.id; // Construit l'URL pour mettre à jour un Pokémon spécifique.
    return this.#http.put<Pokemon>(POKEMON_API_URL2, pokemon); // Effectue une requête PUT pour envoyer les données mises à jour.
  }

  deletePokemon(id : number): Observable<void> {
    const POKEMON_API_URL2 = this.#POKEMON_API_URL + '/'+ id;
    return this.#http.delete<void>(POKEMON_API_URL2);
  }
addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
return this.#http.post<Pokemon>(this.#POKEMON_API_URL, pokemon); // Effectue une requête POST pour envoyer les données du nouveau Pokémon.
}

  getpokemontypes(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',    
      'Poison',
      'Fée',
      'Vol',
    ];
   
  }

  


}


