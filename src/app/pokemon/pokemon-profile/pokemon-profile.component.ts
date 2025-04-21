import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-pokemon-profile',
  imports: [RouterLink,DatePipe],
  templateUrl:'./pokemon-profile.component.html',
  styles: ``,
  standalone: true,
})
export class PokemonProfileComponent {
readonly router = inject(ActivatedRoute);
readonly route= inject(Router);
readonly pokemonservice = inject(PokemonService); 

readonly pokemonId =
    Number(this.router.snapshot.paramMap.get('id'));
    
    readonly pokemon = toSignal(
      this.pokemonservice.getPokemonById(this.pokemonId),
      { initialValue: null }
    );

    constructor(private routerService: Router) {
      if (!this.pokemonId) {
      console.error('Pokemon ID not found or invalid');
      this.routerService.navigate(['/not-found']); // Navigate to a "not-found" route
      } else {
      this.pokemonservice.getPokemonById(this.pokemonId).subscribe({
        next: (pokemon) => {
        if (!pokemon) {
          console.error('Pokemon not found');
          this.routerService.navigate(['/not-found']); // Navigate to a "not-found" route
        }
        },
        error: (err) => {
        console.error('Error fetching Pokemon:', err);
        this.routerService.navigate(['/not-found']); // Navigate to a "not-found" route
        },
      });
      }
    }
 
  deletePokemon() {
    this.pokemonservice.deletePokemon(this.pokemonId).subscribe(()=> {
      this.route.navigate(['/pokemons']);
    });
  }

  
  
 



}
