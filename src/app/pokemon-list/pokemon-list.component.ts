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
		]),
		trigger('reveal', [
			transition('* <=> *', [
				style({height: '41px'}),
				animate('550ms ease-out')
			])
		])
	]
})
export class PokemonListComponent implements OnInit {

	currentPokemon$: Object;
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

	toggleLoader(elem) {
		elem.firstChild.hidden ? elem.firstChild.hidden = false : elem.firstChild.hidden = true;
		elem.style.backgroundColor ? elem.style.backgroundColor = '' : elem.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
	}

	updatePokemonList(type) {
		this.data.getPokemonByType(type).subscribe(data => {
			this.toggleState();
			setTimeout(() => {
				this.currentType$ = type;
				this.currentPokemonList$ = data['pokemon'];
				this.toggleState()
			}, 550);
		});
	}

	updatePokemon(name, event) {
		this.toggleLoader(event.target);
		this.data.getPokemon(name).subscribe(data => {
			this.currentPokemon$ = data;
			this.toggleLoader(event.target);
		})
	}

	extractPokemonNumber(url) {
		let regex = /\d/g;
		let num = url.match(regex).slice(1).join("");
		if (Number(num) > 810) {
			return 'N/A';
		} else {
			return num;
		}
	}

	toggleState() {
		this.listState$ === 'in' ? this.listState$ = 'out' : this.listState$ = 'in';
	}
}
