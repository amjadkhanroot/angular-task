import { Component, OnInit } from '@angular/core';
import { IMovie } from './movie';
import { MoiveService } from './service';

@Component({
  selector: 'app-moives-list',
  templateUrl: './moives-list.component.html',
  styleUrls: ['./moives-list.component.css']
})
export class MoivesListComponent implements OnInit {

  errorMessage: string;
  filteredMovies: IMovie[] =[];
  movies: IMovie[] =[];
  

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMovies = this.listFilter ? this.performFilter(this.listFilter) : this.movies;
  }

  performFilter(filterBy: string): IMovie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.movies.filter((movie: IMovie) =>
    movie.movieName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private moiveService: MoiveService) { }

  ngOnInit(): void {
    this.moiveService.getMovies().subscribe(
      movie => { 
        this.movies = movie,
        this.filteredMovies = this.movies
      },
      error => this.errorMessage = <any>error
      
    );
  }

}
