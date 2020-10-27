import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddphotoPage } from './addphoto.page';

const routes: Routes = [
  {
    path: '',
    component: AddphotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddphotoPageRoutingModule {}
