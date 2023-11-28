import { Cliente } from "./cliente";
import { Pet } from "./pet";

export class PetServico {
    idPetServico: number;
    idPet: number;
    pet: Pet;
    idCliente: number;
    cliente: Cliente;
    observacao: string;
    dtPedido: string;
    dtExecucao: string;
    valor: number;
    flPago: boolean;
    flExecutado: boolean;

    constructor() {
        this.idPetServico = 0;
        this.idPet = 0;
        this.pet = new Pet();
        this.idCliente = 0;
        this.cliente = new Cliente();
        this.observacao = "";
        this.dtExecucao = "";
        this.dtPedido = "";
        this.valor = 0;
        this.flExecutado = false;
        this.flPago = false;
    }
}