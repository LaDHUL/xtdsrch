import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from './person'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private url = 'api/persons';

  constructor(
    private http: HttpClient
  ) { }

  getPerson(id: number): Observable<Person> {
    const url = `${this.url}/${id}`;
    return this.http.get<Person>(url).pipe(
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }

  getPersons(): Observable<Person[]> {
    const url = `${this.url}`;
    return this.http.get<Person[]>(url).pipe(
      tap(_ => console.info(`fetched persons`)),
      catchError(this.handleError<Person[]>(`getPersons`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      console.error(error); // log to console instead
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
