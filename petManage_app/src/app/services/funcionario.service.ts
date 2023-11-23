import { Injectable } from '@angular/core';
import { Funcionario } from '../model/funcionario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/funcionario';

  constructor(private httpClient: HttpClient) { }

  async fazerLogin(email: string, senha: string) {
    let urlAuxiliar = this.url + "/" + email + "/" + senha + "/authenticate";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  salvarFuncionarioSessao(funcionario: Funcionario) {
    localStorage.setItem('funcionarioSessao', JSON.stringify(funcionario));
  }

  funcionarioAutenticar() {
    return JSON.parse(localStorage.getItem('funcionarioSessao') || "null");
  }

  async isFuncionarioExists(email: String) {
    let urlAuxiliar = this.url + "/" + email + '/exists';
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  // async isGerente(email: String) {
  //   let urlAuxiliar = this.url + "/gerente/" + email + '/exists';
  //   return await this.httpClient.get(urlAuxiliar).toPromise();
  // }

  async recuperarSenha(email: String) {
    let urlAuxiliar = this.url + "/recover/" + email;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }


  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async salvar(funcionario: Funcionario) {
    if (funcionario.idFuncionario === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(funcionario), this.httpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(funcionario), this.httpHeaders).toPromise();
    }
  }

  async excluir(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }
}