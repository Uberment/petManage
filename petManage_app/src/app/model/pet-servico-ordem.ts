import { Servico } from "./servico";

export class PetServicoOrdem {
    idPetServicoOrdem: number;
    idPetServico: number;
    idServico: number;
    servico: Servico;

    constructor(){
        this.idPetServico = 0;
        this.idPetServicoOrdem = 0;
        this.idServico = 0;
        this.servico = new Servico();
    }
}
