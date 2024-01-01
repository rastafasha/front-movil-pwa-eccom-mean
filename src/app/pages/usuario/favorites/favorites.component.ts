import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { Producto } from 'src/app/models/producto.model';
import { FavoritoService } from 'src/app/services/favorito.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public usuario: Usuario;
  public productos: Producto;

  constructor(
    private http: HttpClient,
    private location: Location,
    public favoritosService: FavoritoService,
    public usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    handler: HttpBackend) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.getFavoritos();
    
  }

  getFavoritos(){
    this.favoritosService.listarFaoritosporUsuario(this.usuario.uid).subscribe((resp:any)=>{

      console.log(resp);
    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
