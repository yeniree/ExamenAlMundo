import { Component } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'hotels',
  templateUrl: './hotels.component.html'
})

export class HotelsComponent {
  private apiUrl = 'http://localhost:3000/hoteles';
  private hotels: any = [];
  public name: string = '';
  public show: boolean = true;
  public ArrayStars: number[] = [5, 4, 3, 2, 1];
  public list: number[] = [];
  public checkedDefault: boolean = true;


  constructor() {
    this.getHotels();
  }


  getData() {
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
    let value = parseInt(event.target.value);
    if (event.target.checked) {
      if (!this.list.includes(value)) {
        this.list.push(value);
      }
    } else {
      let newList: number[] = [];
      for (let i in this.list) {
        if (this.list[i] != value) {
          newList.push(this.list[i]);
        }        
      }
      this.list = newList;
    }
    this.getHotels();
  }

  reset() {
    this.list = [];
    this.getHotels();
  }

  showFilter() {
    this.show = !this.show;
  }
}