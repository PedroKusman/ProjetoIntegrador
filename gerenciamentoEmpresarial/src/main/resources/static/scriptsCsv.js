function exportarCSV(isFiltrado) {
    console.log("Função exportarCSV chamada com isFiltrado:", isFiltrado);

    const tabela = document.getElementById('EntradaSaidaTable');
    let csvContent = "data:text/csv;charset=utf-8,";

    const cabecalho = ["Data", "Valor", "Descrição", "Tipo"];
    csvContent += cabecalho.join(";") + "\r\n";

    if (isFiltrado) {
        const dataInicio = document.getElementById("dataInicio").value;
        const dataFim = document.getElementById("dataFim").value;

        if (!dataInicio || !dataFim) {
            alert("Por favor, selecione ambas as datas.");
            return;
        }

        const dataInicioISO = new Date(dataInicio).toISOString().split('T')[0];
        const dataFimISO = new Date(dataFim).toISOString().split('T')[0];

        Array.from(tabela.rows).forEach(row => {
            if (row.rowIndex === 0) return;

            const dataCelula = row.cells[0].innerText.trim();
            const dataFormatada = dataCelula.split('/').reverse().join('-');

            if (dataFormatada >= dataInicioISO && dataFormatada <= dataFimISO) {
                const dadosLinha = Array.from(row.cells).map(cell => cell.innerText);
                csvContent += dadosLinha.join(";") + "\r\n";
            }
        });
    } else {
        Array.from(tabela.rows).forEach(row => {
            if (row.rowIndex === 0) return;

            const dadosLinha = Array.from(row.cells).map(cell => cell.innerText);
            csvContent += dadosLinha.join(";") + "\r\n";
        });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", isFiltrado ? "relatorio_filtrado.csv" : "relatorio_entrada_saida.csv");
    link.click();
}
