/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.projetoIntegrador.gerenciamentoEmpresarial.service;

import com.projetoIntegrador.gerenciamentoEmpresarial.model.Agendamento;
import com.projetoIntegrador.gerenciamentoEmpresarial.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    @Autowired
    public AgendamentoService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    public Agendamento salvar(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento); 
    }

    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll(); 
    }
}
