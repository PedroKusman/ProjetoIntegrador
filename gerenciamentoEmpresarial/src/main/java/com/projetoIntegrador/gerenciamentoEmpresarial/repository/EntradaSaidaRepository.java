package com.projetoIntegrador.gerenciamentoEmpresarial.repository;

import com.projetoIntegrador.gerenciamentoEmpresarial.model.entrada_saida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EntradaSaidaRepository extends JpaRepository<entrada_saida, Long> {
    List<entrada_saida> findByTipo(String tipo);
    
}
