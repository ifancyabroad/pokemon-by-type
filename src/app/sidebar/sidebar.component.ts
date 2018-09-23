import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { UtilsService } from '../utils.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('toggleMenu', [
      state('show', style({transform: 'translateX(0)'})),
      state('hide', style({transform: 'translateX(-100%)'})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ]),
  ]
})
export class SidebarComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<Event>();
	types$: Object;
  currentType$: string;
  menuState$: string = 'show';

  constructor(private data: DataService, private utils: UtilsService) { }

  ngOnInit() {
  	this.data.getTypes().subscribe(data => { 		
      data['results'].forEach((type) => {
        type.name = this.utils.capitalizeString(type.name);
      });
      this.types$ = data['results'].slice(0, -2);
  	});
  }

  toggleMenu(state) {
    this.menuState$ = state;
  }

  onClick(type: Event) {
    this.eventClicked.emit(this.utils.uncapitaliseString(type));
    this.currentType$ = this.utils.uncapitaliseString(type);
  }

}
