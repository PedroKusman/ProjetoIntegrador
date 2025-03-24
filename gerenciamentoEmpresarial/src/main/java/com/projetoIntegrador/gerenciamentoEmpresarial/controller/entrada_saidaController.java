package com.projetoIntegrador.gerenciamentoEmpresarial.controller;

import com.projetoIntegrador.gerenciamentoEmpresarial.model.entrada_saida;
import com.projetoIntegrador.gerenciamentoEmpresarial.service.EntradaSaidaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/entrada-saida")
public class entrada_saidaController {

    private final EntradaSaidaService service;

    public entrada_saidaController(EntradaSaidaService service) {
        this.service = service;
    }

    @PostMapping("/salvar")
    public entrada_saida salvar(@RequestBody entrada_saida entradaSaida) {
        return service.salvar(entradaSaida);
    }


   @GetMapping("/listar")
    public ResponseEntity<List<entrada_saida>> listarTodos() {
        try {
            List<entrada_saida> entradaSaida = service.listarTodos();
            return ResponseEntity.ok(entradaSaida);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Collections.singletonList(new entrada_saida())); 
        }
    }
}


