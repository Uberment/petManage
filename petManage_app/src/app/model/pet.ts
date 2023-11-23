export class Pet {
    idPet: number;
    idCliente: number;
    nome: string;
    raca: string;
    sexo: string;
    dtNascimento: string;
    peso: number;

    constructor(){
        this.idPet = 0;
        this.idCliente = 0;
        this.nome = "";
        this.sexo = "";
        this.raca = "";
        this.peso = 0;
        this.dtNascimento = new Date().toISOString();
    }
}