document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector("button[type='submit']");
    const formCadastro = document.getElementById("formCadastro");
    const btnCadastrar = document.getElementById("btnCadastrar");
    const dropButton = document.getElementById("dropButton");
    const formAgendamento = document.querySelector("form.cadastro, form.entrada_saida");
    const btnLimpar = document.querySelector(".agendar-limpar .btn:first-child, .cadastrar-limpar #btnLimpar");
    const btnGerar = document.getElementById("btnGerar");  
    const btnAgendar = document.getElementById("btnAgendar");
    const tabelaRelatorios = document.getElementById("tabelaRelatorios");
    const dropdownMenu = document.getElementById("dropdownMenu");
    
    document.getElementById('btnCadastra').addEventListener('click', function(event) {
      if (!validarCadastro()) {
        event.preventDefault(); 
        return;
      }
    });

      function validarCadastro() {
      const nome = document.getElementById('nome').value.trim();
      const contato = document.getElementById('contato').value.trim();
      const cpf = document.getElementById('cpf').value.trim();
      const endereco = document.getElementById('endereco').value.trim();
      const cep = document.getElementById('cep').value.trim();
      const cidade = document.getElementById('cidade').value.trim();
      const funcionario = document.getElementById('sfuncionario').checked;

      if (!nome || !contato || !cpf || !endereco || !cep || !cidade) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
      }
            
        if (!validarCPF(cpf)) {
          alert('CPF inválido');
          return false; 
        }

        // Validando o CEP
        if (!validarCEP(cep)) {
          alert('CEP inválido');
          return false; 
        }

      alert("Cadastro validado com sucesso!");
      return true;

    }
    
    if (loginButton) {
        loginButton.addEventListener("click", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorMessage = document.getElementById("errorMessage");

            if (username === "admin" && password === "1234") {
                window.location.href = "TelaMenu.html";
            } else {
                errorMessage.textContent = "Usuário ou senha inválidos!";
                errorMessage.style.display = "block";
            }
        });
    }

    function configurarNavegacao(botao, destino) {
        if (botao) {
            botao.addEventListener("click", function () {
                window.location.href = destino;
            });
        }
    }

    configurarNavegacao(document.getElementById("agendamento"), "agendamento.html");
    configurarNavegacao(document.getElementById("btnVoltar"), "TelaMenu.html");
    configurarNavegacao(document.getElementById("cadastro"), "cadastro.html");
    configurarNavegacao(document.getElementById("relatorio"), "relatorio.html");
    configurarNavegacao(document.getElementById("entrada_saida"), "entrada_saida.html");
    configurarNavegacao(document.getElementById("BtnSair"), "/");

    const toggleMenu = document.getElementById("toggle-menu");
    if (toggleMenu) {
        toggleMenu.addEventListener("click", function () {
            const header = document.getElementById("header");
            const bodyMenu = document.querySelector(".BodyMenu");

            header.classList.toggle("open");
            bodyMenu.classList.toggle("menu-open");
        });
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /(\d)\1{10}/.test(cpf)) return false;

        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10 || resto === 11) ? resto = 0 : resto) return cpf.charAt(9) == resto;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
        resto = (soma * 10) % 11;
        return cpf.charAt(10) == resto;
    }

    function validarCEP(cep) {
        return /^[0-9]{5}-[0-9]{3}$/.test(cep);
    }

    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", async function () {
            const tipo = dropButton.textContent.trim();
            const data = document.getElementById("data")?.value.trim();
            const valorStr = document.getElementById("valor")?.value.trim();
            const descricao = document.getElementById("descricao")?.value.trim();
            const valor = parseFloat(valorStr);

            if (!data || !valorStr || !descricao || tipo === "Adicione o Tipo:") {
                alert("Preencha todos os campos corretamente!");
                return;
            }

            if (!validarData(data)) {
                alert("Data no formato incorreto!");
                return;
            }

            if (isNaN(valor) || valor <= 0) {
                alert("O valor deve ser um número válido maior que zero!");
                return;
            }

            const dataConvertida = converterDataParaISO(data);

            const entradaSaida = { data: dataConvertida, valor, descricao, tipo };

            try {
                const response = await fetch("/api/entrada-saida/salvar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(entradaSaida)
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");
                    formCadastro.reset();
                    dropButton.textContent = "Adicione o Tipo:";
                } else {
                    alert("Erro ao cadastrar entrada/saída.");
                }
            } catch (error) {
                console.error("Erro ao cadastrar:", error);
                alert("Erro ao conectar ao servidor.");
            }
        });
    }
    
    if (btnAgendar) {
    btnAgendar.addEventListener("click", async function () {
        const cliente = document.getElementById("cliente")?.value.trim();
        const data = document.getElementById("data")?.value.trim();
        const servico = document.getElementById("servico")?.value.trim();
        const funcionario = document.getElementById("funcionario")?.value.trim();

        if (!cliente || !data || !servico || !funcionario) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        if (!validarData(data)) {
            alert("Data no formato incorreto!");
            return;
        }

        const dataConvertida = converterDataParaISO(data);
        
        const agendamento = { cliente, data: dataConvertida, servico, funcionario };

        try {
            const response = await fetch("/api/agendamento/salvar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(agendamento)
            });

            if (response.ok) {
                alert("Agendamento realizado com sucesso!");
                formAgendamento.reset(); // Limpa o formulário após o agendamento
                 location.reload();
            } else {
                alert("Erro ao agendar.");
            }
        } catch (error) {
            console.error("Erro ao agendar:", error);
            alert("Erro ao conectar ao servidor.");
        }
    });
}

    if (btnLimpar) {
        btnLimpar.addEventListener("click", function () {
            formAgendamento.reset();
        });
    }

    if (dropButton) {
        dropButton.addEventListener("click", function (event) {
            event.stopPropagation(); 
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function (event) {
            if (!dropButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });
    }
 
 fetch('/api/entrada-saida/listar')  
     .then(response => response.json())
     .then(data => {
       if (Array.isArray(data)) {

         preencherTabelaComDados(data);  
       } else {
         console.error('Erro: os dados recebidos não são um array.');
       }
     })
     .catch(error => console.error('Erro ao buscar os dados:', error));
     
    window.onload = function() {
      buscarAgendamentos();
    };
});


