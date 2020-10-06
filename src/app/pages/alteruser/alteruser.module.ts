import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlteruserPageRoutingModule } from './alteruser-routing.module';

import { AlteruserPage } from './alteruser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlteruserPageRoutingModule
  ],
  declarations: [AlteruserPage]
})
export class AlteruserPageModule {}
