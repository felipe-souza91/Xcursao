import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticiparPage } from './participar.page';

const routes: Routes = [
  {
    path: '',
    component: ParticiparPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticiparPageRoutingModule {}
