import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http:HttpClient){

  }
  getPokemonList(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList)=>console.table(pokemonList)),
      catchError((error=>{
        console.log(error); 
        return of([])
      }))
    );
   // return POKEMONS;
  }
  getPokemonById(pokemonId:number): Observable<Pokemon|undefined>{
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap(pokemon=>console.log(pokemon)),
      catchError((error)=>{
        console.log(error); return of(undefined);
      })
    );
  //  return POKEMONS.find(p => p.id == id);
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
