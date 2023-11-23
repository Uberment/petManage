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
  selector: 'app-agendar',
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage implements OnInit {
  formGroup: FormGroup;
  formGroup2: FormGroup;
  servicos: Servico[];
  clientes: Cliente[];
  pets: Pet[];
  petServicoOrdems: PetServicoOrdem[];
  petServico: PetServico;
  hoje: string;

  constructor(private servicoService: ServicoService, private clienteService: ClienteService, private petServicoService: PetServicoService, private petServicoOrdemService: PetServicoOrdemService, private formBuilder: FormBuilder, private allertController: AlertController, private toastController: ToastController,
    private navController: NavController, private petService: PetService, private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute) {
    this.servicos = [];
    this.clientes = [];
    this.pets = [];
    this.petServicoOrdems = [];
    this.petServico = new PetServico();
    this.hoje = new Date().toISOString().split('T')[0];

    this.formGroup = this.formBuilder.group(
      {
        'idCliente': [,
          Validators.compose(
            [
              Validators.required,
            ])
        ],
        'idPet': [,
          Validators.compose(
            [
              Validators.required
            ])
        ],
        'observacao': ["",
        ],
        'valor': [0,
        ],
        'flPago': [false,
        ],
        'flExecutado': [false,
        ],
        'dtPedido': [this.hoje, Validators.compose([
          Validators.required,
        ])],
      });

    this.formGroup2 = this.formBuilder.group(
      {
        'idServico': [,
          Validators.compose(
            [
              Validators.required,
            ])
        ],
      }
    )

    this.carregarLista();

    let id = this.activatedRoute.snapshot.params['id'];
    if (id != null) {
      this.petServicoService.buscarPorId(id).then((json) => {
        this.petServico = <PetServico>(json);

        this.petServicoOrdemService.listarPorAgenda(this.petServico.idPetServico).then((json) => {
          this.petServicoOrdems = <PetServicoOrdem[]>(json);

          for (let petServicoOrdem of this.petServicoOrdems) {
            let servico = this.servicos.find((servico: Servico) =>
              servico.idServico === petServicoOrdem.idServico
            )

            petServicoOrdem.servico = servico!;
          }

        });

        this.formGroup.get('idCliente')?.setValue(this.petServico.idCliente);

        this.carregarListaPet();

        this.formGroup.get('idPet')?.setValue(this.petServico.idPet);
        this.formGroup.get('observacao')?.setValue(this.petServico.observacao);
        this.formGroup.get('valor')?.setValue(this.petServico.valor);
        this.formGroup.get('dtPedido')?.setValue(this.petServico.dtPedido);
        this.formGroup.get('flPago')?.setValue(this.petServico.flPago);
        this.formGroup.get('flExecutado')?.setValue(this.petServico.flExecutado);
      });
    }
  }

  ngOnInit() {
  }

  salvar() {
    this.petServico.idPet = this.formGroup.value.idPet;
    this.petServico.idCliente = this.formGroup.value.idCliente;
    this.petServico.observacao = this.formGroup.value.observacao;
    this.petServico.dtPedido = this.formGroup.value.dtPedido;
    this.petServico.valor = this.formGroup.value.valor;
    this.petServico.flPago = this.formGroup.value.flPago;
    this.petServico.flExecutado = this.formGroup.value.flExecutado;

    if (this.petServico.flExecutado) {
      this.petServico.dtExecucao = this.hoje;
    } else {
      this.petServico.dtExecucao = "2023-01-01"
    }

    this.petServicoService.salvar(this.petServico).then((json) => {
      this.petServico = <PetServico>(json);
      if (this.petServico) {
        this.exibirMensagem('Registro salvo com sucesso!!!');
        this.navController.navigateBack('/menu');
      } else {
        this.exibirMensagem('Erro ao salvar o registro!')
      }
    })
      .catch((error) => {
        this.exibirMensagem('Erro ao salvar o registro! Erro: ' + error['mensage']);
      });
  }

  async carregarLista() {
    this.exibirLoader();

    await this.clienteService.listar()
      .then((json) => {
        this.clientes = <Cliente[]>(json);
      });

    await this.servicoService.listar()
      .then((json) => {
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

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async carregarListaPet() {
    let idCliente = this.formGroup.value.idCliente;

    await this.petService.buscarPorIdCliente(idCliente)
      .then((json) => {
        this.pets = <Pet[]>(json);
      });
  }

  adicionar() {
    let petServicoOrdem: PetServicoOrdem = new PetServicoOrdem();
    petServicoOrdem.idPetServico = this.petServico.idPetServico;
    petServicoOrdem.idServico = this.formGroup2.value.idServico;

    this.petServicoOrdemService.salvar(petServicoOrdem).then((json) => {
      petServicoOrdem = <PetServicoOrdem>(json);
      if (petServicoOrdem) {
        this.exibirMensagem('Registro salvo com sucesso!!!');
        this.carregarListaPetServicoOrdem();

        let valor = this.formGroup.value.valor;

        let servico = this.servicos.find((servico: Servico) =>
          servico.idServico === this.formGroup2.value.idServico
        )

        petServicoOrdem.servico = servico!;

        this.formGroup.get('valor')?.setValue(valor + petServicoOrdem.servico.valor);

      } else {
        this.exibirMensagem('Erro ao salvar o registro!')
      }
    })
      .catch((error) => {
        this.exibirMensagem('Erro ao salvar o registro! Erro: ' + error['mensage']);
      });


  }

  async excluir(petServicoOrdem: PetServicoOrdem) {
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
            this.petServicoOrdemService.excluir(petServicoOrdem.idPetServicoOrdem).then(() => {
              this.carregarListaPetServicoOrdem();

              let valor = this.formGroup.value.valor;
              this.formGroup.get('valor')?.setValue(valor - petServicoOrdem.servico.valor);

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

  async carregarListaPetServicoOrdem() {
    this.petServicoOrdemService.listarPorAgenda(this.petServico.idPetServico).then((json) => {
      this.petServicoOrdems = <PetServicoOrdem[]>(json);

      for (let petServicoOrdem of this.petServicoOrdems) {
        let servico = this.servicos.find((servico: Servico) =>
          servico.idServico === petServicoOrdem.idServico
        )

        petServicoOrdem.servico = servico!;
      }
    })
  }
}
