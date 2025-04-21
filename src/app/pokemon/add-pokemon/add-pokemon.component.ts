import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { Pokemon, POKEMON_RULES } from '../../pokemon.model';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pokemon',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-pokemon.component.html',
  styles: ``,
  standalone: true,
})
export class AddPokemonComponent {
  readonly route = inject(ActivatedRoute); // Permet d'accéder aux paramètres de l'URL.
  readonly router = inject(Router); // Permet de naviguer entre les routes.
  readonly pokemonService = inject(PokemonService); // Service pour gérer les données des Pokémon.
  readonly Pokemon_Rules = POKEMON_RULES;

  
    // Définition du formulaire avec ses champs et ses validations.
    readonly form = new FormGroup({
      name: new FormControl('', [
        Validators.required, // Champ obligatoire.
        Validators.maxLength(POKEMON_RULES.MAX_NAME), // Longueur maximale.
        Validators.minLength(POKEMON_RULES.MIN_NAME), // Longueur minimale.
        Validators.pattern(POKEMON_RULES.NAME_PATTERN), // Doit respecter un motif spécifique.
      ]),
      picture: new FormControl('', [Validators.required]),
    life: new FormControl(10),
    damage: new FormControl(1),
    types: new FormArray([new FormControl('Normal')], [Validators.required, Validators.maxLength(3)]),
    });
  

    onSubmit() {
      Object.values(this.form.controls).forEach(control => control.markAsDirty());
  
      if(this.form.invalid) {
        return;
      }
  
      const pokemon: Omit<Pokemon, 'id'> = {
        name: this.PokemonName.value,
        picture: this.PokemonPicture.value,
        life: this.PokemonLife.value,
        dammage: this.PokemonDamage.value,
        types: this.pokemonTypeList.controls.map(control => control.value) as [string, string, string],
        created_at: new Date()
      };
  
      this.pokemonService.addPokemon(pokemon).subscribe((pokemonAdded) => {
        this.router.navigate(['/pokemons', pokemonAdded.id]);
      });
    }
  
    get PokemonPicture() {
      return this.form.get('picture') as FormControl;
    }

    // Getter pour accéder au champ `damage`.
    get PokemonDamage() {
      return this.form.get('damage') as FormControl;
    }
  
    // Incrémente la valeur des dégâts.
    incrementdamage() {
      const newValue = this.PokemonDamage.value + 1;
      this.PokemonDamage.setValue(newValue);
    }
  
    // Décrémente la valeur des dégâts.
    decrementdamage() {
      const newValue = this.PokemonDamage.value - 1;
      this.PokemonDamage.setValue(newValue);    }
  
    // Getter pour accéder au champ `life`.
    get PokemonLife() {
      return this.form.get('life') as FormControl;
    }
  
    // Incrémente la valeur de la vie.
    incrementlife() {
      const newValue = this.PokemonLife.value + 1;
      this.PokemonLife.setValue(newValue);

    }
  
    // Décrémente la valeur de la vie.
    decrementlife() {
      const newValue = this.PokemonLife.value - 1;
      this.PokemonLife.setValue(newValue);    }
  
    // Getter pour accéder au champ `name`.
    get PokemonName() {
      return this.form.get('name') as FormControl;
    }
  
    // Getter pour accéder à la liste des types.
    get pokemonTypeList() {
      return this.form.get('types') as FormArray;
    }
  
    // Vérifie si un type est déjà sélectionné.
    ispokemonTypeListSelected(type: string) {
      return !!this.pokemonTypeList.controls.find((control) => control.value === type);
    }
  
    // Ajoute ou retire un type de la liste en fonction de l'état (coché/décoché).
    onpokemonTypeListChange(type: string, isChecked: boolean) {
      if (isChecked) {
        const control = new FormControl(type);
        this.pokemonTypeList.push(control);
      } else {
        const index = this.pokemonTypeList.controls
          .map((control) => control.value)
          .indexOf(type);
        this.pokemonTypeList.removeAt(index);
      }
    }
  
  


}
