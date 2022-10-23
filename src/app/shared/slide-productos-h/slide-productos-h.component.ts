import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../services/product.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { MessageService } from 'src/app/services/message.service';
import { Categoria } from 'src/app/models/categoria.model';
import { StorageService } from 'src/app/services/storage.service';
import { Producto } from 'src/app/models/producto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CartItemModel } from 'src/app/models/cart-item-model';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-slide-productos-h',
  templateUrl: './slide-productos-h.component.html',
  styleUrls: ['./slide-productos-h.component.css']
})
export class SlideProductosHComponent implements OnInit {

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  @Input() categories: Categoria[] = [];
  @Input() index: number;

  public productos: any;
  public producto: Producto;
  public usuario: Usuario;
  public color_to_cart = '#16537e';

  public cantidad_to_cart = 1;
  public precio_to_cart;
  public selector_to_cart = ' ';
  public err_stock ='';
  public selector_error = false;

  public productoSeleccionado: Producto;

  public msm_error_review='';

  constructor(
    private productoService: ProductoService,
    private usuarioService : UsuarioService,
    private messageService: MessageService,
    private storageService: StorageService,

    private router: Router
  ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    this.loadProducts();


  }
  loadProducts(){
    this.productoService.getProductos().subscribe(
      resp => {
        this.productos = resp;
        console.log(this.productos);
      }
    )
  }


  addToCart(): void{
    this.messageService.sendMessage(this.productoSeleccionado);
    console.log('sending item to cart...')
  }




  addToFavorites(){
    this.storageService.guardarProducto(this.productoSeleccionado);
    console.log(this.productoSeleccionado);
  }

  close_alert(){
    this.msm_error_review = '';

  }

  close_toast(){
    $('#dark-toast').removeClass('show');
        $('#dark-toast').addClass('hide');
  }

}
