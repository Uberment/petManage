import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})

export class ClientePage implements OnInit {
  clientes: Cliente[];

  constructor(private loadingController: LoadingController, private clienteService: ClienteService, private allertController: AlertController, private toastController: ToastController, private navController: NavController) {
    this.clientes = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }
  async carregarLista() {
    this.exibirLoader();

    await this.clienteService.listar()
      .then((json) => {
        this.clientes = <Cliente[]>(json);
      });

    this.fecharLoader();
  }

  exibirLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 500);
  }

  async excluir(cliente: Cliente) {
    const alert = await this.allertController.create({
      header: 'Confirma a exclusão?',
      //message: cliente.descricao,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.clienteService.excluir(cliente.idCliente).then(() => {
              this.carregarLista();
              this.exibirMensagem('Registro excluído com sucesso!');
            }).catch(() => {
              this.exibirMensagem('Erro ao excluir o registro:');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}