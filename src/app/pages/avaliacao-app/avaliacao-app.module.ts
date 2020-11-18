import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliacaoAppPageRoutingModule } from './avaliacao-app-routing.module';

import { AvaliacaoAppPage } from './avaliacao-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliacaoAppPageRoutingModule
  ],
  declarations: [AvaliacaoAppPage]
})
export class AvaliacaoAppPageModule {}
