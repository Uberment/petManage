import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddServicoPage } from './add-servico.page';

const routes: Routes = [
  {
    path: '',
    component: AddServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddServicoPageRoutingModule {}
