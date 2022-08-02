import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list'
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  pokemonsList : Pokemon[] = POKEMONS;
  pokemonSelected :Pokemon|undefined;

  ngOnInit(): void {
    console.table(this.pokemonsList);
  //  this.selectPokemon(this.pokemonsList[0]);
  }

  selectPokemon(pokemonId:string){
    this.pokemonSelected  = this.pokemonsList.find(p=> p.id == +pokemonId);
    if( this.pokemonSelected  )
     console.log(`Vous avez cliqué sur ${this.pokemonSelected?.name}`)
    else
     console.log("Le pokémon n'existe pas")
  }
}
