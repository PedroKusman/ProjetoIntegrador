
package com.projetoIntegrador.gerenciamentoEmpresarial.repository;

import com.projetoIntegrador.gerenciamentoEmpresarial.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

}