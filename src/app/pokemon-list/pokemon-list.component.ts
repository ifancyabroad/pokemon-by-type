import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

	currentPokemonList$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
  	this.updatePokemonList('normal');
  }

  updatePokemonList(type) {
  	this.data.getPokemonByType(type).subscribe(data => {
  		this.currentPokemonList$ = data['pokemon']
  	});
  }
}
