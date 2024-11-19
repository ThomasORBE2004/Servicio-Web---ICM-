import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private dbPath = '/viajes';

  constructor(private db: AngularFireDatabase) {}

  // Obtener reseñas pendientes de un viaje
  getResenas(viajeId: string): Observable<any[]> {
    return this.db.list(`${this.dbPath}/${viajeId}/resenas`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.key,
          ...c.payload.val() as object,
        }))
      )
    );
  }

  // Obtener la lista de viajes
  getViajes(): Observable<any[]> {
    return this.db.list(this.dbPath).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.key,
          ...c.payload.val() as object,
        }))
      )
    );
  }

  // Aprobar una reseña: agregar a aprobadas y eliminar de pendientes
  aprobarResena(viajeId: string, resenaId: string, resena: any): Promise<void> {
    return this.db.list(`${this.dbPath}/${viajeId}/resenas_aprobadas`).push(resena).then(() => {
      return this.rechazarResena(viajeId, resenaId); // Elimina de pendientes
    });
  }

  // Rechazar una reseña: eliminar de la lista de pendientes
  rechazarResena(viajeId: string, resenaId: string): Promise<void> {
    return this.db.object(`${this.dbPath}/${viajeId}/resenas/${resenaId}`).remove();
  }

  // Obtener reseñas aprobadas de un viaje (por si lo necesitas)
  getResenasAprobadas(viajeId: string): Observable<any[]> {
    return this.db.list(`${this.dbPath}/${viajeId}/resenas_aprobadas`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.key,
          ...c.payload.val() as object,
        }))
      )
    );
  }
}
