import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailParticiparPageRoutingModule } from './detail-participar-routing.module';

import { DetailParticiparPage } from './detail-participar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailParticiparPageRoutingModule
  ],
  declarations: [DetailParticiparPage]
})
export class DetailParticiparPageModule {}
