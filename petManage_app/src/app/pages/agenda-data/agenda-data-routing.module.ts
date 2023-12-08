import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaDataPage } from './agenda-data.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaDataPageRoutingModule {}
