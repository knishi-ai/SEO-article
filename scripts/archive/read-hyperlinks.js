'use strict';

const { getAuthClient } = require('../src/auth');
const { google } = require('googleapis');

/**
 * M列のハイパーリンクURLを読み取る
 */
async function main() {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.get({
    spreadsheetId: '1A6dqnZdEkhv_iQYf-fmwrd1nyVacq_VfP9ZtyQ6uf_Y',
    ranges: ['記事要項!M24:M54'],
    includeGridData: true,
    fields: 'sheets.data.rowData.values.textFormatRuns,sheets.data.rowData.values.userEnteredValue'
  });
  const rowData = res.data.sheets[0].data[0].rowData || [];
  const result = {};
  rowData.forEach((rd, i) => {
    const row = i + 24;
    if (!rd.values || !rd.values[0]) return;
    const cell = rd.values[0];
    const text = cell.userEnteredValue ? cell.userEnteredValue.stringValue : '';
    if (!text) return;
    const runs = cell.textFormatRuns || [];
    const links = [];
    runs.forEach(r => {
      if (r.format && r.format.link && r.format.link.uri) {
        links.push({ startIndex: r.startIndex || 0, url: r.format.link.uri });
      }
    });
    if (links.length > 0) {
      result[row] = { text, links };
    }
  });
  process.stdout.write(JSON.stringify(result, null, 2));
}

main();
