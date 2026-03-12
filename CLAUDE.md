# create-article-tool

SEO記事の構成作成からWP入稿までを支援するツール群。
Google Sheets連携（Node.js）+ WP/YouTube連携（Python/Shell）を統合。

## フォルダ構成

```
create-article-tool/
├── CLAUDE.md
├── .gitignore
├── .env.example          # 認証情報テンプレート
├── package.json
├── src/                  # Google Sheets 連携
│   ├── index.js          # CLI エントリポイント（copy / write）
│   ├── auth.js           # Google OAuth2 認証
│   ├── config.js         # テンプレートID・セルマッピング
│   ├── sheets.js         # Sheets API 操作（copyTemplate, writeTargetInfo, writeStructure）
│   └── test-connection.js
├── commands/             # Claude Code スキル（~/.claude/commands/ にコピーして使う）
│   ├── s.md              # /s — 記事作成スタート
│   ├── create-article.md # /create-article — 新規記事構成作成
│   ├── rewrite-article.md # /rewrite-article — リライト構成作成
│   ├── create-breaking-article.md # /create-breaking-article — 速報記事作成
│   ├── regulation.md     # /regulation — 記事レギュレーション
│   ├── regulation_research.md # /regulation_research — リサーチ・構成レギュレーション
│   ├── research-memo-guide.md # リサーチメモガイドライン
│   └── writing-style-guide.md # 望ましい書き方
└── workflow/             # フロー定義
    └── article-flow.md   # 記事作成フロー（7ステップ）
```

## セットアップ

### 1. Claude Code スキルを配置（必須）

```bash
mkdir -p ~/.claude/commands
cp ~/create-article-tool/commands/*.md ~/.claude/commands/
```

配置後、Claude Code で `/s` と入力してスキルが表示されればOK。

### 2. Google Sheets 連携（構成をスプレッドシートに書く場合）

```bash
cd ~/create-article-tool
npm install
npm run auth       # ブラウザでOAuth認証 → token.json が生成される
npm run test-connection  # 接続テスト
```

`credentials.json` はプロジェクトルートに配置する（別途セキュアに共有）。

## コマンド

### Google Sheets

```bash
# テンプレートをコピーして新規スプレッドシート作成
node src/index.js '{"action":"copy","title":"【構成】KW名"}'

# スプレッドシートにデータ書き込み
node src/index.js '{"action":"write","spreadsheetId":"xxx","mode":"new","targetInfo":{...},"structure":{...}}'

# OAuth 認証
npm run auth

# 接続テスト
npm run test-connection
```

### 記事作成フロー

詳細は `workflow/article-flow.md` を参照。`/s KW` コマンドで開始。

## コーディングルール

- CommonJS（`'use strict'`, `module.exports`/`require`）— ESM は使わない
- 文字列はシングルクォート
- 変数名は camelCase
- すべての関数にコメントを書く
- `console.log` は禁止 — stdout は `process.stdout.write`、ログは `process.stderr.write`
- ユーザー向けエラーメッセージは日本語

## Git に含めないもの（.gitignore 設定済み）

- `credentials.json` / `token.json`（Google OAuth）
- `client_secret_*.json`
- `*.pickle`（YouTube OAuth）
- `.env`（WP認証情報）
- `node_modules/`
- 動画ファイル（`*.mp4` など）
