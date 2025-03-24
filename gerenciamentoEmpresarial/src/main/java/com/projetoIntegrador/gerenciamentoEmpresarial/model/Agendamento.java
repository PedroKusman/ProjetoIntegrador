package com.projetoIntegrador.gerenciamentoEmpresarial.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.time.LocalDate; 

@Entity
@Table(name = "agendamento")  
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false) 
    private String cliente;

    @Column(nullable = false)
    private LocalDate data;  

    @Column(nullable = false)
    private String servico;

    @Column(nullable = false)
    private String funcionario;

    public Agendamento() {}

    public Agendamento(String cliente, LocalDate data, String servico, String funcionario) {
        this.cliente = cliente;
        this.data = data;
        this.servico = servico;
        this.funcionario = funcionario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getServico() {
        return servico;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }

    public String getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(String funcionario) {
        this.funcionario = funcionario;
    }
}
