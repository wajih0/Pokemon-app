import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink ,Router} from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe,JsonPipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  POKEMON_RULES } from '../../pokemon.model';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-pokemon-edit', // Définit le sélecteur HTML pour ce composant.
  imports: [RouterLink, ReactiveFormsModule, JsonPipe], // Modules Angular nécessaires pour ce composant.
  templateUrl: './pokemon-edit.component.html', // Chemin vers le fichier HTML du template.
  styles: ``, // Styles spécifiques au composant (vide ici).
  providers: [PokemonService], // Fournit le service `PokemonService` au composant.
})
export class PokemonEditComponent {
  // Injecte les dépendances nécessaires.
  readonly route = inject(ActivatedRoute); // Permet d'accéder aux paramètres de l'URL.
  readonly router = inject(Router); // Permet de naviguer entre les routes.
  readonly pokemonService = inject(PokemonService); // Service pour gérer les données des Pokémon.

  // Récupère l'ID du Pokémon depuis l'URL.
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));

  // Règles de validation pour les Pokémon.
  readonly Pokemon_Rules = POKEMON_RULES;

  // Signal pour récupérer les données du Pokémon à partir du service.
  readonly pokemon = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId),
  );

  constructor() {
    // Effet déclenché lorsque les données du Pokémon changent.
    effect(() => {
      const pokemon = this.pokemon(); // Récupère les données actuelles du Pokémon.
      if (pokemon) {
        // Initialise le formulaire avec les données du Pokémon.
        this.form.patchValue({
          name: pokemon.name,
          life: String(pokemon.life),
          damage: String(pokemon.dammage),
        });

        // Ajoute les types du Pokémon au formulaire.
        pokemon.types.forEach((type) => {
          const control = new FormControl(type);
          this.pokemonTypeList.push(control);
        });
      }
    });
  }

  // Définition du formulaire avec ses champs et ses validations.
  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required, // Champ obligatoire.
      Validators.maxLength(POKEMON_RULES.MAX_NAME), // Longueur maximale.
      Validators.minLength(POKEMON_RULES.MIN_NAME), // Longueur minimale.
      Validators.pattern(POKEMON_RULES.NAME_PATTERN), // Doit respecter un motif spécifique.
    ]),
    life: new FormControl('', [
      Validators.required,
      Validators.max(POKEMON_RULES.MAX_LIFE),
      Validators.min(POKEMON_RULES.MIN_LIFE),
      Validators.max(POKEMON_RULES.HIGH_LIFE),
      Validators.min(POKEMON_RULES.LOW_LIFE),
    ]),
    damage: new FormControl('', [
      Validators.required,
      Validators.max(POKEMON_RULES.MAX_DAMAGE),
      Validators.min(POKEMON_RULES.MIN_DAMAGE),
    ]),
    types: new FormArray([], [
      Validators.required, // Au moins un type doit être sélectionné.
      Validators.minLength(POKEMON_RULES.MIN_TYPES), // Nombre minimal de types.
      Validators.maxLength(POKEMON_RULES.MAX_TYPES), // Nombre maximal de types.
    ]),
  });

  // Getter pour accéder au champ `damage`.
  get PokemonDamage() {
    return this.form.get('damage') as FormControl;
  }

  // Incrémente la valeur des dégâts.
  incrementdamage() {
    this.PokemonDamage.setValue(this.PokemonDamage.value + 1);
  }

  // Décrémente la valeur des dégâts.
  decrementdamage() {
    this.PokemonDamage.setValue(this.PokemonDamage.value - 1);
  }

  // Getter pour accéder au champ `life`.
  get PokemonLife() {
    return this.form.get('life') as FormControl;
  }

  // Incrémente la valeur de la vie.
  incrementlife() {
    this.PokemonLife.setValue(this.PokemonLife.value + 1);
  }

  // Décrémente la valeur de la vie.
  decrementlife() {
    this.PokemonLife.setValue(this.PokemonLife.value - 1);
  }

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

  // Soumet le formulaire pour mettre à jour le Pokémon.
  onSubmit() {
    const isformValid = this.form.valid; // Vérifie si le formulaire est valide.
    const pokemon = this.pokemon(); // Récupère les données actuelles du Pokémon.
    if (isformValid && pokemon) {
      // Crée un objet Pokémon mis à jour.
      const updatedPokemon = {
        ...pokemon,
        name: this.PokemonName.value,
        life: this.PokemonLife.value,
        dammage: this.PokemonDamage.value,
        types: this.pokemonTypeList.value,
      };

      // Appelle le service pour mettre à jour le Pokémon.
      this.pokemonService.updatePokemon(updatedPokemon).subscribe(() => {
        // Redirige vers la page du Pokémon après la mise à jour.
        this.router.navigate(['/pokemons', pokemon.id]);
      });
    }
  }
}