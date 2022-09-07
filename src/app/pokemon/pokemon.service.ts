import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TemplateBindingParseResult } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http:HttpClient){
  }

  getPokemonList(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList)=>this.log(pokemonList)),
      catchError((error)=>this.handleError(error, []))
      );
  }

  getPokemonById(pokemonId:number): Observable<Pokemon|undefined>{
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap(pokemon=>this.log(pokemon)),
      catchError((error)=>this.handleError(error, undefined))
    );
  }

  searchPokemonList(term:string):Observable<Pokemon[]>{
    // Si l'utilisateur tape moins de 2 caractères, on ne va rien renvoyer
    if(term.length <=1)
    return of([]);
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap(response=>this.log(response)),
      catchError((error)=>this.handleError(error, []))
    );
  }

  addPokemon(pokemon:Pokemon):Observable<Pokemon>{
    const httpOptions={
      headers: new HttpHeaders({'ContentType':'application/json'})
    };
    return this.http.post<Pokemon>(`api/pokemons`, pokemon, httpOptions).pipe(
      tap(pokemon=>this.log(pokemon)),
      catchError((error)=>this.handleError(error, null))
    )
  }

  updatePokemon(pokemon: Pokemon):Observable<null>{
    const httpOptions={
      headers: new HttpHeaders({'ContentType':'application/json'})
    };
    return this.http.put(`api/pokemons`, pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error)=>this.handleError(error,null))
    );
  }

  deletePokemonById(pokemonId:number):Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap(response => this.log(response)),
      catchError((error)=>this.handleError(error,null))
    )
  }

  private log(response: any){
    console.table(response);
  }

  private handleError(error: Error, errorValue:any){
    console.error(error); 
    return of(errorValue);
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
/*
  getPokemonById(pokemonId:number): Observable<Pokemon|undefined>{
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap(pokemon=>console.log(pokemon)),
      catchError((error)=>{
        console.log(error); return of(undefined);
      })
    );
  //  return POKEMONS.find(p => p.id == id);
  }*/
}
