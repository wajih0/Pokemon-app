import { Component, computed, inject, Signal, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PokemonService } from '../../pokemon.service';
import { Pokemon, PokemonList } from '../../pokemon.model';
import { PokemonBorderDirective } from '../../pokemon-border.derective';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective,DatePipe,RouterLink,MatIconModule],
  templateUrl: './pokemon-list.component.html',
  styles: `.pokemon-card{cursor:pointer}`,
  standalone: true,
})
export class PokemonListComponent {
  readonly #pokemonserver = inject(PokemonService);
  readonly PokemonList: Signal<PokemonList | undefined> = toSignal(
    this.#pokemonserver.getPokemonList()
    
  );
    readonly searchTerm =signal('');

  readonly pokemonlistfilred = computed(() => {
    const searchTerm = this.searchTerm();
    const pokemonList = this.PokemonList();
    if (!pokemonList) {
      return []; // Return an empty array if undefined
    }
    return pokemonList.filter((pokemon) => 
      pokemon.name.toLocaleLowerCase().includes(searchTerm.
      trim().toLocaleLowerCase()
    ));

  });

  //readonly loading = computed(() => this.PokemonList.length === 0);

  size(pokemon: Pokemon)  {
    if(pokemon.life < 15 ){ 
    return 'petit'
    }
    if( pokemon.life>25){
      return 'grand'
    }
      return 'moyenne'
  };


  incrementlife(pokemon: Pokemon){
    pokemon.life = pokemon.life + 1;
  }
  decrementlife(pokemon: Pokemon){
    pokemon.life  =pokemon.life - 1;
  }
}
