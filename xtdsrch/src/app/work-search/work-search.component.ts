import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WorksService } from '../works.service';
import { Work } from '../work';
import { Person } from '../person';

@Component({
  selector: 'app-work-search',
  templateUrl: './work-search.component.html',
  styleUrls: ['./work-search.component.css'],
  providers: [WorksService]
})
export class WorkSearchComponent implements OnInit {

  title = 'Search for works';

  // list of existing works
  works: Work[];
  // search prototype
  work: Work;
  // result set
  found: Work[] = [];

  // toggle simple/extended search
  extended = false;

  // list of persons from downstream search
  persons: Person[];
  // upstream notificator
  @Output()
  searched = new EventEmitter<Work[] > ();
  // get a call back from downstream's PersonSearch
  downstreamPersons(found: Person[]) {
      this.persons = found;
  }

  constructor(private workService: WorksService) { }

  ngOnInit(): void {
      this.getWorks();
      this.work = {
            'title': '',
            'format': '',
            'kind': '',
            'publication': '',
            'author': ''
      };
      this.found = [];
      this.persons = [];
  }

  getWorks(): void {
      this.workService.getWorks().subscribe(works => (this.works = works));
  }

  matchPersons(candidate: Work): boolean {
      // no downstream result
      // TODO: make the difference between no downstream request
      //       and an empty downstream response
      if (this.persons.length === 0) {
          return true;
      } else {
          for (let j = 0; j < this.persons.length; j++) {
              if (this.persons[j].id === candidate.author) {
                  return true;
              }
          }
      }
      return false;
  }

  /*
   * match a given string on all fields
   */
  simpleSearch() {
      this.found = [];
      for (let i = 0; i < this.works.length; i++) {
          const allFields =
              this.works[i].title + '¨' +
              this.works[i].format + '¨' +
              this.works[i].kind + '¨' +
              this.works[i].publication + '¨' +
              this.works[i].author;
              // TODO: forward full text search on Person

          if (allFields.match(new RegExp(this.work.title, 'gi'))) {
              if (this.matchPersons(this.works[i])) {
                  this.found.push(this.works[i]);
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
  matchCandidate(work: Work, candidate: Work): Boolean {
      // TODO: factorize, loop over the properties of Person
      if (work.title.length > 0 && !candidate.title.match(new RegExp(work.title, 'gi'))) {
          return false;
      }
      if (work.format.length > 0 && !candidate.format.match(new RegExp(work.format, 'gi'))) {
          return false;
      }
      if (work.kind.length > 0 && !candidate.kind.match(new RegExp(work.kind, 'gi'))) {
          return false;
      }
      if (work.publication.length > 0 && !candidate.publication.match(new RegExp(work.publication, 'gi'))) {
          return false;
      }
      if (work.author.length > 0 && !candidate.author.match(new RegExp(work.author, 'gi'))) {
          return false;
      }
      return true;
  }

  search(work: Work): void {
      this.found = [];
      for (let i = 0; i < this.works.length; i++) {
          const candidate = this.works[i];
          if (this.matchCandidate(work, candidate)) {
              if (this.matchPersons(candidate)) {
                  this.found.push(candidate);
              }
          }
      }
  }

  triggerSearch(): void {
      if (this.extended) {
          this.search(this.work);
      } else {
          this.simpleSearch();
      }

      // notify result to upstream
      console.log('search result: ');
      for (let i = 0; i < this.found.length; i++) {
        const w: Work = this.found[i];
          console.log('  result: ' + w.title);
      }
      this.searched.emit(this.found);
  }

  toggleExtended(): void {
      this.extended = !this.extended;
  }
}
