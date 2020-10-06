import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailscursionPage } from './detailscursion.page';

const routes: Routes = [
  {
    path: '',
    component: DetailscursionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailscursionPageRoutingModule {}
