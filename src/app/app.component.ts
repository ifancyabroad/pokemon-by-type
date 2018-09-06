import { Component, ViewChild } from '@angular/core';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-by-type';

  @ViewChild(PokemonListComponent) list: PokemonListComponent;

  childTypeClicked(type: Event) {
    this.list.updatePokemonList(type);
  }
}
