package com.projetoIntegrador.gerenciamentoEmpresarial.controller;

import com.projetoIntegrador.gerenciamentoEmpresarial.model.Agendamento;
import com.projetoIntegrador.gerenciamentoEmpresarial.service.AgendamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/agendamento")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @PostMapping("/salvar")
    public Agendamento salvar(@RequestBody Agendamento agendamento) {
        return agendamentoService.salvar(agendamento); 
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Agendamento>> listarTodos() {
        try {
            List<Agendamento> agendamentos = agendamentoService.listarTodos();
            return ResponseEntity.ok(agendamentos); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Collections.singletonList(new Agendamento())); 
        }
    }
}
