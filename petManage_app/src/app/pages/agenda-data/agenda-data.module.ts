import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaDataPageRoutingModule } from './agenda-data-routing.module';

import { AgendaDataPage } from './agenda-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaDataPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgendaDataPage]
})
export class AgendaDataPageModule { }
