import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailscursionFavoritoPage } from './detailscursion-favorito.page';

const routes: Routes = [
  {
    path: '',
    component: DetailscursionFavoritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailscursionFavoritoPageRoutingModule {}
