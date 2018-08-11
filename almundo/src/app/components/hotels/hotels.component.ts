import { Component } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'hotels',
  templateUrl: './hotels.component.html'
})

export class HotelsComponent {
  title = 'Al Mundo';
  private apiUrl = 'http://localhost:3000/hoteles';
  private hotels: any = [];
  public stars: string = '';
  public name: string = '';
  public show: boolean = true;

  constructor() {
    this.getHotels();
  }


  getData() {
    return ajax(this.apiUrl + '?name=' + this.name + '&stars=' + this.stars).pipe(
      map(res => {
        if (!res.response) {
          throw new Error('Value expected!');
        }
        return res.response;
      }),
      catchError(err => of([]))
    );
  }


  getHotels() {
    this.getData().subscribe(
      hotels => this.setHotels(hotels),
      error => console.log(<any>error)
    );
  }

  setHotels(hotels) {
    this.hotels = hotels;
  }

  onClick(event) {
    this.stars = event.target.value;
    this.getHotels();
  }

  showFilter() {
    this.show = !this.show;
  }
}