import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/model/servico';
import { ServicoService } from 'src/app/services/servico.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-servico',
  templateUrl: './add-servico.page.html',
  styleUrls: ['./add-servico.page.scss'],
})
export class AddServicoPage implements OnInit {
  servico: Servico;
  formGroup: FormGroup;

  constructor(private servicoService: ServicoService, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder) {

    this.servico = new Servico();

    this.formGroup = this.formBuilder.group(
      {
        'nome': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(4)
            ])
        ],

        'valor': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.min(1)
            ])
        ],
      }
    )

    let id = this.activatedRoute.snapshot.params['id'];

    if (id != null) {
      this.servicoService.buscarPorId(parseFloat(id)).then((json) => {
        this.servico = <Servico>(json);
        this.formGroup.get('nome')?.setValue(this.servico.nome);
        this.formGroup.get('valor')?.setValue(this.servico.valor);
      });
    }
  }

  ngOnInit() {
  }

  salvar() {
    this.servico.nome = this.formGroup.value.nome;
    this.servico.valor = this.formGroup.value.valor;

    this.servicoService.salvar(this.servico).then((json) => {
      this.servico = <Servico>(json);
      if (this.servico) {
        this.exibirMensagem('Registro salvo com sucesso!!!');
        this.navController.navigateBack('/servico');
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