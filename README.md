# TesteDrive-yt-dlp

Ambiente separado do CursoDownloader. Usa o executavel oficial do yt-dlp, Node.js e o FFmpeg ja instalados. Nao instala plugins de UMP nem altera perfis do navegador.

## Preparar em outro computador (Windows)

### 1. Baixar o projeto

No repositorio do GitHub, clique em **Code > Download ZIP** e extraia o arquivo com **Extrair Tudo**. Abra a pasta que contem `executar.js` e os dois arquivos `.cmd`. Nao execute diretamente de dentro do ZIP. Nao e necessario instalar Git.

### 2. Instalar o Node.js

Baixe a versao **LTS** do [site oficial do Node.js](https://nodejs.org/en/download/) e execute o instalador para Windows. Mantenha a opcao de adicionar ao PATH. Feche e reabra o terminal depois da instalacao.

Este projeto usa apenas modulos incluidos no Node.js: **nao precisa executar `npm install`**, instalar Playwright ou copiar `node_modules`. O executavel do yt-dlp inclui seu proprio Python; nao e necessario instalar Python separadamente.

### 3. Instalar o FFmpeg

No PowerShell ou CMD:

```powershell
winget install --id Gyan.FFmpeg --exact --source winget
```

Se o pacote nao for encontrado:

```powershell
winget source update
winget search ffmpeg --source winget
```

Se `Gyan.FFmpeg` aparecer na coluna ID, repita a instalacao. Se o WinGet nao estiver disponivel, instale ou atualize o **Instalador de Aplicativo** pela Microsoft Store. Como alternativa, use um build Windows indicado na [pagina oficial do FFmpeg](https://ffmpeg.org/download.html), extraia-o e adicione a pasta `bin` ao PATH do usuario.

Depois, feche completamente o terminal e abra novamente.

### 4. Baixar o yt-dlp oficial

1. Abra a [pagina oficial de releases](https://github.com/yt-dlp/yt-dlp/releases/latest).
2. Na secao **Assets**, baixe **`yt-dlp.exe`**, indicado para Windows x64. Nao baixe o ZIP de codigo-fonte para esta etapa.
3. Coloque `yt-dlp.exe` na **mesma pasta de `executar.js` e dos arquivos `.cmd`**.

Download direto da versao mais recente: [yt-dlp.exe oficial](https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe).

Nao e necessario executar um instalador ou adicionar o yt-dlp ao PATH. Os atalhos usam o executavel dessa pasta. Para outra arquitetura do Windows, consulte os binarios compativeis no [guia oficial](https://github.com/yt-dlp/yt-dlp#release-files); os atalhos esperam o nome local `yt-dlp.exe`.

### 5. Conferir antes do primeiro uso

Abra o PowerShell e entre na pasta extraida, substituindo o caminho de exemplo:

```powershell
cd 'C:\caminho\para\TesteDrive-yt-dlp'
node --version
ffmpeg -version
ffprobe -version
.\yt-dlp.exe --version
```

Todos devem mostrar a versao instalada. Se `node`, `ffmpeg` ou `ffprobe` nao forem reconhecidos, confira a instalacao e o PATH e reabra o terminal. Se `.\yt-dlp.exe` nao for encontrado, confira a pasta atual e o nome do arquivo baixado.

A estrutura deve ficar assim:

```text
TesteDrive-yt-dlp/
  .gitignore
  README.md
  executar.js
  1-listar-formatos.cmd
  2-baixar.cmd
  yt-dlp.exe             <- baixado separadamente
  downloads/             <- criada ao iniciar um download
```

Depois siga o primeiro teste abaixo. Se o video exigir login, voce tambem precisara de um navegador compativel instalado e autenticado na conta que possui acesso.

## Primeiro teste

1. Abra `1-listar-formatos.cmd` com dois cliques.
2. Cole o link da pagina do video no Google Drive (nao o link temporario videoplayback).
3. Escolha 0 para testar sem cookies. Esta etapa apenas lista formatos.
4. Se precisar autenticar, entre no Drive pelo navegador normalmente e confirme que consegue assistir. Feche esse navegador e repita o teste escolhendo Chrome, Edge ou Firefox.
5. Deixe o campo de perfil vazio para selecao automatica ou informe o nome/caminho do perfil que contem o login. Para o perfil separado do CursoDownloader, informe o caminho completo da pasta `perfil-chrome` ou `perfil-edge` correspondente.
6. Se a listagem funcionar, abra `2-baixar.cmd` e repita as escolhas. O programa prioriza a melhor faixa de video e a melhor faixa de audio separadas, com alternativa de formato combinado quando necessario. Usa FFmpeg para juntar as faixas. O resultado vai para `downloads`; a extensao final depende dos formatos selecionados, e nao e obrigatoriamente MP4.

Os comandos podem ser executados no PowerShell a partir desta pasta:

```powershell
.\yt-dlp.exe --version
.\yt-dlp.exe --ignore-config --no-cache-dir --no-playlist -F 'URL_DO_VIDEO'
```

Para atualizar o executavel oficial:

```powershell
.\yt-dlp.exe -U
```

## Limites do teste

O suporte ao Google Drive nao garante suporte a qualquer resposta UMP nem acesso a videos privados. O primeiro teste identifica o que o extrator atual consegue oferecer. Se o Drive exigir login ou negar acesso, nao significa que o yt-dlp esteja mal instalado.

A leitura de cookies de Chrome/Edge no Windows pode falhar por bloqueio do banco ou criptografia do navegador. Fechar o navegador resolve alguns bloqueios, mas nao garante descriptografia. Nao desative protecoes do navegador para tentar resolver. Nao publique cookies, perfis ou URLs assinadas. Esta pasta esta no OneDrive; os videos baixados podem ser sincronizados.

## Arquivos para o GitHub

Envie apenas `.gitignore`, `README.md`, `executar.js`, `1-listar-formatos.cmd` e `2-baixar.cmd`. Nao envie `yt-dlp.exe`, `SHA2-256SUMS`, `downloads`, cookies ou perfis de navegador. O `.gitignore` inclui exclusoes para os arquivos locais deste projeto, mas uploads manuais pelo navegador exigem selecionar os arquivos corretos.

O executavel sera baixado separadamente em cada computador conforme a etapa 4. O CursoDownloader original nao e necessario para usar este projeto.

Fontes oficiais: [yt-dlp](https://github.com/yt-dlp/yt-dlp), [FAQ](https://github.com/yt-dlp/yt-dlp/wiki/FAQ).
