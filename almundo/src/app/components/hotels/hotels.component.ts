import { Component, OnInit, isDevMode  } from '@angular/core';

import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'hotels',
  templateUrl: './hotels.component.html'
})

export class HotelsComponent {
  public apiUrl = environment.apiUrl + 'api/hotels';
  public hotels: any = [];
  public name: string = '';
  public show: boolean = true;
  public ArrayStars: number[] = [5, 4, 3, 2, 1];
  public list: number[] = [];
  public checkedDefault: boolean = true;
  public checkedStar = false;

  constructor(){
    this.getHotels();
  }

  OnInit(){
    this.getHotels();
  }

  /**
   * Obtiene la data hoteles, desde apiUrl 
   */
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

  /**
   * Get hoteles
   */
  getHotels() {
    this.getData().subscribe(
      hotels => this.setHotels(hotels),
      error => console.log(<any>error)
    );
  }

  /**
   * Set hoteles
   * @param hotels 
   */
  setHotels(hotels) {
    this.hotels = hotels;
  }

  /**
   * Evento onclick al hacer click en checkbox de las estrellas
   * @param event 
   */
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
    this.checkedDefault = false;
    this.getHotels();
  }

  /**
   * Reset a la lista estrellas para el filtro
   */
  reset() {
    this.list = [];
    this.getHotels();
  }

  /**
   * Show a contenedor de filtros
   */
  showFilter() {
    this.show = !this.show;
  }

}