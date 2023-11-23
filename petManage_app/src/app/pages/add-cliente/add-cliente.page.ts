import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {
  cliente: Cliente;
  formGroup: FormGroup;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder) {
    this.cliente = new Cliente();

    this.formGroup = this.formBuilder.group(
      {
        'nome': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(5)
            ])
        ],
        'cpf': ["",
          Validators.compose(
            [ 
              Validators.minLength(11),
              Validators.maxLength(11),
              Validators.required,
            ])
        ],
        'endereco': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(10)
            ])
        ],
        'email': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.email
            ])
        ],
        'telefone': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(11),
              Validators.maxLength(11),
            ])
        ],
      }
    )

    let id = this.activatedRoute.snapshot.params['id'];

    if (id != null) {
      this.clienteService.buscarPorId(parseFloat(id)).then((json) => {
        this.cliente = <Cliente>(json);
        this.formGroup.get('nome')?.setValue(this.cliente.nome);
        this.formGroup.get('cpf')?.setValue(this.cliente.cpf);
        this.formGroup.get('endereco')?.setValue(this.cliente.endereco);
        this.formGroup.get('email')?.setValue(this.cliente.email);
        this.formGroup.get('telefone')?.setValue(this.cliente.telefone);
      })
    }
  }

  ngOnInit() {
  }

  salvar() {
    this.cliente.nome = this.formGroup.value.nome;
    this.cliente.cpf = this.formGroup.value.cpf;
    this.cliente.endereco = this.formGroup.value.endereco;
    this.cliente.email = this.formGroup.value.email;
    this.cliente.telefone = this.formGroup.value.telefone;

    this.clienteService.salvar(this.cliente).then((json) => {
      this.cliente = <Cliente>(json);
      if (this.cliente) {
        this.exibirMensagem('Registro salvo com sucesso!!!');
        this.navController.navigateBack('/cliente');
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
