document.addEventListener("DOMContentLoaded", function () {

    const loginButton = document.querySelector("button[type='submit']");

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
    
    // Função genérica para navegação
    function configurarNavegacao(botao, destino) {
        if (botao) {
            botao.addEventListener("click", function () {
                window.location.href = destino;
            });
        }
    }

    // Botões de navegação
    configurarNavegacao(document.getElementById("agendamento"), "agendamento.html");
    configurarNavegacao(document.getElementById("btnVoltar"), "TelaMenu.html");
    configurarNavegacao(document.getElementById("cadastro"), "cadastro.html");
    configurarNavegacao(document.getElementById("relatorio"), "relatorio.html");
    configurarNavegacao(document.getElementById("entrada_saida"), "entrada_saida.html");
    configurarNavegacao(document.getElementById("BtnSair"), "index.html");

    // Lógica para abrir/fechar o menu
    const toggleMenu = document.getElementById("toggle-menu");
    if (toggleMenu) {
        toggleMenu.addEventListener("click", function () {
            const header = document.getElementById("header");
            const bodyMenu = document.querySelector(".BodyMenu");

            header.classList.toggle("open");
            bodyMenu.classList.toggle("menu-open");
        });
    }

    // Funções de validação e cadastro
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

    // Evento de cadastro
    const btnCadastrar = document.getElementById("btnCadastrar");
    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", function () {
            const cpf = document.getElementById("cpf").value.trim();
            const cep = document.getElementById("cep").value.trim();

            if (!validarCPF(cpf)) {
                alert("CPF inválido");
                return;
            }

            if (!validarCEP(cep)) {
                alert("CEP inválido");
                return;
            }

            alert("Cadastro realizado com sucesso!");
        });
    }

    const formAgendamento = document.querySelector("form.cadastro, form.entrada_saida");
    const btnsLimpar = document.querySelectorAll(".agendar-limpar .btn:first-child, .cadastrar-limpar #btnLimpar");
    
    if (btnLimpar) {
        btnLimpar.addEventListener("click", function () {
            formAgendamento.reset(); 
        });
    }

    const dropButton = document.getElementById("dropButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (dropButton && dropdownMenu) {
        // Alterna a visibilidade do menu ao clicar no botão
        dropButton.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita fechamento imediato
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });

        // Fecha o menu se o usuário clicar fora dele
        document.addEventListener("click", function (event) {
            if (!dropButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });
    }
});

function changeButtonText(text) {
    document.getElementById("dropButton").innerHTML = text;
}