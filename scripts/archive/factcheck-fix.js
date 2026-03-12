'use strict';

const { getAuthClient } = require('../src/auth');
const { google } = require('googleapis');

const SPREADSHEET_ID = '1A6dqnZdEkhv_iQYf-fmwrd1nyVacq_VfP9ZtyQ6uf_Y';

/**
 * ファクトチェック結果に基づく概略修正 + 参考URL追加
 */
async function main() {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  // 現在のデータを読み取り
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: '記事要項!L30:N44'
  });
  const rows = res.data.values || [];

  /**
   * N列から参考URLを抽出する関数
   */
  function extractRefUrl(nText) {
    const match = (nText || '').match(/参考URL[：:]\s*(https?:\/\/\S+)/);
    return match ? match[1] : '';
  }

  /**
   * 概略に参考URLを追加する関数（既にあれば追加しない）
   */
  function addRefUrl(summary, refUrl) {
    if (!refUrl) return summary;
    if (summary.includes(refUrl)) return summary;
    return summary + '\n\n参考URL：' + refUrl;
  }

  // --- 修正データ ---
  const corrections = {};

  // Row30: ChatGPT - 商用利用修正
  corrections[0] = {
    find: '・商用利用：有料プラン（Plus/Pro）で生成した画像は商用利用可能。無料プランの商用利用は要確認',
    replace: '・商用利用：全プラン（無料含む）で生成画像の商用利用が可能。OpenAIは出力の権利をユーザーに移転している。ただし無料プランではモデル訓練にデータが使用される場合がある'
  };

  // Row33: Midjourney - 無料トライアル廃止
  corrections[3] = {
    find: '・無料枠：Web版で一定回数の無料トライアルあり（時期により変動）',
    replace: '・無料枠：2026年現在、無料トライアルは提供されていない。利用にはBasicプラン（月額10ドル）以上の契約が必要'
  };

  // Row35: Leonardo.Ai - 商用利用修正
  corrections[5] = {
    find: '・商用利用：有料プランで生成した画像は商用利用可能。無料プランは個人利用のみ',
    replace: '・商用利用：無料プランでも商用利用は可能だが、生成画像は公開扱いとなり所有権はLeonardo.Ai側に帰属する。有料プランでは完全な所有権を保持でき、非公開設定も可能'
  };

  // Row36: Ideogram - 無料枠・商用利用修正
  corrections[6] = {
    findAll: [
      { find: '・無料枠：1日最大10枚まで無料生成可能', replace: '・無料枠：週10クレジット付与（最大約40枚/週）。毎週土曜日にリセット' },
      { find: '・商用利用：有料プランで商用利用可能', replace: '・商用利用：無料プランを含む全プランで商用利用可能（公式：出力に対する権利を制限しない）' }
    ]
  };

  // Row38: Microsoft Designer - 無料枠・商用利用修正
  corrections[8] = {
    findAll: [
      { find: '・無料枠：毎日クレジットが更新され、1日15回程度の生成が可能', replace: '・無料枠：無料アカウントは月15クレジット（月初リセット）。Microsoft 365契約者は月60クレジット' },
      { find: '・商用利用：Microsoft利用規約に基づき、生成画像の商用利用は可能（ただしコンテンツポリシーに従う必要あり）', replace: '・商用利用：利用規約上、個人・非商用利用に限定されている。商用利用は認められていない' }
    ]
  };

  // Row39: SeaArt - 正式名称修正
  corrections[9] = {
    find: '・概要と名称：SeaArt（シーアート）。',
    replace: '・概要と名称：SeaArt AI（シーアート）。'
  };

  // Row42: Artguru - 商用利用修正
  corrections[12] = {
    find: '・商用利用：利用規約に基づき確認が必要',
    replace: '・商用利用：無料プランは個人利用のみ。有料サブスクリプションで商用利用可能'
  };

  // Row43: PicsArt - 名称・無料枠・商用利用修正
  corrections[13] = {
    findAll: [
      { find: '・概要と名称：PicsArt（ピクスアート）。', replace: '・概要と名称：Picsart（ピクスアート）。' },
      { find: '・無料枠：無料プランで一定回数のAI画像生成が可能（広告表示あり）', replace: '・無料枠：無料プランで週5クレジットのAI画像生成が可能' },
      { find: '・商用利用：有料プラン（Gold/Platinum）で商用利用可能', replace: '・商用利用：有料プラン（Plus/Pro）で商用利用可能' }
    ]
  };

  // Row44: Pixlr - 無料枠・商用利用修正
  corrections[14] = {
    findAll: [
      { find: '・無料枠：無料プランで1日数回のAI画像生成が可能', replace: '・無料枠：新規登録時に20クレジット付与。以降は制限付きで利用可能' },
      { find: '・商用利用：有料プラン（Plus/Premium）で商用利用可能', replace: '・商用利用：有料プラン（Plus/Premium）があるが、AI生成画像の商用利用は利用規約の確認が必要' }
    ]
  };

  // --- 修正適用 + 参考URL追加 ---
  const updatedSummaries = [];

  for (let i = 0; i < 15; i++) {
    let summary = rows[i] ? rows[i][0] || '' : '';
    const nText = rows[i] ? rows[i][2] || '' : '';
    const refUrl = extractRefUrl(nText);

    // 修正適用
    const corr = corrections[i];
    if (corr) {
      if (corr.findAll) {
        corr.findAll.forEach(c => {
          summary = summary.replace(c.find, c.replace);
        });
      } else {
        summary = summary.replace(corr.find, corr.replace);
      }
    }

    // 参考URL追加
    summary = addRefUrl(summary, refUrl);

    updatedSummaries.push([summary]);
  }

  // 概略（L列）のみ更新
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: '記事要項!L30:L44',
    valueInputOption: 'RAW',
    resource: { values: updatedSummaries }
  });

  process.stderr.write('概略の修正完了（ファクトチェック + 参考URL追加）\n');

  // --- h3タイトル修正: PicsArt → Picsart ---
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: '記事要項!J43',
    valueInputOption: 'RAW',
    resource: { values: [['スマホで生成から編集まで完結する『Picsart』']] }
  });

  process.stderr.write('PicsArt → Picsart タイトル修正完了\n');
  process.stderr.write('\n全ファクトチェック修正完了\n');
}

main().catch(e => {
  process.stderr.write('エラー: ' + e.message + '\n');
  process.exit(1);
});
