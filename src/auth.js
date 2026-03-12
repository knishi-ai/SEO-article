'use strict';

const fs = require('fs');
const http = require('http');
const { URL } = require('url');
const { exec } = require('child_process');
const { google } = require('googleapis');
const config = require('./config');

async function getAuthClient() {
  if (fs.existsSync(config.TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(config.TOKEN_PATH, 'utf8'));
    const credentials = JSON.parse(fs.readFileSync(config.CREDENTIALS_PATH, 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oauth2Client.setCredentials(token);

    // トークンの有効期限チェック・自動リフレッシュ
    if (token.expiry_date && token.expiry_date < Date.now()) {
      const { credentials: newToken } = await oauth2Client.refreshAccessToken();
      fs.writeFileSync(config.TOKEN_PATH, JSON.stringify(newToken, null, 2));
      oauth2Client.setCredentials(newToken);
    }

    return oauth2Client;
  }

  return authorize();
}

async function authorize() {
  if (!fs.existsSync(config.CREDENTIALS_PATH)) {
    console.error('Error: credentials.json が見つかりません。');
    console.error('Google Cloud Console から OAuth 2.0 クライアントIDを作成し、');
    console.error(`credentials.json を ${config.CREDENTIALS_PATH} に配置してください。`);
    console.error('');
    console.error('手順:');
    console.error('1. https://console.cloud.google.com/apis/credentials にアクセス');
    console.error('2. 「認証情報を作成」→「OAuth クライアント ID」');
    console.error('3. アプリケーションの種類: 「デスクトップアプリ」');
    console.error('4. JSON をダウンロードして credentials.json にリネーム');
    console.error('5. Google Sheets API と Google Drive API を有効化');
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(config.CREDENTIALS_PATH, 'utf8'));
  const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
  const REDIRECT_URI = 'http://localhost:3000';
  const oauth2Client = new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: config.SCOPES,
    prompt: 'consent',
  });

  console.log('ブラウザを開いて認証します...');
  console.log('');
  console.log(authUrl);
  console.log('');

  // Windowsでブラウザを自動で開く
  exec(`start "" "${authUrl}"`);

  const code = await waitForAuthCode();
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  fs.writeFileSync(config.TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log('認証成功！トークンを保存しました。');

  return oauth2Client;
}

function waitForAuthCode() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, 'http://localhost:3000');
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>認証エラー</h1><p>${error}</p>`);
        server.close();
        reject(new Error(`認証拒否: ${error}`));
        return;
      }

      if (code) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>認証成功！</h1><p>このタブを閉じてください。</p>');
        server.close();
        resolve(code);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>待機中...</h1>');
      }
    });

    server.listen(3000, () => {
      console.log('認証コールバックを待機中 (http://localhost:3000/callback) ...');
    });

    server.on('error', (err) => {
      reject(new Error(`サーバー起動エラー: ${err.message}`));
    });

    setTimeout(() => {
      server.close();
      reject(new Error('認証タイムアウト（5分）'));
    }, 300000);
  });
}

// 直接実行時は認証フローを開始
if (require.main === module) {
  authorize().then(() => {
    console.log('認証セットアップ完了');
    process.exit(0);
  }).catch((err) => {
    console.error('認証エラー:', err.message);
    process.exit(1);
  });
}

module.exports = { getAuthClient };
