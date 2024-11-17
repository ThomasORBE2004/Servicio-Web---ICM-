import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentariosListComponent } from './comentarios-list/comentarios-list.component';

const routes: Routes = [
  { path: 'comentarios', component: ComentariosListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
