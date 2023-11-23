import { Component, OnInit } from '@angular/core';

import { Servico } from 'src/app/model/servico';
import { ServicoService } from 'src/app/services/servico.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
})
export class ServicoPage implements OnInit {

  servicos: Servico[];
;

  constructor(private loadingController: LoadingController, private allertController: AlertController,   private servicoService: ServicoService, private toastController: ToastController, private navController: NavController) {
    this.servicos = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();

    this.servicoService.listar().then((json) => {
      this.servicos = <Servico[]>(json);
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


  async excluir(servico: Servico){
    const alert = await this.allertController.create({
      header: 'Confirma a exclusão?',
      //message: servico.descricao,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.servicoService.excluir(servico.idServico).then(() => {
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