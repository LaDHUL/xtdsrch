import { Component, OnInit } from '@angular/core';

import { Person } from '../person';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  persons: Person[];
  selectedPerson: Person;

  constructor(private personsService: PersonsService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons(): void {
    this.personsService.getPersons()
    .subscribe(persons => this.persons = persons);
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }
}
