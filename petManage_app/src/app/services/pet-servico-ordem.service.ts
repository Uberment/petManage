import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetServicoOrdem } from '../model/pet-servico-ordem';

@Injectable({
  providedIn: 'root'
})
export class PetServicoOrdemService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/petServicoOrdem';

  constructor(private httpClient: HttpClient) { }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async salvar(petServicoOrdem: PetServicoOrdem) {
    return await this.httpClient.post(this.url, JSON.stringify(petServicoOrdem), this.httpHeaders).toPromise();
  }

  async excluir(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async listarPorAgenda(idPetServico: number) {
    let urlAuxiliar = this.url + "/agenda/" + idPetServico;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }
}
