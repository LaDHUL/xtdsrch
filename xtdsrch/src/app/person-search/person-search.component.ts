import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PersonsService } from '../persons.service';
import { Person } from '../person';
import { Work } from '../work';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css'],
  providers: [PersonsService]
})
export class PersonSearchComponent implements OnInit {
  title = 'Search for persons';

  // list of existing persons
  persons: Person[];

  // search prototype
  person: Person;

  // result set
  found: Person[] = [];

  works: Work[];

  // toggle simple/extended search
  extended = false;

  // event to pass the result upstream
  @Output()
  searched = new EventEmitter<Person[]>();

  // get a call back from downstream's WorkSearch
  downstreamWorks(works: Work[]) {
    console.log('person-search: call back: ' + works);
    this.works = works;
  }

  constructor(private personService: PersonsService) {}

  ngOnInit() {
    this.getPersons();
    this.person = {
      id: '',
      firstName: '',
      lastName: '',
      birth: '',
      death: ''
    };
    this.found = [];
    this.works = [];
  }

  getPersons(): void {
    this.personService
      .getPersons()
      .subscribe(persons => (this.persons = persons));
  }

  matchWorks(candidate: Person): boolean {
    // TODO: make a difference between no works and empty works
    if (this.works.length === 0) {
      return true;
    } else {
      for (let j = 0; j < this.works.length; j++) {
        if (this.works[j].author === candidate.id) {
          return true;
        }
      }
      return false;
    }
  }

  /*
 * match a given string on all fields
 */
  simpleSearch() {
    this.found = [];
    for (let i = 0; i < this.persons.length; i++) {
      const allFields =
        this.persons[i].id +
        '¨' +
        this.persons[i].firstName +
        '¨' +
        this.persons[i].lastName +
        '¨' +
        this.persons[i].birth +
        '¨' +
        this.persons[i].death;

      if (allFields.match(new RegExp(this.person.id, 'gi'))) {
        if (this.matchWorks(this.persons[i])) {
          this.found.push(this.persons[i]);
        }
      }
    }
  }

  /*
 * match a person to its candidate
 * TODO: Q: can I attach this method to Person?
 *       it looks like yes, but you can't then natively map persons.js data-to-objects
 *       dig further.
 */
  matchCandidate(person: Person, candidate: Person): Boolean {
    // TODO: factorize, loop over the properties of Person
    if (
      person.id.length > 0 &&
      !candidate.id.match(new RegExp(person.id, 'gi'))
    ) {
      return false;
    }
    if (
      person.firstName.length > 0 &&
      !candidate.firstName.match(new RegExp(person.firstName, 'gi'))
    ) {
      return false;
    }
    if (
      person.lastName.length > 0 &&
      !candidate.lastName.match(new RegExp(person.lastName, 'gi'))
    ) {
      return false;
    }
    if (
      person.death.length > 0 &&
      !candidate.death.match(new RegExp(person.death, 'gi'))
    ) {
      return false;
    }
    if (
      person.birth.length > 0 &&
      !candidate.birth.match(new RegExp(person.birth, 'gi'))
    ) {
      return false;
    }
    return true;
  }

  search(person: Person): void {
    this.found = [];
    for (let i = 0; i < this.persons.length; i++) {
      const candidate = this.persons[i];
      if (this.matchCandidate(person, candidate)) {
        if (this.matchWorks(candidate)) {
          this.found.push(candidate);
        }
      }
    }
  }

  triggerSearch(): void {
    if (this.extended) {
      this.search(this.person);
    } else {
      this.simpleSearch();
    }

    // pass the info upstream
    this.searched.emit(this.found);
  }

  toggleExtended(): void {
    this.extended = !this.extended;
  }
}