function validarData(data) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; 
    return regex.test(data);
}


function changeButtonText(text) {
    document.getElementById("dropButton").innerHTML = text;
}



function converterDataParaISO(data) {
    const partesData = data.split('/'); 
    return `${partesData[2]}-${partesData[1]}-${partesData[0]}`; 
}


function preencherTabelaComDados(dados) {
  const tabela = document.getElementById('tableBody');  
  
    if (!tabela) {
    return;
  }
  
  tabela.innerHTML = '';

  dados.forEach(item => {
    const linha = tabela.insertRow();  

    const celulaData = linha.insertCell(0);
    const celulaValor = linha.insertCell(1);
    const celulaDescricao = linha.insertCell(2);
    const celulaTipo = linha.insertCell(3);

    celulaData.innerText = item.data;
    celulaDescricao.innerText = item.descricao;

    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(item.valor);

    celulaValor.innerText = valorFormatado;
    celulaTipo.innerText = item.tipo;
  });
}

function preencherTabelaComAgendamentos(dados) {
   
  const tabela = document.getElementById('tabelaAgendamentos');
  
  if (!tabela) {
    return;
  }
  
  tabela.innerHTML = '';
  

  dados.forEach(item => {
    const linha = tabela.insertRow();

    const celulaCliente = linha.insertCell(0);
    const celulaData = linha.insertCell(1);
    const celulaServico = linha.insertCell(2);
    const celulaFuncionario = linha.insertCell(3);

    celulaCliente.innerText = item.cliente || 'N/A';  
    celulaData.innerText = item.data ? formatarData(item.data) : 'Data não disponível';  
    celulaServico.innerText = item.servico || 'Serviço não especificado'; 
    celulaFuncionario.innerText = item.funcionario || 'Funcionário não especificado';  
  });
}

function buscarAgendamentos() {
  fetch('/api/agendamento/listar') 
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
     
        preencherTabelaComAgendamentos(data); 
      } else {
        console.error('Erro: os dados recebidos não são um array.');
      }
    })
    .catch(error => console.error('Erro ao buscar os dados:', error));
}

function formatarData(data) {
  const partes = data.split('-');  
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}




