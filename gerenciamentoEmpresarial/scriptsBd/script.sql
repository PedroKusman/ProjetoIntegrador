create database projetoBd;

use projetoBd;
CREATE TABLE entrada_saida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL CHECK (valor > 0),
    descricao VARCHAR(255) NOT NULL,
    tipo ENUM('Entrada', 'Saída') NOT NULL
);


select * from entrada_saida;


CREATE TABLE agendamento  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    data DATE NOT NULL,
    servico VARCHAR(255),
    funcionario VARCHAR(255)
);

drop table agendamento;
select * from agendamento;

