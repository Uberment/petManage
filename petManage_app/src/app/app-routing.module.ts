import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'funcionario',
    loadChildren: () => import('./pages/funcionario/funcionario.module').then( m => m.FuncionarioPageModule)
  },
  {
    path: 'pet',
    loadChildren: () => import('./pages/pet/pet.module').then( m => m.PetPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'cliente/:id',
    loadChildren: () => import('./pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'pet/:id',
    loadChildren: () => import('./pages/pet/pet.module').then( m => m.PetPageModule)
  },
  {
    path: 'add-cliente',
    loadChildren: () => import('./pages/add-cliente/add-cliente.module').then( m => m.AddClientePageModule)
  },
  {
    path: 'add-cliente/:id',
    loadChildren: () => import('./pages/add-cliente/add-cliente.module').then( m => m.AddClientePageModule)
  },
  {
    path: 'add-funcionario',
    loadChildren: () => import('./pages/add-funcionario/add-funcionario.module').then( m => m.AddFuncionarioPageModule)
  },
  {
    path: 'add-funcionario/:id',
    loadChildren: () => import('./pages/add-funcionario/add-funcionario.module').then( m => m.AddFuncionarioPageModule)
  },
  {
    path: 'add-pet',
    loadChildren: () => import('./pages/add-pet/add-pet.module').then( m => m.AddPetPageModule)
  },
  {
    path: 'add-pet/:id',
    loadChildren: () => import('./pages/add-pet/add-pet.module').then( m => m.AddPetPageModule)
  },
  {
    path: 'add-pet/:id/cliente/:idCliente',
    loadChildren: () => import('./pages/add-pet/add-pet.module').then( m => m.AddPetPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'agendar',
    loadChildren: () => import('./pages/agendar/agendar.module').then( m => m.AgendarPageModule)
  },
  {
    path: 'agendar/:id',
    loadChildren: () => import('./pages/agendar/agendar.module').then( m => m.AgendarPageModule)
  },
  {
    path: 'meus-dados',
    loadChildren: () => import('./pages/meus-dados/meus-dados.module').then( m => m.MeusDadosPageModule)
  },
  {
    path: 'add-servico',
    loadChildren: () => import('./pages/add-servico/add-servico.module').then( m => m.AddServicoPageModule)
  },
  {
    path: 'add-servico/:id',
    loadChildren: () => import('./pages/add-servico/add-servico.module').then( m => m.AddServicoPageModule)
  },
  {
    path: 'servico',
    loadChildren: () => import('./pages/servico/servico.module').then( m => m.ServicoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'recuperar-senha',
    loadChildren: () => import('./pages/recuperar-senha/recuperar-senha.module').then( m => m.RecuperarSenhaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }