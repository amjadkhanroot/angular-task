import { Component, OnInit, Input } from "@angular/core";
import { IMovie } from "./movie";
import { MoiveService } from "./service";
import { empty } from "rxjs";

@Component({
  selector: "app-moives-list",
  templateUrl: "./moives-list.component.html",
  styleUrls: ["./moives-list.component.css"]
})
export class MoivesListComponent implements OnInit {
  errorMessage: string;
  movies: IMovie[] = [];
  watchlist: IMovie[] = [];
  watched: IMovie[] = [];
  filteredMoviesWL = this.watchlist;
  filteredMoviesWD = this.watched;

  constructor(private moiveService: MoiveService) {
    //testting
    this.moiveService.getMovies().subscribe(moive => {
      console.log(moive);
    });
  }

  _movieName = "";
  public get movieName() {
    return this._movieName;
  }
  public set movieName(value: string) {
    this._movieName = value;
  }

  //-------------------------------------------------------------------------

  //this is for Watchlist
  _listFilterWL: string;
  get listFilterWL(): string {
    return this._listFilterWL;
  }
  set listFilterWL(value: string) {
    this._listFilterWL = value;
    this.filteredMoviesWL = this.listFilterWL
      ? this.performFilterWL(this.listFilterWL)
      : this.watchlist;
  }

  performFilterWL(filterBy: string): IMovie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.watchlist.filter(
      (movie: IMovie) =>
        movie.movieName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  //this is for Watched
  _listFilterWD: string;
  get listFilterWD(): string {
    return this._listFilterWD;
  }
  set listFilterWD(value: string) {
    this._listFilterWD = value;
    this.filteredMoviesWD = this.listFilterWD
      ? this.performFilterWD(this.listFilterWD)
      : this.watched;
  }

  performFilterWD(filterBy: string): IMovie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.watched.filter(
      (movie: IMovie) =>
        movie.movieName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  // ------------------------------------------------------------

  ngOnInit(): void {
    console.log("moiveService:" + this.moiveService.getMovies());
    this.moiveService.getMovies().subscribe(
      movie => {
        (this.movies = movie), this.refresh();
        // this.watchlist = movie,
        // this.filteredMoviesWL = this.watchlist,
        // this.filteredMoviesWD = this.watched
        // console.log('filteredMoviesWL:'+this.filteredMoviesWL.length);
        // console.log(this.movies);
        // console.log(movie);
      },
      error => (this.errorMessage = <any>error)
    );
  }

  //----------------------------------------------------------------------

  //for the server
  // onDelete(movie: IMovie) {
  //   console.log('movie id: '+movie.movieId)
  //   this.moiveService.delMovie(movie).subscribe(
  //     del =>{
  //       console.log('movies.length'+ this.movies.length);
  //       this.movies.map(delMovie=>{
  //         if(delMovie.movieId == movie.movieId){
  //           console.log('Deleted!');
  //         }

  //       });
  //       // for(let i = 0; i< this.movies.length; i++){
  //       //   if(this.movies[i].movieId == id ){
  //       //     this.movies.splice(i,1);
  //       //   }
  //       // }
  //     },
  //     error => this.errorMessage = <any>error);
  // }

  //demo : delete a movie.
  onDelete(movie: IMovie) {
    console.log(this.watchlist);
    console.log(movie);

    for (let i = 0; i < this.movies.length; i++) {
      if (movie.movieId == this.movies[i].movieId) {
        this.movies.splice(i, 1);
      }
      console.log(this.movies);
    }
    this.refresh();
    console.log("deleted");
    console.log(this.watchlist);
    console.log(this.watched);
  }

  //---------------------------------------------------------------------------------

  //switch from watchlist to watched and so.
  onWatchStatus(movie: IMovie): void {
    console.log("Watched!");
    let status: number = movie.movieStatus;
    if ((status + 1) % 2 == 0) {
      console.log("Unwatch!");
      for (let i = 0; i < this.movies.length; i++) {
        if (movie.movieId === this.movies[i].movieId) {
          let toggle: IMovie = {
            movieName: movie.movieName,
            movieId: movie.movieId,
            movieStatus: 0
          };

          this.watchlist.push(toggle);
          this.movies.splice(i, 1);
          this.movies.push(toggle);
          break;
          // for(let j = 0; j< this.watched.length, j++){
        }
      }
    } else {
      for (let i = 0; i < this.movies.length; i++) {
        if (movie.movieId === this.movies[i].movieId) {
          let toggle: IMovie = {
            movieName: movie.movieName,
            movieId: movie.movieId,
            movieStatus: 1
          };
          console.log("toggle: ");
          console.log(toggle);

          this.watched.push(toggle);
          this.movies.splice(i, 1);
          this.movies.push(toggle);
          break;
        }
      }
    }

    this.refresh();
    console.log(this.watchlist);
    console.log(this.watched);
    console.log(this.filteredMoviesWL);
    console.log(this.filteredMoviesWD);
    console.log(this.movies);
  }

  //----------------------------------------------------------------

  //for the server
  // onAdd(): void{
  //   console.log('add: '+this._movieName);
  //   if(this._movieName.length != 0){
  //   this.moiveService.addMovie(this._movieName).subscribe(
  //     add =>{console.log('onAdd: '+this._movieName)},
  //     error => this.errorMessage = <any>error);
  //   }else{
  //     console.log('invaild type a movie name');
  //   }
  // }

  //demo
  onAdd() {
    if (this._movieName.length != 0) {
      let addMovie: IMovie = {
        movieName: this.movieName,
        movieId: this.ID(),
        movieStatus: 0
      };
      this.watchlist.push(addMovie);
      this.movies.push(addMovie);
      this.movieName = "";
      console.log(this.watchlist);
      this.refresh;
    } else {
      console.log("invaild input");
    }
  }

  //generate an ID
  ID(): string {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  //--------------------------------------------------------------------
  //for budget
  badgeWL(): string {
    if (this.filteredMoviesWL.length == this.watchlist.length) {
      console.log(this.filteredMoviesWL.length);
      return this.filteredMoviesWL.length.toString();
    } else {
      console.log(
        "showing " +
          this.filteredMoviesWL.length +
          " out of " +
          this.watchlist.length
      );
      return (
        "showing " +
        this.filteredMoviesWL.length +
        " out of " +
        this.watchlist.length
      );
    }
  }

  badgeWD(): string {
    if (this.filteredMoviesWD.length == this.watched.length) {
      console.log(this.filteredMoviesWD.length);
      return this.filteredMoviesWD.length.toString();
    } else {
      console.log(
        "showing " +
          this.filteredMoviesWD.length +
          " out of " +
          this.watched.length
      );
      return (
        "showing " +
        this.filteredMoviesWD.length +
        " out of " +
        this.watched.length
      );
    }
  }

  //--------------------------------------------------------------------

  refresh() {
    this.watchlist = this.movies.filter((m: IMovie) => m.movieStatus == 0);
    this.filteredMoviesWL = this.watchlist;

    this.watched = this.movies.filter((m: IMovie) => m.movieStatus == 1);
    this.filteredMoviesWD = this.watched;

    console.log("refresh");
    console.log(this.filteredMoviesWL);
    console.log(this.filteredMoviesWD);
    console.log(this.movies);
  }
}
