import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentariosListComponent } from './comentarios-list/comentarios-list.component';
import { HomeComponent } from './home/home.component';
import { ArchivosComponent } from './archivos/archivos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comentarios', component: ComentariosListComponent },
  { path: 'archivos', component: ArchivosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
