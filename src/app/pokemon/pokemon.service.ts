import { Injectable } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {
  getPokemonList(): Pokemon[]{
    return POKEMONS;
  }
  getPokemonById(id:number): Pokemon|undefined{
    return POKEMONS.find(p => p.id == id);
  }
  getPokemonTypeList():string[]{
    return [
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy',
      'Plante' 
    ]
  }
}
