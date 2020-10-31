import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarLoginPage } from './alterar-login.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarLoginPageRoutingModule {}
