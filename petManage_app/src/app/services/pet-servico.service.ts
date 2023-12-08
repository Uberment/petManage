import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetServico } from '../model/pet-servico';

@Injectable({
  providedIn: 'root'
})
export class PetServicoService {
  
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/petServico';

  constructor(private httpClient: HttpClient) { }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async salvar(petServico: PetServico) {
    if (petServico.idPetServico === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(petServico), this.httpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(petServico), this.httpHeaders).toPromise();
    }
  }

  async excluir(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async listarEspecifico(executado: number, pago: number) {
    let urlAuxiliar = this.url + "/" + executado + "/" + pago;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async procurarPorData(dtPedido: string) {
    let urlAuxiliar = this.url + "/data/" + dtPedido;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }
}
