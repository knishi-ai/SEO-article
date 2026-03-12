'use strict';

const { google } = require('googleapis');
const { getAuthClient } = require('./auth');
const config = require('./config');

async function testConnection() {
  console.log('Google Sheets API 接続テスト...');

  const auth = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.get({
    spreadsheetId: config.TEMPLATE_SPREADSHEET_ID,
  });

  console.log('接続成功！');
  console.log(`スプレッドシート名: ${response.data.properties.title}`);
  console.log('シート一覧:');
  for (const sheet of response.data.sheets) {
    console.log(`  - ${sheet.properties.title} (gid: ${sheet.properties.sheetId})`);
  }
}

testConnection().catch((err) => {
  console.error('接続エラー:', err.message);
  process.exit(1);
});
