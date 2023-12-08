import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheAgendaPage } from './detalhe-agenda.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheAgendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheAgendaPageRoutingModule {}
