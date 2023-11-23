DROP SCHEMA IF EXISTS petShop;
CREATE SCHEMA IF NOT EXISTS petShop DEFAULT CHARACTER SET utf8;
USE petShop;

CREATE TABLE IF NOT EXISTS Funcionario (
  idFuncionario INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  telefone VARCHAR(11) NULL DEFAULT NULL,
  endereco VARCHAR(70) NULL DEFAULT NULL,
  email VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  gerente BIT,
  PRIMARY KEY (idFuncionario))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO Funcionario (nome, cpf, telefone, endereco, email, senha, gerente) VALUES("Ana Lícia", "12345678910", "31994747585", "Timóteo", "analiciateixeira2016@gmail.com", "1234", 1);

CREATE TABLE IF NOT EXISTS Servico (
 idServico INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  valor DECIMAL(19,2) NOT NULL,
  PRIMARY KEY (idServico))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Cliente (
  idCliente INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  endereco VARCHAR(70) NOT NULL,
  email VARCHAR(100) NULL DEFAULT NULL,
  telefone VARCHAR(11) NULL DEFAULT NULL,
  PRIMARY KEY (idCliente))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Pet (
  idPet INT(11) NOT NULL AUTO_INCREMENT,
  idCliente INT(11) NOT NULL,
  nome VARCHAR(45) NOT NULL,
  raca VARCHAR(45) NOT NULL,
  sexo VARCHAR(1) NOT NULL,
  dtNascimento DATE NULL DEFAULT NULL,
  peso DECIMAL(19,2) NULL DEFAULT NULL,
  PRIMARY KEY (idPet),
  
  CONSTRAINT fk_pet_Cliente
    FOREIGN KEY (idCliente)
    REFERENCES Cliente (idCliente)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Pet_Servico (
  idPetServico INT(11) NOT NULL auto_increment,
  idPet INT(11) NOT NULL,
  idCliente INT(11) NOT NULL,
  observacao VARCHAR(65) NULL DEFAULT NULL,
  dtPedido DATE NOT NULL,
  dtExecucao DATE NULL DEFAULT NULL,
  valor DECIMAL(19,2) NOT NULL,
  flPago BIT,
  flExecutado BIT,
  PRIMARY KEY (idPetServico, idPet, idCliente),
  
  CONSTRAINT fk_pet_servico_pet 
	FOREIGN KEY (idPet) 
    REFERENCES Pet (idPet) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION,
    
    CONSTRAINT fk_pet_servico_cliente 
	FOREIGN KEY (idCliente) 
    REFERENCES Cliente (idCliente) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Pet_Servico_Ordem (
  idPetServicoOrdem  INT(11) NOT NULL auto_increment,
  idPetServico INT(11) NOT NULL,
  idServico INT(11) NOT NULL,
 
  PRIMARY KEY (idPetServicoOrdem, idPetServico, idServico),
  
  CONSTRAINT fk_petServicoOrdem_petServico 
	FOREIGN KEY (idPetServico) 
    REFERENCES Pet_Servico (idPetServico) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION,
    
   CONSTRAINT fk_petServicoOrdem_servico 
	FOREIGN KEY (idServico) 
    REFERENCES Servico (idServico) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;