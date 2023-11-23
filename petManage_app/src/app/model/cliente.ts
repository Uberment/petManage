export class Cliente {
    idCliente: number;
    nome: string;
    cpf: string;
    endereco: string;
    email: string;
    telefone: string;

    constructor() {
        this.idCliente = 0;
        this.nome = "";
        this.cpf = "";
        this.endereco = "";
        this.email = "";
        this.telefone = "";
    }
}