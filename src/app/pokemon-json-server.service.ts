import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-list.fake';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Injectable({
    providedIn: 'root',
})
export class PokemonJsonServerService implements PokemonService {
    readonly #POKEMON_API_URL = 'http://localhost:3000/pokemons';
    readonly #http = inject(HttpClient);

    getPokemonList(): Observable<PokemonList> {
        return this.#http.get<PokemonList>(this.#POKEMON_API_URL);
    }

    getPokemonTypeList(): string[] {
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

    getPokemons(): Observable<PokemonList> {
        return this.#http.get<PokemonList>(this.#POKEMON_API_URL);
    }

    getPokemonById(id: number): Observable<Pokemon> {
        const POKEMON_API_URL2 = `${this.#POKEMON_API_URL}/${id}`;
        return this.#http.get<Pokemon>(POKEMON_API_URL2);
    }

    updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const POKEMON_API_URL2 = `${this.#POKEMON_API_URL}/${pokemon.id}`;
        return this.#http.put<Pokemon>(POKEMON_API_URL2, pokemon);
    }

    deletePokemon(id: number): Observable<void> {
        const POKEMON_API_URL2 = `${this.#POKEMON_API_URL}/${id}`;
        return this.#http.delete<void>(POKEMON_API_URL2);
    }

    addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
        return this.#http.post<Pokemon>(this.#POKEMON_API_URL, pokemon);
    }


}


