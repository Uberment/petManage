export class PetServico {
    idPetServico: number;
    idPet: number;
    idCliente: number;
    observacao: string;
    dtPedido: string;
    dtExecucao: string;
    valor: number;
    flPago: boolean;
    flExecutado: boolean;

    constructor(){
        this.idPetServico = 0;
        this.idPet = 0;
        this.idCliente = 0;
        this.observacao  = "";
        this.dtExecucao = "";
        this.dtPedido = "";
        this.valor  = 0;
        this.flExecutado = false;
        this.flPago = false;
    }
}