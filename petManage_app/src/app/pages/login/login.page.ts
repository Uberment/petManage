import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Funcionario } from 'src/app/model/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;

  constructor(private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private funcionarioService: FuncionarioService) {

    let funcionarioSessao = this.funcionarioService.funcionarioAutenticar();

    if (funcionarioSessao !== null){
      this.exibirMensagem('Bem vindo ao sistema!');
        this.navController.navigateBack('/menu')
    } 

    this.formGroup = this.formBuilder.group(
      {
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
  }

  ngOnInit() {
  }

  async fazerLogin() {
      let email = this.formGroup.value.email;
      let senha = this.formGroup.value.senha;

    await this.funcionarioService.fazerLogin(email, senha).then((json) => {
      let funcionario = <Funcionario>(json);

      if (funcionario === null) {
        this.exibirMensagem('Usuário não encontrado.');
      } else {

        this.funcionarioService.salvarFuncionarioSessao(funcionario);

        this.exibirMensagem('Bem vindo ao sistema!');
        this.navController.navigateBack('/menu')
      }
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
