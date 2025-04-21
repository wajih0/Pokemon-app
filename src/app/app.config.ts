import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './pokemon/page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { AddPokemonComponent } from './pokemon/add-pokemon/add-pokemon.component';
import { PokemonService } from './pokemon.service';
import { environment } from '../environments/environment.development';
import { PokemonLocalStorageService } from './pokemon-local-storage.service';
import { PokemonJsonServerService } from './pokemon-json-server.service';
import { ChatbotComponent } from './chatbot/chatbot.component';


export function pokemonServiceFactory(): PokemonService {
  return environment.production
    ? new PokemonLocalStorageService()
    : new PokemonJsonServerService();
}
const routes: Routes = [ 
{path:'pokemons/add',component:AddPokemonComponent,canActivate:[AuthGuard],title:'ajout pokemons'},
{path: 'pokemons/chatbot',component:ChatbotComponent,title:'Pokémon Chatbot',canActivate: [AuthGuard]},
{path: 'pokemons/:id', component: PokemonProfileComponent,canActivate: [AuthGuard]},
{path:'login',component:LoginComponent,title:'connexion'},
{path: 'pokemons', component: PokemonListComponent , title: 'Pokedéx',canActivate: [AuthGuard]},
{path: '', redirectTo: '/pokemons', pathMatch: 'full'},
{path: 'pokemons/edit/:id', component: PokemonEditComponent , title: 'Edit Pokemon',canActivate: [AuthGuard]},
{path: '**', component: PageNotFoundComponent},
];


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: PokemonService,
      useFactory: pokemonServiceFactory,
    },
  ],
};
