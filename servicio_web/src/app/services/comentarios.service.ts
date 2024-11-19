import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private dbPath = '/viajes';

  constructor(private db: AngularFireDatabase) {}



  
  // Obtener todas las reseñas de un viaje
  getResenas(viajeId: string): Observable<any[]> {
    return this.db.list(`${this.dbPath}/${viajeId}/resenas`).valueChanges();
  }

  // Aprobar una reseña (agregar a las reseñas aprobadas)
  aprobarResena(viajeId: string, resenaId: string, resena: any): Promise<void> {
    // Escribe la reseña directamente en la lista de reseñas aprobadas
    return this.db.list(`${this.dbPath}/${viajeId}/resenas-aprobadas`).push(resena).then(() => {
      // Una vez aprobada, elimina la reseña pendiente
      this.rechazarResena(viajeId, resenaId);
    });
  }

  // Rechazar una reseña (eliminarla)
  rechazarResena(viajeId: string, resenaId: string): Promise<void> {
    return this.db.object(`${this.dbPath}/${viajeId}/resenas/${resenaId}`).remove();
  }
}
