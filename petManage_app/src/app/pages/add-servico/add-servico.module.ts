import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddServicoPageRoutingModule } from './add-servico-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { AddServicoPage } from './add-servico.page';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddServicoPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ],
  declarations: [AddServicoPage]
})
export class AddServicoPageModule {}
