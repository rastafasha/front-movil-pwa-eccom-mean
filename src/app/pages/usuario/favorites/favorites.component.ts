import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { Producto } from 'src/app/models/producto.model';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public productos: Producto;

  constructor(
    private http: HttpClient,
    private location: Location,
    public storageService: StorageService,
    handler: HttpBackend) {
      this.http = new HttpClient(handler);
     }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.getFavoritos();
  }

  getFavoritos(){
    this.storageService.cargarFavoritos().then(()=>{
      this.productos;
    })
    console.log(this.productos);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
