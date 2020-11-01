import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailscursionFavoritoPageRoutingModule } from './detailscursion-favorito-routing.module';

import { DetailscursionFavoritoPage } from './detailscursion-favorito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailscursionFavoritoPageRoutingModule
  ],
  declarations: [DetailscursionFavoritoPage]
})
export class DetailscursionFavoritoPageModule {}
