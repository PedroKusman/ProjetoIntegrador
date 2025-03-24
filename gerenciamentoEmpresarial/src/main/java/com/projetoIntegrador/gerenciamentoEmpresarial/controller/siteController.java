package com.projetoIntegrador.gerenciamentoEmpresarial.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class siteController { 
    
    @GetMapping("/TelaMenu.html")
    public String telaMenu() { 
        return "TelaMenu"; 
    }

    @GetMapping("/agendamento.html")
    public String agendamento() { 
        return "agendamento"; 
    }

    @GetMapping("/cadastro.html")
    public String cadastro() { 
        return "cadastro"; 
    }

    @GetMapping("/entrada_saida.html")
    public String entradaSaida() { 
        return "entrada_saida"; 
    }

    @GetMapping("/relatorio.html")
    public String relatorio() { 
        return "relatorio"; 
    }
    
      @GetMapping("/loginSenha.html")
    public String login() { 
        return "loginSenha"; 
    }
}
