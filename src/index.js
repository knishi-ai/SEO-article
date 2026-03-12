'use strict';

const { copyTemplate, writeTargetInfo, writeStructure } = require('./sheets');

/**
 * メインエントリポイント
 * CLIからJSON文字列を受け取り、スプレッドシートに書き込む
 *
 * 使用方法:
 *   node src/index.js '{"action":"copy","title":"【構成】KW名"}'
 *   node src/index.js '{"action":"write","spreadsheetId":"xxx","mode":"new","targetInfo":{...},"structure":{...}}'
 */
async function main() {
  const input = process.argv[2];

  if (!input) {
    console.error('使用方法: node src/index.js \'<JSON>\'');
    console.error('');
    console.error('アクション:');
    console.error('  copy   - テンプレートをコピーして新規シート作成');
    console.error('  write  - スプレッドシートにデータ書き込み');
    process.exit(1);
  }

  let params;
  try {
    params = JSON.parse(input);
  } catch (e) {
    console.error('JSONパースエラー:', e.message);
    process.exit(1);
  }

  switch (params.action) {
    case 'copy': {
      if (!params.title) {
        console.error('Error: title は必須です');
        process.exit(1);
      }
      const result = await copyTemplate(params.title);
      process.stdout.write(JSON.stringify(result) + '\n');
      break;
    }

    case 'write': {
      if (!params.spreadsheetId || !params.mode) {
        console.error('Error: spreadsheetId と mode は必須です');
        process.exit(1);
      }

      if (params.targetInfo) {
        await writeTargetInfo(params.spreadsheetId, params.mode, params.targetInfo);
        process.stderr.write('ターゲット情報を書き込みました\n');
      }

      if (params.structure) {
        await writeStructure(params.spreadsheetId, params.mode, params.structure);
        process.stderr.write('記事構成を書き込みました\n');
      }

      process.stdout.write(JSON.stringify({ success: true, spreadsheetId: params.spreadsheetId }) + '\n');
      break;
    }

    default:
      console.error(`不明なアクション: ${params.action}`);
      console.error('有効なアクション: copy, write');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error('エラー:', err.message);
  process.exit(1);
});
