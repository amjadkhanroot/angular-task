import { Injectable } from '@angular/core';
import { IMovie } from './movie';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MoiveService{

  public moviesAPI ='api/movies/movies.json';
  
  constructor(private http: HttpClient){

  }

  getMovies(): Observable<IMovie[]>{
    return this.http.get<IMovie[]>(this.moviesAPI).pipe(
    tap(data => console.log('All: ' + JSON.stringify(data)))
    ,catchError(this.handleError)
    );
    
  }

  delMovie(id: number): Observable<IMovie[]>{
    return this.http.delete<IMovie[]>(this.moviesAPI).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data)))
      ,catchError(this.handleError)
      );
  }
  

  private handleError(err: HttpErrorResponse) {
    
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}