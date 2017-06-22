import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { MenuItem } from '../restaurants-detail/menu-item/menu-item.model'
import { Restaurant } from './restaurant/restaurant.model'

import { MEAT_API } from '../app.api'

@Injectable()
export class RestaurantsService {

  constructor(private http: Http) {}

    restaurants(): Observable<Restaurant[]> {
      return this.http.get(`${MEAT_API}/restaurants`)
          .map(response => response.json())
    }

    restaurantById(id: string): Observable<Restaurant> {
      return this.http.get(`${MEAT_API}/restaurants/${id}`)
          .map(respose => respose.json())
    }

    reviewsOfRestaurants(id: string): Observable<any> {
      return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
          .map(response => response.json())
    }

    menuOfRestaurants(id: string): Observable<MenuItem[]> {
      return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
          .map(response => response.json())
    }


}
