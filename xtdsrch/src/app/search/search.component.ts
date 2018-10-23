import { Component, OnInit } from '@angular/core';
import { Person } from '../person';

export class SearchDesc {
  types: string[];
}
export class FieldValue {
  field: string;
  value: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title = 'Search';
  type: string;
  personField: string;
  types: string[] = ['Person', 'Work'];
  searchDesc: SearchDesc;
  selectedType: string;
  selectedPersonFields: FieldValue[];
  person: Person[];

  constructor() {}

  ngOnInit() {
    this.searchDesc = {
      types: ['Person', 'Work']
    };
    this.selectedType = 'Person';
  }

  onTypeSelect(type: string): void {
    this.selectedType = type;
  }
}
