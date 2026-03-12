'use strict';

const path = require('path');

module.exports = {
  TEMPLATE_SPREADSHEET_ID: '14rMWNKEMTx7DnDnVVfiQQKZ259JKuyoqb_kLSYlfcCw',
  TEMPLATE_SHEET_GID: 1418671356,
  TEMPLATE_SHEET_NAME: '記事要項',

  CREDENTIALS_PATH: path.join(__dirname, '..', 'credentials.json'),
  TOKEN_PATH: path.join(__dirname, '..', 'token.json'),

  SCOPES: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
  ],

  // セル位置マッピング（リライト版 = 右側セクション）
  CELLS: {
    // 上部セクション（左側 = 新規、右側 = リライト）
    NEW: {
      MAIN_KW: 'B4',
      SUB_KW: 'E4',
      ATTRIBUTE: 'D10',
      PAIN_POINT: 'D11',
      KNOWLEDGE_LEVEL: 'D12',
      LATENT_NEEDS: 'D13',
      AVOIDANCE: 'D14',
      BENEFIT: 'D15',
      UNIQUENESS: 'D16',
      NOTES: 'D18',
      // 記事構成（行22から開始）
      STRUCTURE_START_ROW: 22,
      TITLE_COL: 'D',
      HTAG_COL: 'C',
      DROPDOWN_COL: 'C',
      SUMMARY_COL: 'G',
      HEADING_CHARS_COL: 'F',
    },
    REWRITE: {
      ORIGINAL_URL: 'H7',
      MAIN_KW: 'H4',
      SUB_KW: 'L4',
      ATTRIBUTE: 'K10',
      PAIN_POINT: 'K11',
      KNOWLEDGE_LEVEL: 'K12',
      LATENT_NEEDS: 'K13',
      AVOIDANCE: 'K14',
      BENEFIT: 'K15',
      UNIQUENESS: 'K16',
      CHANGE_REASON: 'K17',
      NOTES: 'K18',
      // 記事構成（行22から開始）
      STRUCTURE_START_ROW: 22,
      TITLE_COL: 'J',
      HTAG_COL: 'I',
      DROPDOWN_COL: 'I',
      HEADING_CHARS_COL: 'K',
      SUMMARY_COL: 'L',
      INTERNAL_LINK_COL: 'M',
      SUPPLEMENT_COL: 'N',
    }
  },

  // ディスクリプション行（シート下部）
  DESCRIPTION_ROW: 70,
};
