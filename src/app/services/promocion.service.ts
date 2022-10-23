import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Promocion } from '../models/promocion.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PromocionService {


  constructor(
    private http: HttpClient
  ) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarPromocions(){

    const url = `${base_url}/promocions`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, promocions: Promocion[]}) => resp.promocions)
      )

  }


  getPromocionById(_id: string){
    const url = `${base_url}/promocions/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, promocion: Promocion}) => resp.promocion)
        );

  }





}
