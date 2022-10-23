import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Categoria } from '../models/categoria.model';

import { Observable } from "rxjs";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  serverUrl = environment.baseUrl;



  public categoria: Categoria;

  constructor(private http: HttpClient) { }

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

  getCategories() {
    const url = `${base_url}/categorias`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, categorias: Categoria[]}) => resp.categorias)
      )
  }


  getCategoriaById(_id: string){
    const url = `${base_url}/categorias/${_id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, categoria: Categoria}) => resp.categoria)
        );

  }



  listar(filtro):Observable<any>{

    const url = `${base_url}/categorias/`+filtro;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, categorias: Categoria[]}) => resp.categorias)
      )
  }


  /**
   * @method: Método que obtiene la regla de negocion para verificar fechas disponible
   * @author: malcolmc
   * @since 23/06/2022
   * @param entrevistaDocenteId {entrevistaDocente}: objeto a obtener
   */

  //  getFechaDisponible(
  //   entrevistadorId: DocEscuelas
  //   ): Observable<DocEscuelas> {
  //     return this.http.post<DocEscuelas>(
  //       `${environment.urlAPISigacDocentes}Convocatoria/FechaOcupadaEntrevistador/`,
  //       entrevistadorId
  //     );
  // }

  /**
   * @method: Método que obtiene asignacion/evaluador por id
   * @author: malcolmc
   * @since 23/06/2022
   * @param entrevistaDocenteId {entrevistaDocente}: objeto a obtener
   */

  //  getAsignarEvaluadorPorId(
  //   entrevistaDocenteId: number,
  // ) {
  //   return this.http.get<EntreDocente>(
  //     `${environment.urlAPISigacDocentes}AsignarEvaluador/traerEntrevistaPorId/${entrevistaDocenteId}`
  //   );
  // }

  /**
   * @method: Método que obtiene entrevista asignada
   * @author: malcolmc
   * @since 21/06/2022
   * @param idConvocatoria {idConvocatoria}: objeto a obtener
   */

  //  getEntrevistaAsignacion(
  //   IdEscuela: number,
  //   IdConvocatoria: number,
  //   TipoIdentificacion: number,
  //   Identificacion: number,
  //   IdUsuario: number,
  // ): Observable<DocEscuelas[]> {
  //   return this.http.get<DocEscuelas[]>(
  //     `${environment.urlAPISigacDocentes}AsignarEvaluador/ListarEntrevistasAsignadasDocentesConcadenados?IdEscuela=${IdEscuela}&IdConvocatoria=${IdConvocatoria}`
  //   );
  // }


}
