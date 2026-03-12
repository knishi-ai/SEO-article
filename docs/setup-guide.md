# 環境セットアップガイド

この手順に従えば、別のPCでも同じ記事作成環境を再現できます。

---

## 前提条件

- Windows 10/11
- Git Bash（またはMSYS2）がインストール済み
- Node.js v18以上がインストール済み
- Claude Code がインストール済み

---

## 手順

### 1. プロジェクトファイルを配置

受け取った `create-article-tool/` フォルダを `~/`（ホームディレクトリ）直下に配置します。

```
C:\Users\{ユーザー名}\create-article-tool\
```

### 2. npm パッケージをインストール

```bash
cd ~/create-article-tool
npm install
```

### 3. Google OAuth 認証を設定

#### 3-1. credentials.json を配置

`credentials.json` をプロジェクトルートに配置してください。
（このファイルは Google Cloud Console の OAuth 2.0 クライアントIDからダウンロードしたものです）

#### 3-2. 認証フローを実行

```bash
npm run auth
```

ブラウザが開き、Googleアカウントでの認証を求められます。
認証が完了すると `token.json` が自動生成されます。

#### 3-3. 接続テスト

```bash
npm run test-connection
```

「接続成功！」と表示されればOKです。

### 4. Claude Code スキルを配置

受け取った `commands/` フォルダの中身を以下にコピーしてください：

```bash
mkdir -p ~/.claude/commands
cp commands/*.md ~/.claude/commands/
```

配置後、Claude Codeで `/s` と入力して記事作成スキルが表示されれば完了です。

### 5. Claude Code ルールを配置（任意）

```bash
mkdir -p ~/.claude/rules
cp rules/coding-rules.md ~/.claude/rules/
```

### 6. CLAUDE.md を確認

`~/create-article-tool/CLAUDE.md` にプロジェクトの全体像、コマンド一覧、コーディングルールが記載されています。

---

## 共有ファイル一覧

| ファイル/フォルダ | 必須 | 説明 |
|------------------|------|------|
| `create-article-tool/` | 必須 | プロジェクト本体（node_modules除く） |
| `credentials.json` | 必須 | Google OAuth クライアント認証情報 |
| `commands/*.md` | 必須 | Claude Code スキル8ファイル |
| `rules/coding-rules.md` | 任意 | Claude Code コーディングルール |

**注意：** `token.json` は共有不要です。各自の環境で `npm run auth` を実行して生成してください。

---

## 動作確認

セットアップ完了後、以下のコマンドで動作確認できます：

```bash
cd ~/create-article-tool

# 1. API接続テスト
npm run test-connection

# 2. テンプレートコピーテスト
node src/index.js '{"action":"copy","title":"【テスト】セットアップ確認"}'
```

スプレッドシートのURLが返ってくれば成功です。
テスト用シートは確認後に削除してください。

---

## トラブルシューティング

| 症状 | 対処 |
|------|------|
| `npm run auth` でブラウザが開かない | 手動でURLをコピーしてブラウザに貼り付け |
| 「credentials.json が見つかりません」 | プロジェクトルート直下に配置されているか確認 |
| 「token expired」 | `token.json` を削除して `npm run auth` を再実行 |
| `/s` が使えない | `~/.claude/commands/s.md` が配置されているか確認 |
