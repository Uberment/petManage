import { Component, OnInit } from '@angular/core';

import { Funcionario } from 'src/app/model/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

import { AlertController, IonDatetime } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
})

export class FuncionarioPage implements OnInit {

  funcionarios: Funcionario[];
  funcionarioAutenticado: Funcionario;

  constructor(private allertController: AlertController, private toastController: ToastController,
    private navController: NavController, private funcionarioService: FuncionarioService, private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute) {
      this.funcionarioAutenticado = this.funcionarioService.funcionarioAutenticar();
    this.funcionarios = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();
    this.funcionarioService.listar().then((json) => {
      this.funcionarios = <Funcionario[]>(json);
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

  async excluir(funcionario: Funcionario) {
    const alert = await this.allertController.create({
      header: 'Confirma a exclusão?',
      message: funcionario.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.funcionarioService.excluir(funcionario.idFuncionario).then(() => {
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