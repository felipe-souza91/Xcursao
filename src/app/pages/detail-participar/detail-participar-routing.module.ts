import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailParticiparPage } from './detail-participar.page';

const routes: Routes = [
  {
    path: '',
    component: DetailParticiparPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailParticiparPageRoutingModule {}
