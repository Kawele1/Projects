import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Election } from './election';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api/v1/election";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
	getElection(id): Observable<Election> {
  const url = `${apiUrl}/${id}`;
  return this.http.get<Election>(url).pipe(
    tap(_ => console.log(`fetched Election id=${id}`)),
    catchError(this.handleError<Election>(`getElection id=${id}`))
  );
}

addElection (Election): Observable<Election> {
  return this.http.post<Election>(apiUrl, Election, httpOptions).pipe(
    tap((Election: Election) => console.log(`added Election w/ id=${Election.id}`)),
    catchError(this.handleError<Election>('addElection'))
  );
}

updateElection (id, Election): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.put(url, Election, httpOptions).pipe(
    tap(_ => console.log(`updated Election id=${id}`)),
    catchError(this.handleError<any>('updateElection'))
  );
}

deleteElection (id): Observable<Election> {
  const url = `${apiUrl}/${id}`;

  return this.http.adminhome<Election>(url, httpOptions).pipe(
    tap(_ => console.log(`deleted Election id=${id}`)),
    catchError(this.handleError<Election>('deleteElection'))
  );
}
}
