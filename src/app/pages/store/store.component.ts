import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @Input() categories: Categoria[] = [];

  constructor() { }

  ngOnInit(): void {
    this.closeMenu();
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

}
