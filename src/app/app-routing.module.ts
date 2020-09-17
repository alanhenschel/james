import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstablishmentComponent } from './pages/establishment/establishment.component';
import { EstablishmentsComponent } from './pages/establishments/establishments.component';

const routes: Routes = [
  { path: '', component: EstablishmentsComponent },
  { path: 'establishments', component: EstablishmentsComponent },
  { path: 'establishments/:id', component: EstablishmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
