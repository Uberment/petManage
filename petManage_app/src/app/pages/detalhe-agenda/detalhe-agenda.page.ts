import { ClienteService } from 'src/app/services/cliente.service';
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
import { Servico } from 'src/app/model/servico';
import { PetServico } from 'src/app/model/pet-servico';
import { PetServicoService } from 'src/app/services/pet-servico.service';
import { ServicoService } from 'src/app/services/servico.service';
import { PetServicoOrdem } from 'src/app/model/pet-servico-ordem';
import { PetServicoOrdemService } from 'src/app/services/pet-servico-ordem.service';

@Component({
  selector: 'app-detalhe-agenda',
  templateUrl: './detalhe-agenda.page.html',
  styleUrls: ['./detalhe-agenda.page.scss'],
})

export class DetalheAgendaPage implements OnInit {
  formGroup: FormGroup; 
  petServicoOrdems: PetServicoOrdem[];
  petServico: PetServico;

  constructor(private servicoService: ServicoService, private clienteService: ClienteService, private petServicoService: PetServicoService, private petServicoOrdemService: PetServicoOrdemService, private formBuilder: FormBuilder, private allertController: AlertController, private toastController: ToastController,
    private navController: NavController, private petService: PetService, private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute) {

    this.petServicoOrdems = [];
    this.petServico = new PetServico();

    this.formGroup = this.formBuilder.group(
      {
        'nomeCliente': [],
        'telefoneCliente': [],
        'nomePet': [],
        'valor': [],
        'dtPedido': [],
      });

    let id = this.activatedRoute.snapshot.params['id'];
    if (id != null) {
      this.petServicoService.buscarPorId(id).then((json) => {
        this.petServico = <PetServico>(json);

        this.petServicoOrdemService.listarPorAgenda(this.petServico.idPetServico).then((json) => {
          this.petServicoOrdems = <PetServicoOrdem[]>(json);
        });

        this.formGroup.get('nomeCliente')?.setValue(this.petServico.cliente.nome);
        this.formGroup.get('telefoneCliente')?.setValue(this.petServico.cliente.telefone);
        this.formGroup.get('nomePet')?.setValue(this.petServico.pet.nome);
        this.formGroup.get('valor')?.setValue(this.petServico.valor);
        this.formGroup.get('dtPedido')?.setValue(this.petServico.dtPedido);
      });
    }
  }

  ngOnInit() {
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}