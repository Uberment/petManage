
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { PetServico } from 'src/app/model/pet-servico';
import { PetServicoService } from 'src/app/services/pet-servico.service';

@Component({
  selector: 'app-agenda-data',
  templateUrl: './agenda-data.page.html',
  styleUrls: ['./agenda-data.page.scss'],
})
export class AgendaDataPage implements OnInit {
  formGroup: FormGroup;
  agendas: PetServico[];
  dtPedido: string;
  hoje: string;

  constructor(private alertController: AlertController, private petServicoService: PetServicoService, private formBuilder: FormBuilder, private toastController: ToastController,
    private loadingController: LoadingController) {
    this.dtPedido = "";
    this.agendas = [];
    this.hoje = new Date().toISOString().split('T')[0];

    this.formGroup = this.formBuilder.group(
      {
        'dtPedido': [this.hoje, Validators.compose([
          Validators.required,
        ])],
      });
  }

  ngOnInit() {
  }


  async procurar() {
    this.exibirLoader();

    this.dtPedido = this.formGroup.value.dtPedido.split('T')[0];;

    await this.petServicoService.procurarPorData(this.dtPedido).then((json) => {
      this.agendas = <PetServico[]>(json);
      if (this.agendas) {
        this.exibirMensagem('Resultados encontrados!!!');
      } else {
        this.exibirMensagem('Erro ao salvar o registro!')
      }
    })
      .catch((error) => {
        this.exibirMensagem('Erro ao salvar o registro! Erro: ' + error['mensage']);
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

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async excluir(agenda: PetServico) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      //message: cliente.descricao,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.petServicoService.excluir(agenda.idPetServico).then(() => {
              this.procurar();
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
}

