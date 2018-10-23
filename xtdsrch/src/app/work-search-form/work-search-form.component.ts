import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Work } from '../work';
import { Person } from '../person';

@Component({
  selector: 'app-work-search-form',
  templateUrl: './work-search-form.component.html',
  styleUrls: ['./work-search-form.component.css']
})
export class WorkSearchFormComponent implements OnInit {
  @Input()
  work: Work;

  title = 'Search form:';
  fields: string[];
  field: string;
  selectedFields: string[];
  isWorkAdded = false;

  // upstream notificator
  @Output()
  searched: EventEmitter<Person[]> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.fields = ['title', 'format', 'kind', 'publication', 'author'];
    // default search on title:
    this.selectedFields = ['title'];
  }

  // get a call back from downstream's PersonSearch
  downstreamPersons(found: Person[]) {
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
        this.work[f] = '';
        return;
      }
    }
    this.selectedFields.push(f);
  }
}
