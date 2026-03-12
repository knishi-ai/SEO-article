# seo-articles 検証レポート + create-article-tool 統合報告

## 概要

seo-articles リポジトリを検証した結果、そのままでは運用できない状態だったため、
自分が別途作成していた **create-article-tool**（Google Sheets連携ツール）と統合し、
実際に動作する環境を構築しました。

---

## seo-articles の検証結果

### 良かった点
- 記事作成フローの設計（7ステップ）が丁寧で、ユーザー/ClaudeCodeの役割分担が明確
- 画像コメント規約（`<!-- 画像: ファイル名.png | 内容: 説明 -->`）が後工程と連携しやすい設計

### 不足していた点

| 項目 | 状況 |
|------|------|
| Python/Shellスクリプト | CLAUDE.mdに記載があるが、**ファイルが1つも存在しない**（upload.py, upload_images.py, wp_post.sh, rename.py） |
| レギュレーション文書 | regulation_research.md, regulation_writing.md が**未作成** |
| 環境設定 | .env.example, requirements.txt, .gitignore が**未作成** |
| Git管理 | CLAUDE.mdにGitHub URLの記載があるが、**リポジトリが初期化されていない** |
| スプレッドシート連携 | 構成をスプレッドシートに書き出す機能が**存在しない** |
| テスト | テストファイル・テスト設計が**なし** |

→ CLAUDE.md（ドキュメント）だけが先行しており、**実装がほぼゼロ**の状態でした。

---

## 自分が作成していた create-article-tool でカバーできた点

| 機能 | 説明 |
|------|------|
| Google Sheets API連携 | テンプレートスプレッドシートのコピー・データ書き込みが動作する |
| OAuth認証フロー | ブラウザ起動→コールバック→トークン保存の自動化済み |
| 新規/リライト2モード対応 | スプレッドシートの左側（新規）・右側（リライト）にそれぞれ書き込み可能 |
| ターゲット情報の書き込み | KW、属性、ペインポイント、ベネフィット等をセル単位で自動入力 |
| 記事構成の書き込み | H2/H3見出し構造、概略、ディスクリプションをセル単位で自動入力 |
| Claude Code スキル群 | `/s`（記事作成開始）、`/create-article`、`/rewrite-article`、`/regulation` 等8個のスキルを作成済み |

---

## 統合時に実施した修正

1. **フォルダ統合** — seo-articlesのworkflow/とarticles/をcreate-article-toolに取り込み
2. **セキュリティ修正** — 認証情報の重複ファイル削除、.gitignore整備
3. **コードルール違反修正** — console.log → process.stdout.write/process.stderr.write に統一
4. **パス修正** — article-flow.md内の全パスを統合後のディレクトリに書き換え
5. **CLAUDE.md統合** — 2つのCLAUDE.mdを1つに統合、未実装ファイルを明記
6. **.env.example作成** — WP/YouTube/Sheets認証情報のテンプレート
7. **Git初期化** — リポジトリ作成、認証情報を除外してステージング

---

## Git連携について

現在、**Gitのリモート連携は解除しています**。

理由：seo-articlesのGitHub連携に木村さんのGmailアカウントが必要であり、
自分の環境で勝手にpushできない状態だったためです。
Git自体は `git init` 済みで、ローカルでのバージョン管理は可能です。
リモート連携が必要な場合は、対象のGitHubリポジトリとアカウント情報をいただければ設定します。

---

## 未実装（今後の課題）

| 項目 | 説明 |
|------|------|
| upload.py | YouTube動画アップロード（OAuth認証が必要） |
| upload_images.py | WordPress画像アップロード（REST API） |
| wp_post.sh | WordPress記事入稿（REST API） |
| requirements.txt | Python依存ライブラリ定義 |
| テスト | sheets.js等の単体テスト |
