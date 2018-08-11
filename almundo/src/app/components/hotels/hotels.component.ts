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
  public name: string = '';
  public show: boolean = true;
  public list: any = [];

  constructor() {
    this.getHotels();
  }


  getData() {
    console.log(JSON.stringify(this.list))
    return ajax(this.apiUrl + '?name=' + this.name + '&stars=' + JSON.stringify(this.list)).pipe(
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
    this.list.push(event.target.value);    
    this.getHotels();
  }

  reset() {
    this.list=[];    
    this.getHotels();
  }

  showFilter() {
    this.show = !this.show;
  }
}