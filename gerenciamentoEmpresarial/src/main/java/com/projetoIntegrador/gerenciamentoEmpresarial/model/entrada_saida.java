package com.projetoIntegrador.gerenciamentoEmpresarial.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "entrada_saida")
public class entrada_saida {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private Double valor;

    @Column(nullable = false, length = 255)
    private String descricao;

    @Column(nullable = false)
    private String tipo;

    public entrada_saida() {
    }

    public entrada_saida(LocalDate data, Double valor, String descricao, String tipo) {
        this.data = data;
        this.valor = valor;
        this.descricao = descricao;
        this.tipo = tipo;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}
