import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncionarioPageRoutingModule } from './funcionario-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FuncionarioPage } from './funcionario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuncionarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FuncionarioPage]
})
export class FuncionarioPageModule {}
