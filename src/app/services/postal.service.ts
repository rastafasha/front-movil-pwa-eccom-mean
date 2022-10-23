import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';
import { Postal } from "../models/postal.model";

import { map } from 'rxjs/operators';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PostalService {

  public url;

  constructor(
    private http : HttpClient
  ) {
    this.url = environment.baseUrl;
   }

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

  registro(data:any):Observable<any>{
    const url = `${base_url}/postals`;
    return this.http.post(url, data, this.headers);
  }

  listar():Observable<any>{
    const url = `${base_url}/postals`;
    return this.http.get(url, this.headers);
    }

  getPostal(id:string):Observable<any>{
    const url = `${base_url}/postals/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, cupon: Postal}) => resp.cupon)
      );
  }

  eliminar(_id:string):Observable<any>{
    const url = `${base_url}/postals/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
