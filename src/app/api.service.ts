import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class ApiService {

  private baseURL = 'https://breakingbadapi.com/api/';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    ) { }

  
  getCharacters (): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}characters/`)
      .pipe(
        
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }
 
  getCharactersSearch(name: string): Observable<any> {
    // /api/characters?name=Walter+White
    const url = `${this.baseURL}characters?name=${name}`;
    return this.http.get<any>(url).pipe(
      
      catchError(this.handleError<any>(`getHero id=${name}`))
    );
  }
  // /api/episodes

  getepisodes (): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}episodes/`)
      .pipe(
        
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }

  postMensagem (form): Observable<any[]> {

    return this.http.post('https://frontendtestesamba.free.beeceptor.com/breaking-bad/suggestions', form, this.httpOptions).pipe(
      
      catchError(this.handleError<any>('addHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
