'use strict';

const { getAuthClient } = require('../src/auth');
const { google } = require('googleapis');

const SPREADSHEET_ID = '1A6dqnZdEkhv_iQYf-fmwrd1nyVacq_VfP9ZtyQ6uf_Y';

/**
 * リライト記事のレギュレーション違反を一括修正するスクリプト
 * 1. h2順序入れ替え（選び方→15選）
 * 2. h3タイトルに引きを追加
 * 3. 選び方h3の文末統一
 * 4. リード文CTAを追加
 * 5. 概略の修正（h2h3リード文の調整）
 * 6. 補足に画像・表の指示を追加
 */
async function main() {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  // --- Step 1: 新しいデータ配列を構築 ---

  // Row 23: 導入（M列にCTA追加）
  // Row 24-28: h2選び方 + h3×4（元Row40-44）
  // Row 29-44: h2 15選 + h3×15（元Row24-39）
  // Row 45-54: 変更なし

  // 選び方h2の概略を修正（「紹介しましたが」→ 選び方が先になるので修正）
  const erabiH2Summary = 'AI画像生成サイトは数十種類以上あり、自分の用途に最適なサイトを選ぶにはどのような観点で比較すればよいのでしょうか。\nここでは、サイト選びで後悔しないためにチェックすべき4つのポイントを解説します。次のセクションで紹介する15サイトを比較する際の判断基準としてご活用ください。\n・日本語プロンプトへの対応状況を確認する\n・商用利用の可否と利用条件を確認する\n・無料プランの生成枚数と機能制限を確認する\n・生成画像の品質と得意ジャンルを確認する';

  // 15選h2の概略を修正（選び方が先にあることを反映）
  const fifteenH2Summary = '前のセクションで解説した4つのチェックポイントをふまえ、2026年時点で無料プランが用意されているAI画像生成サイトを15個厳選しました。それぞれの特徴・無料枠・商用利用条件を紹介します。\n・ChatGPT（DALL-E）\n・Gemini（Nano Banana Pro）\n・Adobe Firefly\n・Midjourney\n・Stable Diffusion（SDXL）\n・Leonardo.Ai\n・Ideogram\n・Canva（マジック生成）\n・Microsoft Designer\n・SeaArt\n・MyEdit\n・Fotor\n・Artguru\n・PicsArt\n・Pixlr';

  // h3タイトルに引きを追加（サービス紹介）
  const serviceH3Titles = [
    '自然な指示で高品質画像を生成できる『ChatGPT（DALL-E）』',
    '日本語テキスト描画に強いGoogle製『Gemini（Nano Banana Pro）』',
    '著作権リスクが低く商用利用に強い『Adobe Firefly』',
    'アート性の高い画像で圧倒的人気の『Midjourney』',
    'オープンソースで自由にカスタマイズできる『Stable Diffusion（SDXL）』',
    'ゲーム・イラスト制作に特化した『Leonardo.Ai』',
    'テキスト描画の精度が群を抜く『Ideogram』',
    'デザインからAI生成まで一元化できる『Canva（マジック生成）』',
    'DALL-E 3を無料で使える『Microsoft Designer』',
    'アニメ・キャラクター生成に強い『SeaArt』',
    '画像編集とAI生成を1つで完結できる『MyEdit』',
    '写真編集の延長で手軽にAI生成できる『Fotor』',
    '登録不要で今すぐ使える『Artguru』',
    'スマホで生成から編集まで完結する『PicsArt』',
    'Photoshop風の本格編集も無料で使える『Pixlr』'
  ];

  // 選び方h3の文末統一版タイトル
  const erabiH3Titles = [
    '日本語プロンプトへの対応状況を確認する',
    '商用利用の可否と利用条件を確認する',
    '無料プランの生成枚数と機能制限を確認する',
    '生成画像の品質と得意ジャンルを確認する'
  ];

  // 元の概略データ（Row25-39 = サービスh3、Row41-44 = 選び方h3）
  // これは既に読み取り済みなので、スプレッドシートから再度読み取る
  const readRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: '記事要項!I24:N54'
  });
  const currentRows = readRes.data.values || [];

  // 元データのインデックス（0-based、Row24=index0）
  // Row24 = index0 (h2 15選)
  // Row25-39 = index1-15 (サービスh3)
  // Row40 = index16 (h2 選び方)
  // Row41-44 = index17-20 (選び方h3)
  // Row45-54 = index21-30 (プロンプト以降、変更なし)

  /**
   * 文字数を数える関数
   */
  function countChars(str) {
    return str.length;
  }

  /**
   * N列（補足）データを取得する関数
   */
  function getN(idx) {
    return (currentRows[idx] && currentRows[idx][5]) || '';
  }

  /**
   * L列（概略）データを取得する関数
   */
  function getL(idx) {
    return (currentRows[idx] && currentRows[idx][3]) || '';
  }

  /**
   * M列（内部リンク）データを取得する関数
   */
  function getM(idx) {
    return (currentRows[idx] && currentRows[idx][4]) || '';
  }

  // 新しいデータ配列を構築（Row24-44、21行分）
  const newData = [];

  // Row24: h2 選び方（元Row40, index16）
  newData.push([
    'h2',
    '自分に合ったAI画像生成サイトを見極める4つのチェックポイント',
    countChars('自分に合ったAI画像生成サイトを見極める4つのチェックポイント'),
    erabiH2Summary,
    getM(16), // 内部リンク
    getN(16)  // 補足
  ]);

  // Row25-28: 選び方h3×4（元Row41-44, index17-20）
  for (let i = 0; i < 4; i++) {
    newData.push([
      'h3',
      erabiH3Titles[i],
      countChars(erabiH3Titles[i]),
      getL(17 + i), // 概略はそのまま
      getM(17 + i), // 内部リンク
      getN(17 + i)  // 補足
    ]);
  }

  // Row29: h2 15選（元Row24, index0）
  const fifteenN = getN(0) + '\n画像：各サイトの管理画面または生成結果のスクリーンショット\n表：15サイトの比較表（無料枠・商用利用・得意ジャンル・日本語対応）';
  newData.push([
    'h2',
    '無料で使えるAI画像生成サイトおすすめ15選【2026年最新比較】',
    countChars('無料で使えるAI画像生成サイトおすすめ15選【2026年最新比較】'),
    fifteenH2Summary,
    getM(0), // 内部リンク
    fifteenN // 補足（画像・表指示追加）
  ]);

  // Row30-44: サービスh3×15（元Row25-39, index1-15）
  for (let i = 0; i < 15; i++) {
    newData.push([
      'h3',
      serviceH3Titles[i],
      countChars(serviceH3Titles[i]),
      getL(1 + i),  // 概略はそのまま
      getM(1 + i),  // 内部リンク
      getN(1 + i)   // 補足
    ]);
  }

  // --- Step 2: データ書き込み ---

  // Row24-44のI-N列をクリアして書き直す
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: '記事要項!I24:N44',
    valueInputOption: 'RAW',
    resource: { values: newData }
  });

  // Row23のM列にリード文CTAを追加
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: '記事要項!M23',
    valueInputOption: 'RAW',
    resource: { values: [['【CTA：リード文CTA】']] }
  });

  process.stderr.write('テキストデータ書き込み完了\n');

  // --- Step 3: 赤文字フォーマット再適用（Row24-44） ---
  const sheetRes = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
    fields: 'sheets.properties'
  });
  const sheetId = sheetRes.data.sheets[0].properties.sheetId;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    resource: {
      requests: [{
        repeatCell: {
          range: {
            sheetId: sheetId,
            startRowIndex: 23, // Row24 (0-based)
            endRowIndex: 44,   // Row44
            startColumnIndex: 8,  // I列
            endColumnIndex: 14    // N列
          },
          cell: {
            userEnteredFormat: {
              textFormat: {
                foregroundColorStyle: {
                  rgbColor: { red: 1, green: 0, blue: 0 }
                }
              }
            }
          },
          fields: 'userEnteredFormat.textFormat.foregroundColorStyle'
        }
      }]
    }
  });

  process.stderr.write('赤文字フォーマット適用完了\n');

  // --- Step 4: ハイパーリンク再埋め込み ---
  // 新しい行番号とリンクデータのマッピング
  const linkMap = [
    // Row24: h2 選び方 → 生成ai 比較
    { row: 24, text: '【内部リンク：生成ai 比較】\n生成ai 比較 / テキストリンク（クラスターページ）', kw: '生成ai 比較', url: 'https://shift-ai.co.jp/blog/36489/' },
    // Row26: 商用利用h3 → ai 役に立たない
    { row: 26, text: '【内部リンク：ai 役に立たない】\nai 役に立たない / テキストリンク（クラスターページ）', kw: 'ai 役に立たない', url: 'https://shift-ai.co.jp/blog/25231/' },
    // Row28: 品質h3 → genspark
    { row: 28, text: '【内部リンク：genspark】\ngenspark / テキストリンク（クラスターページ）', kw: 'genspark', url: 'https://shift-ai.co.jp/blog/12500/' },
    // Row29: h2 15選 → 生成ai一覧
    { row: 29, text: '【内部リンク：生成ai一覧】\n生成ai一覧 / ブログカード（ピラーページ）', kw: '生成ai一覧', url: 'https://shift-ai.co.jp/blog/3388/' },
    // Row32: Adobe Firefly → 生成ai 課金するなら
    { row: 32, text: '【内部リンク：生成ai 課金するなら】\n生成ai 課金するなら / テキストリンク（クラスターページ）', kw: '生成ai 課金するなら', url: 'https://shift-ai.co.jp/blog/24928/' },
    // Row36: Ideogram → 生成ai ランキング
    { row: 36, text: '【内部リンク：生成ai ランキング】\n生成ai ランキング / テキストリンク（クラスターページ）', kw: '生成ai ランキング', url: 'https://shift-ai.co.jp/blog/3913/' },
  ];

  const hyperlinkRequests = linkMap.map(item => {
    const kwStart = item.text.indexOf(item.kw);
    const kwEnd = kwStart + item.kw.length;
    return {
      updateCells: {
        rows: [{
          values: [{
            userEnteredValue: { stringValue: item.text },
            textFormatRuns: [
              { startIndex: 0, format: { foregroundColorStyle: { rgbColor: { red: 1, green: 0, blue: 0 } } } },
              { startIndex: kwStart, format: { link: { uri: item.url }, foregroundColorStyle: { rgbColor: { red: 1, green: 0, blue: 0 } } } },
              { startIndex: kwEnd, format: { foregroundColorStyle: { rgbColor: { red: 1, green: 0, blue: 0 } } } }
            ]
          }]
        }],
        fields: 'userEnteredValue,textFormatRuns',
        range: {
          sheetId: sheetId,
          startRowIndex: item.row - 1,
          endRowIndex: item.row,
          startColumnIndex: 12, // M列
          endColumnIndex: 13
        }
      }
    };
  });

  // Row45以降のハイパーリンクも再適用（これらは移動していないので変更不要だが念のため）
  // Row45-54は変更していないのでスキップ

  if (hyperlinkRequests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: { requests: hyperlinkRequests }
    });
  }

  process.stderr.write('ハイパーリンク埋め込み完了\n');
  process.stderr.write('\n全修正完了\n');
}

main().catch(e => {
  process.stderr.write('エラー: ' + e.message + '\n');
  process.exit(1);
});
