import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddphotoPageRoutingModule } from './addphoto-routing.module';

import { AddphotoPage } from './addphoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddphotoPageRoutingModule
  ],
  declarations: [AddphotoPage]
})
export class AddphotoPageModule {}
