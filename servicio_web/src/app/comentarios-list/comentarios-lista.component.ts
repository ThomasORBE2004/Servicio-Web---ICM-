import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../services/comentarios.service';

@Component({
  selector: 'app-comentarios-list',
  templateUrl: './comentarios-list.component.html',
  styleUrls: ['./comentarios-list.component.css']
})
export class ComentariosListComponent implements OnInit {
  resenas: any[] = [];
  viajeId = '0'; // Id del viaje seleccionado (puedes cambiarlo dinámicamente según tu lógica)

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.obtenerResenas();
  }

  obtenerResenas() {
    this.comentariosService.getResenas(this.viajeId).subscribe(data => {
      this.resenas = data;
    });
  }

  aprobarResena(resenaId: string, resena: any) {
    this.comentariosService.aprobarResena(this.viajeId, resenaId, resena)
      .then(() => console.log('Reseña aprobada'))
      .catch(err => console.error(err));
  }

  rechazarResena(resenaId: string) {
    this.comentariosService.rechazarResena(this.viajeId, resenaId)
      .then(() => console.log('Reseña rechazada'))
      .catch(err => console.error(err));
  }
}
