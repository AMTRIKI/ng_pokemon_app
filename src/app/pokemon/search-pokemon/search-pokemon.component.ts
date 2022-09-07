import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {
// saerchTErms va sauvegarder l'ensemble des recherches lancées par l'utilisateur
// a... ab ... abe
  searchTerms =new Subject<string>();
// On aura ici les résultats des recherches
// pokemonList(a)... pokemonList(ab)...
  pokemons$: Observable<Pokemon[]>;

  constructor(private router:Router,
    private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.pokemonService.searchPokemonList(term))
    )
  }

  search(term:string){
    // A chaque fois qu'un nouveau terme est introduit, on va le pousser dans subject
    // Comme si on faisait un push
    this.searchTerms.next(term);
    this.pokemons$= this.pokemonService.searchPokemonList(term); 
     
  }

  gotoDetail(pokemon:Pokemon){
    this.router.navigate(['/pokemon', pokemon.id])
  }

}
