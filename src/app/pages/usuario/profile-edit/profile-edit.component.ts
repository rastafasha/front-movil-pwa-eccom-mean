import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    private http: HttpClient,
    private location: Location,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
      this.usuario = usuarioService.usuario;
     }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      first_name: [ this.usuario.first_name, Validators.required ],
      last_name: [ this.usuario.last_name, Validators.required ],
      telefono: [ this.usuario.telefono ],
      pais: [ this.usuario.pais],
      numdoc: [ this.usuario.numdoc ],
      email: [ this.usuario.email, Validators.required ],
    });
    window.scrollTo(0,0);
  }

  actualizarPerfil(){

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(resp => {
      const {first_name, last_name, telefono, pais,  numdoc, email} = this.perfilForm.value;
      this.usuario.first_name = first_name;
      this.usuario.last_name = last_name;
      this.usuario.telefono = telefono;
      this.usuario.numdoc = numdoc;
      this.usuario.pais = pais;
      Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
    }, (err)=>{
      Swal.fire('Error', err.error.msg, 'error');

    })
  }

  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then(img => { this.usuario.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
