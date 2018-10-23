import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Person } from '../person';
import { Work } from '../work';

@Component({
  selector: 'app-person-search-form',
  templateUrl: './person-search-form.component.html',
  styleUrls: ['./person-search-form.component.css']
})
export class PersonSearchFormComponent implements OnInit {
  @Input()
  person: Person;

  title = 'Search form:';
  fields: string[];
  field: string;
  selectedFields: string[];

  workSearchAdded = false;

  // upstream notificator
  @Output()
  searched = new EventEmitter<Work[]>();

  constructor() {}

  ngOnInit() {
    this.fields = ['id', 'firstName', 'lastName', 'birth', 'death'];
    this.selectedFields = [];

    // default search on lastName:
    this.selectedFields = ['lastName'];
  }

  // get a call back from downstream's WorkSearch
  downstreamWorks(found: Work[]) {
    console.log('received works: ' + found);
    this.searched.emit(found);
  }

  isFieldSelected(f: string) {
    for (let i = 0; i < this.selectedFields.length; i++) {
      if (this.selectedFields[i] === f) {
        return true;
      }
    }
    return false;
  }

  setFieldSelected(f: string) {
    // search for the element
    for (let i = 0; i < this.selectedFields.length; i++) {
      if (this.selectedFields[i] === f) {
        this.selectedFields.splice(i, i + 1);
        this.person[f] = '';
        return;
      }
    }
    this.selectedFields.push(f);
  }

  toggleWorkSearch() {
    this.workSearchAdded = !this.workSearchAdded;
    if (this.workSearchAdded) {
      const empty: Work[] = [];
      this.searched.emit(empty);
    }
  }
}
