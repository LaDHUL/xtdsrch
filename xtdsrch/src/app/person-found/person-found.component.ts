import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'app-person-found',
  templateUrl: './person-found.component.html',
  styleUrls: ['./person-found.component.css']
})
export class PersonFoundComponent implements OnInit {
  @Input()
  persons: Person[];

  constructor() { }

  ngOnInit() {
  }

}
