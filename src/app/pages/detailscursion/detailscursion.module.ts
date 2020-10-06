import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailscursionPageRoutingModule } from './detailscursion-routing.module';

import { DetailscursionPage } from './detailscursion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailscursionPageRoutingModule
  ],
  declarations: [DetailscursionPage]
})
export class DetailscursionPageModule {}
