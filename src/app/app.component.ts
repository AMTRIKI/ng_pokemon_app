import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list'
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  template: `
      <h1>
        Liste des pokémons
      </h1>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.table(this.pokemonsList);
    this.selectPokemon(this.pokemonsList);
  }
  title = 'ng-pokemon-app';
  pokemonsList = POKEMONS;

  selectPokemon(liste:Pokemon[]){
    this.pokemonsList.forEach (p =>
    console.log(`Vous avez cliqué sur ${p.name}`))
  }
}
