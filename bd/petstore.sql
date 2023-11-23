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
  PRIMARY KEY (idFuncionario))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Servico (
 idServico INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  valor DOUBLE NOT NULL,
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
  sexo CHAR(1) NOT NULL,
  dtNascimento DATE NULL DEFAULT NULL,
  peso DOUBLE NULL DEFAULT NULL,
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
  idServico INT(11) NOT NULL,
  observacao VARCHAR(65) NULL DEFAULT NULL,
  dtPedido DATETIME NOT NULL,
  dtExecucao DATETIME NULL DEFAULT NULL,
  valor DOUBLE NOT NULL,
  flPago BIT,
  flExecutado BIT,
  PRIMARY KEY (idPetServico, idPet, idServico, idCliente),
  
  CONSTRAINT fk_pet_servico_pet 
	FOREIGN KEY (idPet) 
    REFERENCES Pet (idPet) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION,
    
    CONSTRAINT fk_pet_servico_cliente 
	FOREIGN KEY (idCliente) 
    REFERENCES Cliente (idCliente) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION,
     
    
  CONSTRAINT fk_pet_servico_servico
    FOREIGN KEY (idServico)
    REFERENCES Servico (idServico)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS Pet_Servico_Ordem (
  idPetServico INT(11) NOT NULL auto_increment,
  idPet INT(11) NOT NULL,
  idCliente INT(11) NOT NULL,
  idServico INT(11) NOT NULL,
  observacao VARCHAR(65) NULL DEFAULT NULL,
  dtPedido DATETIME NOT NULL,
  dtExecucao DATETIME NULL DEFAULT NULL,
  valor DOUBLE NOT NULL,
  flPago BIT,
  flExecutado BIT,
  PRIMARY KEY (idPetServico, idPet, idServico, idCliente),
  
  CONSTRAINT fk_pet_servico_pet 
	FOREIGN KEY (idPet) 
    REFERENCES Pet (idPet) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION,
    
    CONSTRAINT fk_pet_servico_cliente 
	FOREIGN KEY (idCliente) 
    REFERENCES Cliente (idCliente) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION,
     
    
  CONSTRAINT fk_pet_servico_servico
    FOREIGN KEY (idServico)
    REFERENCES Servico (idServico)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;