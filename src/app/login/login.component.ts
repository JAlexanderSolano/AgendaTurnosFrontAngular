import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/local-storage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  login = {
    usuario: '',
    contrasena: '',
  };
  response: any;
  imgLogin: any;
  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private mensaje: MensajesSwalComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.response = {};
    this.imgLogin =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSLTaCms2lWGyWpoZlaCatjEaBPhUQ1mvj0Q&s';
  }

  Login() {
    this.apiService.Login(this.login).subscribe((res: any) => {
      this.response = res;
      this.redirigir(this.response);
    });
  }

  redirigir(response: any) {
    if (response.resultado.state == 200) {
      this.localStorage.setItem('token', response.resultado.token);
      this.localStorage.setItem('usuarioIngreso', this.login.usuario);
      this.mensaje.MostrarMensaje(
        'success',
        'Usuario correcto',
        'Bienvenido Sr/ Sra ' + this.login.usuario
      );
      this.router.navigate(['principal']);
    }
  }
}
