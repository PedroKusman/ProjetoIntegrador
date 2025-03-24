package com.projetoIntegrador.gerenciamentoEmpresarial.service;

import com.projetoIntegrador.gerenciamentoEmpresarial.model.entrada_saida;
import com.projetoIntegrador.gerenciamentoEmpresarial.repository.EntradaSaidaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EntradaSaidaService {

    private final EntradaSaidaRepository repository;

    public EntradaSaidaService(EntradaSaidaRepository repository) {
        this.repository = repository;
    }

    public entrada_saida salvar(entrada_saida entradaSaida) {
        return repository.save(entradaSaida);
    }

    public List<entrada_saida> listarTodos() {
        return repository.findAll();
    }

    public List<entrada_saida> listarPorTipo(String tipo) {
        return repository.findByTipo(tipo);
    }
    

    public List<entrada_saida> buscarTodosEntradaSaida() {
         return repository.findAll();
    }
}
