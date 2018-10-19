import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Work } from './work'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  private url = 'api/works';

  constructor(
    private http: HttpClient
  ) { }
  
  getWorks(): Observable<Work[]> {
    const url = `${this.url}`;
    return this.http.get<Work[]>(url).pipe(
      tap(_ => console.info(`fetched works`)),
      catchError(this.handleError<Work[]>(`getWorks`))
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
