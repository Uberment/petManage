import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Servico } from '../model/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/servico';

  constructor(private httpClient: HttpClient) { }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async salvar(servico: Servico) {
    if (servico.idServico === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(servico), this.httpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(servico), this.httpHeaders).toPromise();
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