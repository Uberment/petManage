import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheAgendaPageRoutingModule } from './detalhe-agenda-routing.module';

import { DetalheAgendaPage } from './detalhe-agenda.page';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheAgendaPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ],
  declarations: [DetalheAgendaPage]
})
export class DetalheAgendaPageModule { }
