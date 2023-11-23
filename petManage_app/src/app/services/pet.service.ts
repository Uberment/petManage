import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '../model/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8080/api/pet';

  constructor(private httpClient: HttpClient) { }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async buscarPorIdCliente(idCliente: number) {
    let urlAuxiliar = this.url + "/cliente/" + idCliente;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async salvar(pet: Pet) {
    if (pet.idPet === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(pet), this.httpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(pet), this.httpHeaders).toPromise();
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