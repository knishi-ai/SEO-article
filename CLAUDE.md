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
├── workflow/             # フロー定義・レギュレーション・スクリプト
│   ├── article-flow.md   # 記事作成フロー（7ステップ）
│   ├── regulation_research.md  # ※未実装
│   ├── regulation_writing.md   # ※未実装
│   ├── wp_post.sh              # ※未実装（WP REST API 入稿）
│   ├── upload.py               # ※未実装（YouTube動画アップロード）
│   └── upload_images.py        # ※未実装（WP画像アップロード）
├── articles/             # 記事データ（KWごとのフォルダ）
│   └── KW「◯◯」/
│       ├── article.md    # 本文（Gutenberg HTML形式）
│       ├── images.json   # 画像アップロード結果
│       └── videos.json   # YouTube動画URL一覧
├── scripts/
│   └── archive/          # 過去の1回限りの修正スクリプト（参考用）
└── tests/                # ※未実装
```

## セットアップ

### 1. Google Sheets 連携（必須）

```bash
cd ~/create-article-tool
npm install
npm run auth       # ブラウザでOAuth認証 → token.json が生成される
npm run test-connection  # 接続テスト
```

`credentials.json` はプロジェクトルートに配置する。

### 2. WP / YouTube 連携（入稿まで行う場合）

```bash
cp .env.example .env     # 認証情報を入力
pip3 install -r workflow/requirements.txt  # ※requirements.txt 未実装
```

YouTube OAuth: 1Password から `token.pickle` と `credentials.json` を取得して `workflow/` に配置。

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
