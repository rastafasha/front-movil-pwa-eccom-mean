import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { Categoria, CatProducModel } from 'src/app/models/categoria.model';
import { ProductoService } from 'src/app/services/product.service';
import { Producto } from '../../models/producto.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  public categoria_route;
  public subcategoria_route;
  public productos: Producto;
  public categoria: Categoria;
  public categoriaProd: CatProducModel;
  public categoriaSeleccionado: Categoria;

  public cupones;




  constructor(
    private http: HttpClient,
    private location: Location,
    private categoryService: CategoryService,
    private productService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
     }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe( ({id}) => this.cargarCategory(id));
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe( ({id}) => this.getProductByCategory(id));
  }

  /**
   * @method: Método que obtiene categoria
   * @author: malcolmc
   * @since 21/06/2022
   * @param _id {_id}: objeto a obtener
   */

  // cargarCategory(id: string){debugger

  //   if(id === 'nuevo'){
  //     return;
  //   }

  //   this.categoryService.getCategoriaById(id).subscribe( respCatId =>{
  //     if(!respCatId){
  //       return this.router.navigateByUrl(`/app/`);
  //     }
  //     console.log(respCatId);

  //     const { _id, icono, nombre, state_banner, subcategorias } = respCatId;
  //     this.categoriaSeleccionado = respCatId;
  //     console.log(this.categoriaSeleccionado);

  //   });

  //     this.activatedRoute.params.subscribe( ({respCatId}) => this.getProductByCategory(respCatId));
  // }




  /**
   * @method: Método que obtiene producto por categoria
   * @author: malcolmc
   * @since 21/06/2022
   * @param respCatId {_id}: objeto a obtener
   */


  getProductByCategory(id: string){debugger


    if(id){
      // idCategoria = this.categoria._id;
      this.productService.listar_productoCat(id).subscribe( res =>{

        this.productos = res;
        console.log(id);
        console.log(res);
        console.log(this.productos);
        console.log(this.productos[0].categoria._id);
        console.log(this.productos[0].categoria.nombre);

        });

    }if(!id){
      return this.router.navigateByUrl(`/app`);
    }

  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
