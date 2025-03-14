# Renomear Episódios de Séries

Esta ferramenta web automatiza a renomeação de episódios de séries de forma prática e eficiente. Ao selecionar arquivos de vídeo e informar os dados da série, como nome, temporada e o episódio inicial, a aplicação gera novos nomes para os arquivos e exibe os comandos do PowerShell para renomeação em lote.

## Funcionalidades

-   **Seleção de arquivos**: Permite a seleção de múltiplos arquivos de vídeo para serem renomeados como episódios.
-   **Geração de novos nomes**: Cria nomes padronizados utilizando o nome da série, número da temporada e o número sequencial do episódio.
-   **Visualização de prévia**: Exibe uma tabela comparando o nome original do arquivo com o novo nome sugerido.
-   **Comandos PowerShell**: Gera os comandos do PowerShell necessários para renomear os arquivos diretamente pelo terminal.

## Padrão de Renomação

Os arquivos serão renomeados seguindo o padrão:

    Nome.Da.Série SXXEPXX.ext

Onde:

-   **NomeDaSérie**: É o nome informado para a série, com os espaços substituídos por pontos. Apenas caracteres alfanuméricos, pontos e traços são permitidos.
-   **SXX**: Representa o número da temporada com dois dígitos (por exemplo, "S01" para a temporada 1).
-   **EPXX**: Representa o número do episódio, também com dois dígitos (por exemplo, "EP01" para o episódio 1).
-   **ext**: Extensão original do arquivo (por exemplo, .mp4, .mkv).

Exemplo: Se a série for "O Justiceiro", temporada "1" e o episódio inicial "1", o arquivo "video.mp4" será renomeado para:

    O.Justiceiro S01E01.mp4

## Como usar

1. **Ferramenta publicada no github pages**: Acesse https://marinsgabriel1997.github.io/rename-series-episodes/.
2. **Selecionar arquivos**: Clique em "Escolher Arquivos" para selecionar os vídeos que deseja renomear.
3. **Selecionar pasta (opcional)**: Utilize "Escolher Pasta" para preencher automaticamente o nome da série, se desejado.
4. **Informar dados da série**:
    - Preencha o campo "Nome da Série".
    - Informe o número da temporada.
    - Defina o episódio inicial para a renomeação.
5. **Visualizar a prévia**: Consulte a tabela de pré-visualização que mostra os nomes originais dos arquivos e os respectivos novos nomes gerados.
6. **Renomeação via PowerShell**: Copie os comandos exibidos na área de texto e execute-os no PowerShell para renomear os arquivos de forma automatizada.
