import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentariosListComponent } from './comentarios-list/comentarios-lista.component';

const routes: Routes = [

  { path: 'comentarios', component: ComentariosListComponent },
  { path: '', redirectTo: '/comentarios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
