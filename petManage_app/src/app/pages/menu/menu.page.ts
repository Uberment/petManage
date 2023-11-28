import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  isGerente: boolean = false;

  public appPages = [
    { title: 'Clientes', url: '/cliente', icon: 'accessibility', color: "primary" },
    { title: 'Meus Dados', url: '/meus-dados', icon: 'id-card', color: "primary" },
    { title: 'Agendar Visita', url: '/agendar', icon: 'add', color: "primary" },
    { title: 'Agendas', url: '/agenda', icon: 'library', color: "primary" }
  ];

  public appGerentePages = [
    { title: 'Serviços', url: '/servico', icon: 'caret-forward', color: "primary" },
    { title: 'Funcionários', url: '/funcionario', icon: 'people', color: "primary" },
  ];

  constructor(private funcionarioService: FuncionarioService, private toastController: ToastController, private navController: NavController) {
   
  }

  async verificarGerente() {
    let funcionario = this.funcionarioService.funcionarioAutenticar();
   
    this.isGerente = funcionario.gerente;
  }

  ngOnInit() {
    this.verificarGerente();
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  teste(){
    localStorage.setItem('funcionarioSessao', JSON.stringify(null));
    this.navController.navigateBack('/login')
  }
}