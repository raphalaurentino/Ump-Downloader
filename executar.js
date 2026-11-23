'use strict';
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const readline = require('readline/promises');
async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const download = process.argv.includes('--baixar');
    console.log(download ? 'Baixar um video do Google Drive' : 'Primeiro teste: listar formatos (sem baixar o video)');
    const url = (await rl.question('Cole o link da PAGINA do video no Drive: ')).trim();
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.hostname !== 'drive.google.com') throw new Error('Use um link https://drive.google.com/file/d/.../view');
    console.log('\nAutenticacao: 0 = sem cookies (primeiro teste); 1 = Chrome; 2 = Edge; 3 = Firefox');
    const option = (await rl.question('Opcao [0]: ')).trim() || '0';
    const browsers = { '1': 'chrome', '2': 'edge', '3': 'firefox' };
    const args = ['--ignore-config', '--no-cache-dir', '--no-playlist', '--socket-timeout', '30', '--retries', '2'];
    if (option !== '0') {
      if (!browsers[option]) throw new Error('Opcao invalida.');
      console.log('Use o navegador onde voce ja consegue assistir ao video. Feche-o antes de continuar.');
      console.log('O yt-dlp tentara ler os cookies localmente. Nenhum arquivo de cookies sera exportado por este iniciador.');
      const profile = (await rl.question('Nome ou caminho do perfil (ENTER = automatico): ')).trim();
      args.push('--cookies-from-browser', browsers[option] + (profile ? ':' + profile : ''));
    }
    if (download) {
      const folder = path.join(__dirname, 'downloads');
      fs.mkdirSync(folder, { recursive: true });
      args.push('-f', 'bestvideo+bestaudio/best', '--windows-filenames', '--no-overwrites', '-P', folder, '-o', '%(title).150B [%(id)s].%(ext)s');
    } else args.push('--list-formats');
    args.push('--', url);
    console.log('\nIniciando...\n');
    const code = await new Promise((resolve, reject) => {
      const child = spawn(path.join(__dirname, 'yt-dlp.exe'), args, { stdio: 'inherit', windowsHide: true });
      child.on('error', reject); child.on('close', resolve);
    });
    if (code !== 0) {
      console.log('\nO teste nao concluiu. Copie a mensagem de erro, sem cookies ou URLs assinadas.');
      console.log('Se aparecer erro de DPAPI, descriptografia ou banco de cookies, o navegador pode impedir a leitura da sessao.');
      process.exitCode = 1;
    } else console.log(download ? '\nConcluido. Confira a pasta downloads.' : '\nFormatos listados. Use 2-baixar.cmd para tentar baixar.');
  } finally { rl.close(); }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
