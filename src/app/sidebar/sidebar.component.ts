import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { UtilsService } from '../utils.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<Event>();
	types$: Object;
  currentType$: string;

  constructor(private data: DataService, private utils: UtilsService) { }

  ngOnInit() {
  	this.data.getTypes().subscribe(data => { 		
      data['results'].forEach((type) => {
        type.name = this.utils.capitalizeString(type.name);
      });
      this.types$ = data['results'].slice(0, -2);
  	});
  }

  onClick(type: Event) {
    this.eventClicked.emit(this.utils.uncapitaliseString(type));
    this.currentType$ = this.utils.uncapitaliseString(type);
  }

}
