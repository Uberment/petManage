
import { Pet } from 'src/app/model/pet';
import { PetService } from 'src/app/services/pet.service';

import { Component, OnInit } from '@angular/core';
import { AlertController, IonDatetime } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage implements OnInit {
  pets: Pet[];
  pet: Pet;
  formGroup: FormGroup;
  idCliente: number;
  hoje: string;

  constructor(private petService: PetService, private alertController: AlertController, private loadingController: LoadingController, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder) {
    this.pets = [];
    let idCliente = this.activatedRoute.snapshot.params['idCliente'];
    this.idCliente = idCliente;
    this.hoje = new Date().toISOString().split('T')[0];

    this.pet = new Pet();

    this.formGroup = this.formBuilder.group(
      {
        'nome': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(1)
            ])
        ],
        'sexo': ["",
          Validators.compose(
            [
              Validators.required
            ])
        ],
        'raca': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(3)
            ])
        ],
        'peso': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.min(1)
            ])
        ],
        'dtNascimento': [this.hoje, Validators.compose([
          Validators.required,
        ])],
      }
    )

    let id = this.activatedRoute.snapshot.params['id'];
    if (id != null && id != 0) {
      this.petService.buscarPorId(parseFloat(id)).then((json) => {
        this.pet = <Pet>(json);
        this.formGroup.get('nome')?.setValue(this.pet.nome);
        this.formGroup.get('sexo')?.setValue(this.pet.sexo);
        this.formGroup.get('raca')?.setValue(this.pet.raca);
        this.formGroup.get('peso')?.setValue(this.pet.peso);
        this.formGroup.get('dtNascimento')?.setValue(this.pet.dtNascimento);
      });
    }
  }

  ngOnInit() {
  }

  salvar() {
    this.pet.nome = this.formGroup.value.nome;
    this.pet.sexo = this.formGroup.value.sexo;
    this.pet.raca = this.formGroup.value.raca;
    this.pet.peso = this.formGroup.value.peso;
    this.pet.idCliente =  this.idCliente;
    this.pet.dtNascimento = this.formGroup.value.dtNascimento;

    this.petService.salvar(this.pet).then((json) => {
      this.pet = <Pet>(json);
      if (this.pet) {
        this.exibirMensagem('Registro salvo com sucesso!!!');
        this.navController.navigateBack('/pet/' + this.idCliente);
      } else {
        this.exibirMensagem('Erro ao salvar o registro!')
      }
    })
      .catch((error) => {
        this.exibirMensagem('Erro ao salvar o registro! Erro: ' + error['mensage']);
      });

  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
