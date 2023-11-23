
import { Pet } from 'src/app/model/pet';
import { PetService } from 'src/app/services/pet.service';
import { Cliente } from 'src/app/model/cliente';

import { Component, OnInit } from '@angular/core';
import { AlertController, IonDatetime } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})

export class PetPage implements OnInit {
  pets: Pet[];
  cliente: Cliente;
  idCliente: number;

  constructor(private allertController: AlertController, private toastController: ToastController,
    private navController: NavController, private petService: PetService, private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute) {
    this.pets = [];
    this.cliente = new Cliente();

    let id = this.activatedRoute.snapshot.params['id'];
    this.idCliente = id;
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();

    this.petService.buscarPorIdCliente(this.idCliente).then((json) => {
      this.pets = <Pet[]>(json);
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

  async excluir(pet: Pet) {
    const alert = await this.allertController.create({
      header: 'Confirma a exclusão?',
      //message: pet.descricao,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.petService.excluir(pet.idPet).then(() => {
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