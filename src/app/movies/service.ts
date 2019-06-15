import { Injectable } from "@angular/core";
import { IMovie } from "./movie";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MoiveService {
  public moviesAPI = "api/movies/movies.json";
  httpParams: HttpParams = new HttpParams();

  TOGGLE_WATCH_STATUS = 0;
  DELETE_MOVIE = 1;
  ADD_MOVIE = 2;
  UNWATCHED = 0;
  WATCHED = 1;

  constructor(public http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    console.log("getMovies Service");
    return this.http.get<IMovie[]>(this.moviesAPI).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  delMovie(movie: IMovie): Observable<IMovie[]> {
    console.log("delMovie Service");
    return this.http
      .delete<IMovie[]>(this.moviesAPI + "/" + movie.movieId)
      .pipe(
        tap(data => console.log("All: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateMovie(movie: IMovie): Observable<IMovie[]> {
    console.log("updateMovie Service");
    return this.http
      .put<IMovie[]>(this.moviesAPI + "/" + movie.movieId, movie.movieId)
      .pipe(
        tap(data => console.log("All: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addMovie(movieName: string): Observable<IMovie[]> {
    console.log("addMovie Service");
    return this.http.put<IMovie[]>(this.moviesAPI, movieName).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
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
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
      }`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
