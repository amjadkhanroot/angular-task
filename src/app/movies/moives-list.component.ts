import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from './movie';
import { MoiveService } from './service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-moives-list',
  templateUrl: './moives-list.component.html',
  styleUrls: ['./moives-list.component.css']
})
export class MoivesListComponent implements OnInit {

  
  movieId: number;
  errorMessage: string;
  movies: IMovie[] =[];
  watchlist: IMovie[]=[];
  watched: IMovie[] = [];
  filteredMoviesWL = this.watchlist;
  filteredMoviesWD = this.watched;

  _movieName = '';
  public get movieName() {
    return this._movieName;
  }
  public set movieName(value: string) {
    this._movieName = value;
  }


  //this is for Watchlist
  _listFilterWL = '';
  get listFilterWL(): string {
    return this._listFilterWL;
  }
  set listFilterWL(value: string) {
    this._listFilterWL = value;
    this.filteredMoviesWL = this.listFilterWL ? this.performFilter(this.listFilterWL) : this.movies;
  }

  //this is for Watched
  _listFilterWD = '';
  get listFilterWD(): string {
    return this._listFilterWD;
  }
  set listFilterWD(value: string) {
    this._listFilterWD = value;
    this.filteredMoviesWD = this.listFilterWD ? this.performFilter(this.listFilterWD) : this.movies;
  }

  performFilter(filterBy: string): IMovie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.movies.filter((movie: IMovie) =>
    movie.movieName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private moiveService: MoiveService) { 

    //testting
    this.moiveService.getMovies().subscribe(moive =>{
      console.log(moive);
    });

  }

  ngOnInit(): void {
    console.log('moiveService:'+this.moiveService.getMovies());
    console.log('moiveId:'+this.movieId);
    this.moiveService.getMovies().subscribe(
      movie => { 
        this.movies = movie,
        this.watchlist = this.movies
        this.filteredMoviesWL = this.watchlist
        console.log('filteredMoviesWL:'+this.filteredMoviesWL.length);
        console.log('movies:'+this.movies);
        console.log('movie:'+movie);
      },
      error => this.errorMessage = <any>error
      
    );



  }

  onDelete(id: number) {
    console.log('movie id: '+id)
    this.moiveService.delMovie(id).subscribe(
      del =>{
        console.log(del);
        console.log('movies.length'+ this.movies.length);
        for(let i = 0; i< this.movies.length; i++){
          if(this.movies[i].movieId == id ){
            this.movies.splice(i,1);
          }
        }
      },
      error => this.errorMessage = <any>error);
  }

  
  onWatched(): void{
    console.log('Watched!');
  }

  onUnwatch(): void{
    console.log('Unwatch!');
  }

  onAdd(): void{
    console.log('add: '+this._movieName);
    if(this._movieName.length != 0){
    this.moiveService.addMovie(this._movieName).subscribe(
      add =>{console.log('onAdd: '+this._movieName)},
      error => this.errorMessage = <any>error);
    }else{
      console.log('invaild type a movie name');
    }
  }


}
