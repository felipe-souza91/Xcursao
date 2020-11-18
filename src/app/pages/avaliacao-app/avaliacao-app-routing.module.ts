import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoAppPage } from './avaliacao-app.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliacaoAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliacaoAppPageRoutingModule {}
