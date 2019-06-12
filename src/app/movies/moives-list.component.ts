import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from './movie';
import { MoiveService } from './service';

@Component({
  selector: 'app-moives-list',
  templateUrl: './moives-list.component.html',
  styleUrls: ['./moives-list.component.css']
})
export class MoivesListComponent implements OnInit {

  movieId: number =10;
  errorMessage: string;
  filteredMoviesWL: IMovie[] =[];
  filteredMoviesWD: IMovie[] =[];
  movies: IMovie[] =[];
  
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
    this.moiveService.getMovies().subscribe(
      movie => { 
        this.movies = movie,
        this.filteredMoviesWL = this.movies
        this.filteredMoviesWD = this.movies
        console.log('filteredMovies:'+this.filteredMoviesWL);
        console.log('movies:'+this.movies);
        console.log('movie:'+movie);
      },
      error => this.errorMessage = <any>error
      
    );
  }

  onDelete(id: number) {
    console.log('movies.length: '+id)
    this.moiveService.delMovie(id).subscribe(
      del =>{
        for(let i = 0; i< this.movies.length; i++){
          if(this.movies[i].moiveId == id ){
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
    console.log('Added!');
  }


}
