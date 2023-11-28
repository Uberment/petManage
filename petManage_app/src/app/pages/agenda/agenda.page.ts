import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { PetServico } from 'src/app/model/pet-servico';
import { PetServicoService } from 'src/app/services/pet-servico.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  agendas: PetServico[];
  formGroup: FormGroup;

  constructor(private loadingController: LoadingController, private formBuilder: FormBuilder, private petServicoService: PetServicoService, private allertController: AlertController, private toastController: ToastController, private navController: NavController) {
    this.agendas = [];

    this.formGroup = this.formBuilder.group(
      {
        'lista': ["todos"],
      });

  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();

    let tipoLista = this.formGroup.value.lista;

    if (tipoLista === "todos") {
      await this.petServicoService.listar()
        .then((json) => {
          this.agendas = <PetServico[]>(json);
        });
    } else {
      let executado = -1;
      let pago = -1;

      if (tipoLista === "executado") {
        executado = 1;
      } else if (tipoLista === "pago") {
        pago = 1;
      } else if (tipoLista === "executadoPago") {
        executado = 1;
        pago = 1;
      }

      await this.petServicoService.listarEspecifico(executado, pago)
        .then((json) => {
          this.agendas = <PetServico[]>(json);
        });
    }


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

  async excluir(agenda: PetServico) {
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
            this.petServicoService.excluir(agenda.idPetServico).then(() => {
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