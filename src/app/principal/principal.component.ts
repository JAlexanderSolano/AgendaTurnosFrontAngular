import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../service/local-storage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  urlFrame: any = '';
  lblUsername: any = '';
  token: any = '';
  imgUser: any =
    'https://scmlatam.com/wp-content/uploads/2023/07/Que-son-los-turnos-rotativos-.jpg';
  constructor(
    private sanitizer: DomSanitizer,
    private localStorageService: LocalStorageService,
    private Mensaje: MensajesSwalComponent,
    private apiService: ApiService
  ) {}
  username: any = '';
  ngOnInit(): void {
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/lista-agenda');
    this.username = this.localStorageService.getItem('usuarioIngreso');
    this.token = this.localStorageService.getItem('token');
    this.lblUsername = this.username;
    setInterval(() => {
      this.ActualizarTurnos();
    }, 3000);
  }
  Salir() {
    this.Mensaje.MensajeSalida();
  }
  ListaTurnos() {
    this.Mensaje.Cargando();
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/lista-agenda');
  }
  RegistrarTurno() {
    this.Mensaje.Cargando();
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/registrar-turno');
  }
  ActualizarTurnos() {
    this.apiService
      .ActualizarVigenciaTurnos(this.token)
      .subscribe((res: any) => {
        let _resultado = '';
        _resultado = res.resultado.resultado;
        if (_resultado == 'Se han vencido los turnos') {
          this.ListaTurnos();
        }
      });
  }
}
