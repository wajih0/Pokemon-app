import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-list.fake';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export abstract class PokemonService {
  abstract getPokemonList(): Observable<PokemonList>;
  abstract getPokemonById(id: number): Observable<Pokemon>;
  abstract updatePokemon(pokemon: Pokemon): Observable<Pokemon>;
  abstract deletePokemon(pokemonId: number): Observable<void>;
  abstract addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon>;
  abstract getPokemonTypeList(): string[];
}


