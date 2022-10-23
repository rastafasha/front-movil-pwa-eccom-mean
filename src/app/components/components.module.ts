import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    ModalImagenComponent
  ]
})
export class ComponentsModule { }
