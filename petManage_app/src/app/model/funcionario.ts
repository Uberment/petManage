export class Funcionario {
    idFuncionario: number;
    nome: string;
    cpf: string;
    telefone: string;
    gerente: boolean;
    endereco: string;
    email: string;
    senha: string;

    constructor(){
        this.idFuncionario = 0;
        this.nome  = "";
        this.cpf = "";
        this.telefone = "";
        this.gerente = false;
        this.endereco = "";
        this.email = "";
        this.senha = "";
    }
}