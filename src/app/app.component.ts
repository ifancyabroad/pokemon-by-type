import { Component, ViewChild, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-by-type';

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  @ViewChild(PokemonListComponent) list: PokemonListComponent;

  childTypeClicked(type: Event) {
    this.list.updatePokemonList(type);
  }

  changeBackground(type: Event) {
    this.renderer.setAttribute(this.document.body, 'class', String(type));    
  }
}
