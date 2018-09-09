import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTypes() {
  	return this.http.get('https://pokeapi.co/api/v2/type');
  }

  getPokemonByType(type) {
  	return this.http.get(`https://pokeapi.co/api/v2/type/${type}`);
  }

  getPokemon(name) {
  	return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
