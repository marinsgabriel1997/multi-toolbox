/*
## Descrição do Script: Exportação de Tabela para CSV

O script permite a exportação de uma tabela selecionada para CSV diretamente no console do navegador. Abaixo, segue um detalhamento das etapas do processo:

### 1. **Seleção de Tabelas**
- O script procura todas as tabelas disponíveis na página. 
- Se nenhuma tabela for encontrada, um aviso é exibido para o usuário.

### 2. **Exibição de Resumo das Tabelas**
- Para cada tabela localizada, um resumo é exibido no console. 
- Este resumo inclui o cabeçalho (se presente) e as primeiras 5 linhas de dados, ajudando o usuário a identificar visualmente qual tabela deseja exportar.

### 3. **Escolha do Usuário**
- Um prompt é exibido solicitando ao usuário que insira o número da tabela que ele deseja exportar. 
- Caso o índice fornecido não seja válido, o script retorna uma mensagem de erro.

### 4. **Exportação para CSV**
- A função de exportação coleta os dados da tabela selecionada, verificando se existem cabeçalhos e linhas de dados.
- Os dados são convertidos para o formato CSV, utilizando ponto e vírgula (;) como separador.

### 5. **Download Automático**
- O script cria um arquivo CSV e gera um link de download temporário. 
- O link é clicado automaticamente, permitindo que o navegador baixe o arquivo CSV.

### 6. **Sanitização dos Valores**
- Antes de salvar os dados no CSV, a função remove quebras de linha e espaços em excesso dos valores das células.
- Valores que contêm ponto e vírgula ou aspas são encapsulados em aspas duplas para garantir a integridade dos dados no arquivo final.

### Resumindo:
Este script automatiza a exportação de tabelas visíveis na página para um arquivo CSV de forma interativa e eficiente, garantindo a integridade e a formatação adequada dos dados.
*/


function exportHtmlTableToCSV() {
    // Seleciona todas as tabelas na página
    const tables = document.querySelectorAll("table");
    if (tables.length === 0) {
        console.warn("Nenhuma tabela encontrada na página.");
        return;
    }

    // Exibe um resumo de cada tabela e pede ao usuário para escolher qual exportar
    tables.forEach((table, index) => {
        console.log(`Tabela ${index + 1}:`);

        // Verifica se há um cabeçalho (thead) e exibe
        const thead = table.querySelector("thead");
        if (thead) {
            const headerCells = Array.from(thead.querySelectorAll("th"));
            const headerRow = headerCells.map(cell => cell.innerText);
            console.log("Cabeçalho: ", headerRow.join(" | "));
        }

        // Exibe as primeiras 5 linhas do corpo da tabela
        const tbody = table.querySelector("tbody") || table;
        const bodyRows = Array.from(tbody.querySelectorAll("tr")).slice(0, 5);
        
        if (bodyRows.length > 0) {
            bodyRows.forEach((row, rowIndex) => {
                const cells = Array.from(row.querySelectorAll("td, th"));
                const rowData = cells.map(cell => cell.innerText);
                console.log(`Linha ${rowIndex + 1}: ${rowData.join(" | ")}`);
            });
        } else {
            console.log("Esta tabela não contém linhas de dados.");
        }
        console.log("---------------------------------------------------");
    });

    // Pergunta ao usuário qual tabela exportar
    const tableIndex = prompt(`Digite o número da tabela que você deseja exportar (1 a ${tables.length}):`);
    const selectedTable = tables[parseInt(tableIndex) - 1];

    if (!selectedTable) {
        console.error("Índice inválido ou tabela não encontrada.");
        return;
    }

    // Chama a função para exportar a tabela escolhida
    exportTableToCSV(selectedTable);
}

function exportTableToCSV(table) {
    // Inicializa o array para armazenar as linhas da tabela
    const rows = [];
    
    // Verifica se a tabela possui um thead
    const thead = table.querySelector("thead");
    if (thead) {
        // Extrai os cabeçalhos da tabela
        const headerCells = Array.from(thead.querySelectorAll("th"));
        const headerRow = headerCells.map(cell => sanitizeCSVValue(cell.innerText));
        rows.push(headerRow);
    }

    // Extrai as linhas do corpo da tabela
    const tbody = table.querySelector("tbody") || table;
    const bodyRows = Array.from(tbody.querySelectorAll("tr"));

    if (bodyRows.length === 0) {
        console.warn("A tabela selecionada não contém linhas de dados.");
        return;
    }

    bodyRows.forEach(row => {
        const cells = Array.from(row.querySelectorAll("td, th"));
        const rowData = cells.map(cell => sanitizeCSVValue(cell.innerText));
        rows.push(rowData);
    });

    // Converte os dados para CSV
    const csvContent = rows.map(row => row.join(";")).join("\n");

    // Cria um blob e um link para download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tabela.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Função para sanitizar os valores para o CSV
function sanitizeCSVValue(value) {
    // Remove quebras de linha, tabs e múltiplos espaços
    let sanitizedValue = value.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Se o valor contém ponto e vírgula ou aspas, encapsula em aspas duplas
    if (sanitizedValue.includes(';') || sanitizedValue.includes('"')) {
        sanitizedValue = '"' + sanitizedValue.replace(/"/g, '""') + '"';
    }

    return sanitizedValue;
}

exportHtmlTableToCSV();
