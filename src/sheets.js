'use strict';

const { google } = require('googleapis');
const config = require('./config');
const { getAuthClient } = require('./auth');

/**
 * テンプレートスプレッドシートをコピーして新規シートを作成
 * @param {string} title - 新しいスプレッドシートのタイトル
 * @returns {Promise<{spreadsheetId: string, spreadsheetUrl: string}>}
 */
async function copyTemplate(title) {
  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  const response = await drive.files.copy({
    fileId: config.TEMPLATE_SPREADSHEET_ID,
    requestBody: {
      name: title,
    },
  });

  const spreadsheetId = response.data.id;
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  return { spreadsheetId, spreadsheetUrl };
}

/**
 * スプレッドシートにデータを書き込む
 * @param {string} spreadsheetId - スプレッドシートID
 * @param {string} sheetName - シート名
 * @param {Array<{range: string, value: string}>} data - 書き込みデータ
 */
async function writeData(spreadsheetId, sheetName, data) {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const requests = data.map(({ range, value }) => ({
    range: `${sheetName}!${range}`,
    values: [[value]],
  }));

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data: requests,
    },
  });
}

/**
 * 記事のターゲット情報を書き込む（上部セクション）
 * @param {string} spreadsheetId
 * @param {string} mode - 'new' | 'rewrite'
 * @param {object} targetInfo
 */
async function writeTargetInfo(spreadsheetId, mode, targetInfo) {
  const cells = mode === 'new' ? config.CELLS.NEW : config.CELLS.REWRITE;
  const data = [];

  if (targetInfo.mainKw) {
    data.push({ range: cells.MAIN_KW, value: targetInfo.mainKw });
  }
  if (targetInfo.subKw) {
    data.push({ range: cells.SUB_KW, value: targetInfo.subKw });
  }
  if (targetInfo.attribute) {
    data.push({ range: cells.ATTRIBUTE, value: targetInfo.attribute });
  }
  if (targetInfo.painPoint) {
    data.push({ range: cells.PAIN_POINT, value: targetInfo.painPoint });
  }
  if (targetInfo.knowledgeLevel) {
    data.push({ range: cells.KNOWLEDGE_LEVEL, value: targetInfo.knowledgeLevel });
  }
  if (targetInfo.latentNeeds) {
    data.push({ range: cells.LATENT_NEEDS, value: targetInfo.latentNeeds });
  }
  if (targetInfo.avoidance) {
    data.push({ range: cells.AVOIDANCE, value: targetInfo.avoidance });
  }
  if (targetInfo.benefit) {
    data.push({ range: cells.BENEFIT, value: targetInfo.benefit });
  }
  if (targetInfo.uniqueness) {
    data.push({ range: cells.UNIQUENESS, value: targetInfo.uniqueness });
  }
  if (targetInfo.notes) {
    data.push({ range: cells.NOTES, value: targetInfo.notes });
  }

  // リライト専用フィールド
  if (mode === 'rewrite') {
    if (targetInfo.originalUrl) {
      data.push({ range: cells.ORIGINAL_URL, value: targetInfo.originalUrl });
    }
    if (targetInfo.changeReason) {
      data.push({ range: cells.CHANGE_REASON, value: targetInfo.changeReason });
    }
  }

  if (data.length > 0) {
    await writeData(spreadsheetId, config.TEMPLATE_SHEET_NAME, data);
  }
}

/**
 * 記事構成（見出し構造）を書き込む（下部セクション）
 * @param {string} spreadsheetId
 * @param {string} mode - 'new' | 'rewrite'
 * @param {object} structure - { title, introduction, headings[], description }
 */
async function writeStructure(spreadsheetId, mode, structure) {
  const cells = mode === 'new' ? config.CELLS.NEW : config.CELLS.REWRITE;
  const data = [];
  let row = cells.STRUCTURE_START_ROW;

  // タイトル行
  if (structure.title) {
    data.push({ range: `${cells.TITLE_COL}${row}`, value: structure.title });
  }
  row++;

  // 導入（リード文）
  if (structure.introduction) {
    data.push({ range: `${cells.SUMMARY_COL}${row}`, value: structure.introduction });
  }
  row++;

  // 各見出し
  if (structure.headings) {
    for (const heading of structure.headings) {
      // hタグ（ラベル列とドロップダウン列の両方に書き込む）
      if (heading.tag) {
        data.push({ range: `${cells.HTAG_COL}${row}`, value: heading.tag });
        if (cells.DROPDOWN_COL && cells.DROPDOWN_COL !== cells.HTAG_COL) {
          data.push({ range: `${cells.DROPDOWN_COL}${row}`, value: heading.tag });
        }
      }
      // タイトル名
      if (heading.title) {
        data.push({ range: `${cells.TITLE_COL}${row}`, value: heading.title });
      }
      // 概略
      if (heading.summary) {
        data.push({ range: `${cells.SUMMARY_COL}${row}`, value: heading.summary });
      }

      // リライト版の追加フィールド
      if (mode === 'rewrite') {
        if (heading.internalLink) {
          data.push({ range: `${cells.INTERNAL_LINK_COL}${row}`, value: heading.internalLink });
        }
        if (heading.supplement) {
          data.push({ range: `${cells.SUPPLEMENT_COL}${row}`, value: heading.supplement });
        }
      }

      row++;
    }
  }

  // まとめ行（構成の最後から2行目）
  if (structure.summary) {
    // まとめは見出しリストの最後に含める
  }

  // ディスクリプション
  if (structure.description) {
    data.push({ range: `${cells.TITLE_COL}${config.DESCRIPTION_ROW}`, value: structure.description });
  }

  if (data.length > 0) {
    await writeData(spreadsheetId, config.TEMPLATE_SHEET_NAME, data);
  }
}

module.exports = {
  copyTemplate,
  writeData,
  writeTargetInfo,
  writeStructure,
};
