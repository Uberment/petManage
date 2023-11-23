import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from 'src/app/model/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { LoadingController } from '@ionic/angular';
import { GenericValidator } from './GenericValidator ';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {
  funcionario: Funcionario;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private funcionarioService: FuncionarioService) {

    this.funcionario = new Funcionario();
    this.formGroup = this.formBuilder.group(
      {
        'nome': ["",
          Validators.compose(
            [
              Validators.required
            ])
        ],

        'cpf':
          this.formBuilder.control({ value: null, disabled: false }, GenericValidator.isValidCpf())
        ,
        'telefone': ["",
          Validators.compose(
            [
              Validators.required
            ])
        ],

        'endereco': ["",
          Validators.compose(
            [
              Validators.required
            ])
        ],

        'email': ["",
          Validators.compose(
            [
              Validators.email,
              Validators.required
            ])
        ],

        'senha': ["",
          Validators.compose(
            [
              Validators.required
            ])
        ],
      }
    )


    let funcionario = this.funcionarioService.funcionarioAutenticar();

    if (funcionario != null) {
      this.funcionario = funcionario;

      console.log(this.funcionario);

      this.formGroup.get('nome')?.setValue(this.funcionario.nome);
      this.formGroup.get('cpf')?.setValue(this.funcionario.cpf);
      this.formGroup.get('telefone')?.setValue(this.funcionario.telefone);
      this.formGroup.get('endereco')?.setValue(this.funcionario.endereco);
      this.formGroup.get('email')?.setValue(this.funcionario.email);
      this.formGroup.get('senha')?.setValue(this.funcionario.senha);
    }
  }

  ngOnInit() {
  }

  salvar() {
    this.funcionario.nome = this.formGroup.value.nome;
    this.funcionario.cpf = this.formGroup.value.cpf;
    this.funcionario.telefone = this.formGroup.value.telefone;
    this.funcionario.endereco = this.formGroup.value.endereco;
    this.funcionario.email = this.formGroup.value.email;
    this.funcionario.senha = this.formGroup.value.senha;

    this.funcionarioService.salvar(this.funcionario).then((json) => {
      this.funcionario = <Funcionario>(json);
      if (this.funcionario) {
        this.exibirMensagem('Registro salvo com sucesso!!!');
        this.funcionarioService.salvarFuncionarioSessao(this.funcionario);
        this.navController.navigateBack('/menu');
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