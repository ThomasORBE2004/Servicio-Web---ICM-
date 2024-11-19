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

  getResenas(viajeId: string): Observable<any[]> {
    return this.db.list(`${this.dbPath}/${viajeId}/resenas`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const val = c.payload.val();
          return typeof val === 'object' && val !== null
            ? { id: c.payload.key, ...val }
            : { id: c.payload.key }; // En caso de que no sea un objeto
        })
      )
    );
  }
  
  getViajes(): Observable<any[]> {
    return this.db.list(`${this.dbPath}`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const val = c.payload.val();
          return typeof val === 'object' && val !== null
            ? { id: c.payload.key, ...val }
            : { id: c.payload.key }; // En caso de que no sea un objeto
        })
      )
    );
  }
  
  

  // Aprobar una reseña (agregar a las reseñas aprobadas)
  aprobarResena(viajeId: string, resenaId: string, resena: any): Promise<void> {
    // Escribe la reseña directamente en la lista de reseñas aprobadas
    return this.db.list(`${this.dbPath}/${viajeId}/resenas_aprobadas`).push(resena).then(() => {
      // Una vez aprobada, elimina la reseña pendiente
      this.rechazarResena(viajeId, resenaId);
    });
  }

  // Rechazar una reseña (eliminarla)
  rechazarResena(viajeId: string, resenaId: string): Promise<void> {
    return this.db.object(`${this.dbPath}/${viajeId}/resenas/${resenaId}`).remove();
  }
}
