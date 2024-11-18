import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../services/comentarios.service';

@Component({
  selector: 'app-comentarios-list',
  templateUrl: './comentarios-list.component.html',
  styleUrls: ['./comentarios-list.component.css']
})
export class ComentariosListComponent implements OnInit {
  viajes: any[] = []; // Lista de viajes con sus reseñas

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.obtenerViajes();
  }

  // Obtener todos los viajes
  obtenerViajes(): void {
    this.comentariosService.getViajes().subscribe(data => {
      this.viajes = data.map((viaje: any, index: number) => ({
        id: index.toString(), // Ajusta según cómo almacenas el ID en Firebase
        mostrarResenas: false,
        resenas: [] // Inicializar las reseñas del viaje
      }));
    });
    
  }

  // Alternar la visibilidad de las reseñas de un viaje y cargarlas si no están cargadas
  toggleResenas(index: number): void {
    const viaje = this.viajes[index];
    viaje.mostrarResenas = !viaje.mostrarResenas;

    if (viaje.mostrarResenas && viaje.resenas.length === 0) {
      this.comentariosService.getResenas(viaje.id).subscribe(data => {
        viaje.resenas = data;
      });
    }
  }

  // Aprobar una reseña
  aprobarResena(viajeIndex: number, resenaIndex: number, resena: any): void {
    const viaje = this.viajes[viajeIndex];
    this.comentariosService.aprobarResena(viaje.id, resena.id, resena).then(() => {
      viaje.resenas.splice(resenaIndex, 1); // Eliminar la reseña aprobada de la lista
    });
  }

  // Rechazar una reseña
  rechazarResena(viajeIndex: number, resenaIndex: number): void {
    const viaje = this.viajes[viajeIndex];
    const resenaId = viaje.resenas[resenaIndex].id;
    this.comentariosService.rechazarResena(viaje.id, resenaId).then(() => {
      viaje.resenas.splice(resenaIndex, 1); // Eliminar la reseña rechazada de la lista
    });
  }
}
