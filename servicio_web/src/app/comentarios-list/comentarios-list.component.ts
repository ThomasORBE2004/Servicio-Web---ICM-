import { Component } from '@angular/core';
import { ComentariosService } from '../services/comentarios.service';

@Component({
  selector: 'app-comentarios-list',
  templateUrl: './comentarios-list.component.html',
  styleUrls: ['./comentarios-list.component.css']
})
export class ComentariosListComponent{
  resenas: any[] = [];
  viajeId = '0'; // Id del viaje seleccionado

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.obtenerResenas();
  }

  obtenerResenas() {
    this.comentariosService.getResenas(this.viajeId).subscribe(data => {
      this.resenas = data;
    });
  }

  aprobarResena(index: number, resena: any): void {
    console.log(`Reseña aprobada: ${JSON.stringify(resena)}`);
    this.resenas.splice(index, 1); // Eliminar la reseña aprobada
  }

  rechazarResena(index: number): void {
    console.log(`Reseña rechazada en el índice: ${index}`);
    this.resenas.splice(index, 1); // Eliminar la reseña rechazada
  }

}
