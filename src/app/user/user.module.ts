import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import {AutosizeModule} from 'ngx-autosize'; //Añadir la libreria de autosize

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    AutosizeModule
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
