import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<Event>();
	types$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
  	this.data.getTypes().subscribe(data => {
  		this.types$ = data['results']
  	});
  }

  onClick(type: Event) {
    this.eventClicked.emit(type)
  }

}
