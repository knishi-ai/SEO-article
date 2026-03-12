# 記事作成フロー（ClaudeCode運用）

最終更新：2026-03-12

---

## 全体の流れ

```
[ユーザー] KWを渡す
     ↓
[ClaudeCode] リサーチ・ターゲット作成
     ↓
[ClaudeCode] 構成作成
     ↓
[ユーザー] 構成をチェック・承認
     ↓（OKの場合）
[ClaudeCode] 本文作成・画像挿入箇所の記載
     ↓
[ClaudeCode] 画像・動画フォルダを作成してユーザーに通知
     ↓
[ユーザー] 画像・動画を収集してフォルダに格納 → 完了をClaudeCodeに通知
     ↓
[ClaudeCode] 画像・動画をアップロード → 本文HTMLに埋め込み → WPに入稿
     ↓
[ユーザー] 最終チェック・CTA追加・公開
```

---

## 各ステップの詳細

### ステップ1：KW受け渡し（ユーザー）

- `/s KW` の形式でコマンドを送信する
- 例：`/s 画像生成AI 使い方`
- ClaudeCodeはコマンドを受け取り次第、ステップ2に進む

---

### ステップ2：リサーチ・ターゲット作成（ClaudeCode）

参照ファイル：`~/create-article-tool/workflow/regulation_research.md`

以下の順で実施し、リサーチメモを出力する。

**2-1. KW調査**
- サジェストKW・PASF・PAAをWeb検索で収集
- サブKWを選定（KW単位で記載）

**2-2. 競合分析**
- 対策KWのSEO上位10記事を調査
- 各競合記事の構成・カバー範囲・独自性を把握

**2-3. リサーチメモ作成**
以下の項目を埋める：
- 対策KW：ユーザーから提供されたKW
- サブKW：2-1で収集したもの
- 属性：メディアターゲット（SHIFT AI Times = ToC、副業・人材価値向上層）を加味
- PainPoint：属性・知識レベルに合ったもの
- 読者の知識レベル：知っていることと知らないことの境を明確に
- 顕在ニーズ：PainPointから生まれる検索動機
- 避けたい欲：蓋然性のある内容
- ベネフィット：読了後の理想像
- 独自性：競合10記事と比較した当記事ならではの性質

**出力物：** リサーチメモ（マークダウン形式）

---

### ステップ3：構成作成（ClaudeCode）

参照ファイル：`~/create-article-tool/workflow/regulation_research.md`

リサーチメモをもとに構成を作成する。

- タイトル（H1）
- 見出し構造（H2・H3）：読者の顕在ニーズ優先順
- リード文の骨子（共感→煽り→記事内容→ベネフィット）
- 内部リンク・CTA配置の案

**出力物：** 構成案（マークダウン形式）

---

### ステップ4：構成チェック（ユーザー）

- ユーザーが構成を確認
- OKなら次のステップへ
- NGなら修正指示を出す

---

### ステップ5：本文作成・画像指定（ClaudeCode）

参照ファイル：`~/create-article-tool/workflow/regulation_writing.md`

- 本文を一気に執筆する
- 画像が必要な箇所は以下の形式で記載する：

```markdown
<!-- 画像: ファイル名.png | 内容: どんな画像を用意すべきかの説明 -->
![ALTテキスト](./images/ファイル名.png)
```

- ALTテキストは `~/.claude/commands/alt.md` のルールに従う
- 本文完成後、`~/create-article-tool/articles/KW「◯◯」/article.md` として保存する

---

### ステップ5.5：画像・動画フォルダの作成（ClaudeCode）

以下の2つのフォルダを `~/Downloads/` に作成し、ユーザーに通知する。

- `~/Downloads/KW「◯◯」/` ← 画像格納用
- `~/Downloads/KW「◯◯」動画/` ← 動画格納用

ユーザーへの通知文：
```
フォルダを作成しました。
・画像：~/Downloads/KW「◯◯」/
・動画：~/Downloads/KW「◯◯」動画/
それぞれに画像・動画を格納してください。完了したら教えてください。
```

ユーザーが格納を完了してステップ6に進む。

---

### ステップ6：アップロード・埋め込み・WP入稿（ClaudeCode）

#### 6-1. 画像アップロード

スクリプト：`~/create-article-tool/workflow/upload_images.py`

```bash
python3 ~/create-article-tool/workflow/upload_images.py
```

- `~/Downloads/KW「◯◯」/` の画像をWP REST APIでアップロード
- 結果を `~/create-article-tool/articles/KW「◯◯」/images.json` に保存

#### 6-2. 動画アップロード

スクリプト：`~/create-article-tool/workflow/upload.py`

```bash
python3 ~/create-article-tool/workflow/upload.py
```

- `~/Downloads/KW「◯◯」動画/` の動画をYouTubeに限定公開でアップロード
- URLを `~/create-article-tool/articles/KW「◯◯」/videos.json` に保存

#### 6-3. 本文HTMLへの埋め込み（ClaudeCode）

`images.json`・`videos.json`・`article.md` を読み込み、以下を実施する。

**画像の埋め込み：**
- 本文中の `<!-- 画像: ファイル名.png | 内容: ... -->` コメントと `images.json` を照合
- 内容の説明文を手がかりに対応する画像を目視で判断
- 画像ブロックの `id:00000` → 実際のメディアID、`src="画像URL"` → 実際のURLに置換

**動画の埋め込み：**
- 本文中の動画コメントと `videos.json` を照合
- 対応するYouTube URLを動画ブロックに埋め込む

#### 6-4. WP入稿

スクリプト：`~/create-article-tool/workflow/wp_post.sh`
認証情報：`~/create-article-tool/workflow/.env`

以下の情報をREST API経由で入稿する。入稿後のステータスは必ず **draft（下書き）**。

- タイトル
- 本文（HTML形式）
- スラッグ
- カテゴリID
- タグID

**入稿できないフィールド（手動対応）：**
- メタディスクリプション → ステップ7でユーザーが手動入力

---

### ステップ7：最終チェック・公開（ユーザー）

WP管理画面とYouTube Studioで以下を実施してから公開する。

- メタディスクリプションを入力（SEO設定欄）
- CTA追加
- 画像の確認・調整
- YouTube Studioで動画チェック完了後に公開設定に変更
- 最終確認してWP公開

---

## 未決事項

- ステップ4のNGパターンと差し戻しルール
- カテゴリID・タグIDの対応表
