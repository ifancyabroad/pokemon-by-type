import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  animations: [
    trigger('listStagger', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('out => in', [     
        style({opacity: 0, transform: 'translateX(25px)'}),
        animate('550ms ease-out')
      ]),
      transition('in => out', [
        animate('550ms ease-out', style({opacity: 0, transform: 'translateX(25px)'}))
      ])
    ])
  ]
})
export class PokemonListComponent implements OnInit {

	currentPokemonList$: Object;
  currentType$: string = 'normal';
  listState$: string = 'out';

  constructor(private data: DataService) { }

  ngOnInit() {
  	this.updatePokemonList('normal');
    this.toggleState();
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  updatePokemonList(type) {
  	this.data.getPokemonByType(type).subscribe(data => {
      data['pokemon'].forEach((item) => {
        item.pokemon.name = this.capitalizeFirstLetter(item.pokemon.name);
      });
    this.toggleState();
    setTimeout(() => {
      this.currentType$ = type;
      this.currentPokemonList$ = data['pokemon'];
      this.toggleState()
    }, 550);
  	});
  }

  toggleState() {
    this.listState$ === 'in' ? this.listState$ = 'out' : this.listState$ = 'in';
  }
}
