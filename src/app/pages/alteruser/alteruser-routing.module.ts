import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlteruserPage } from './alteruser.page';

const routes: Routes = [
  {
    path: '',
    component: AlteruserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlteruserPageRoutingModule {}
