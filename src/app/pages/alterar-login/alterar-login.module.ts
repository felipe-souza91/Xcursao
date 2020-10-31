import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarLoginPageRoutingModule } from './alterar-login-routing.module';

import { AlterarLoginPage } from './alterar-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarLoginPageRoutingModule
  ],
  declarations: [AlterarLoginPage]
})
export class AlterarLoginPageModule {}
