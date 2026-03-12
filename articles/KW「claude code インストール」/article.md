<!-- タイトル: Claude Codeのインストール方法を全OS対応で解説　初期設定3ステップも紹介 -->

<!-- リード文 -->

「Claude Code（クロードコード）を使ってみたいけれど、インストール方法がわからない」と悩んでいませんか。

Claude Codeは2026年現在、ネイティブインストーラーに対応しており、コマンド1行で導入できます。

インストール方法を把握しないままでいると、周囲がAIエージェントで開発効率を上げる中、取り残されてしまうでしょう。

正しい手順を知れば、最短10分でセットアップが完了します。

本記事では、Windows・Mac・LinuxそれぞれのOS別インストール手順を、スクリーンショットを交えて解説しています。

料金プランの選び方やインストール後の初期設定、エラー時の対処法まで網羅しています。

最後まで読めば、Claude Codeのインストールから初期設定までを迷わず完了でき、今日からAIエージェントを活用した開発を始められます。

ぜひ最後までご覧いただき、Claude Codeを実際にインストールしてみてください。

<!-- CTA: リード文CTA（本文1） -->
<!-- CTA種類: SHIFT AI セミナー -->

<!-- 目次 -->

## Claude Codeとは自律型AIコーディングツール

Claude Code（クロードコード）とは、Anthropic（アンスロピック）社が提供するAIコーディングツールです。

ターミナル上で動作し、コードの読み書きやファイル操作、コマンドの実行までを自律的に行える「エージェント型」のツールである点が大きな特徴です。

チャット版のClaudeとは異なり、プロジェクト全体のコードベースを理解した上で、複数のファイルをまたいだ作業を一括で処理できます。

以下では、Claude Codeの主な機能と対応環境を紹介します。

### Claude Codeでできること

Claude Codeでは、主に以下の5つの作業を自然言語の指示だけで実行できます。

- **コードの生成・編集**: 「ログイン機能を作って」のような日本語の指示から、必要なコードを自動で生成・修正する
- **ファイルの作成・操作**: 新しいファイルの作成、既存ファイルの読み込み・編集・削除をAIが自律的に行う
- **Git操作**: コミット、ブランチ作成、プルリクエストの作成までをターミナル上で完結させる
- **テストの実行**: テストコードの作成から実行、結果の確認・修正までを一連の流れで処理する
- **コードベース全体の理解**: プロジェクト内の複数ファイルを横断的に読み取り、コード全体の構造を把握した上で作業を進める

<!-- 画像: claude-code-demo.png | 内容: Claude Codeのターミナル画面で自然言語の指示を入力し、コードが生成されている様子のスクリーンショット -->
![Claude Codeのターミナル画面で自然言語の指示からコードを生成している画面](./images/claude-code-demo.png)

<!-- 出典: https://code.claude.com/docs/ja/overview -->

### Claude Codeの対応環境

Claude Codeは以下のOS・環境に対応しています。

インストールを始める前に、自分のPCが要件を満たしているか確認してください。

| 項目 | 要件 |
|------|------|
| Windows | Windows 10（バージョン1809）以上 |
| Mac | macOS 13.0以上 |
| Linux | Ubuntu 20.04以上、Debian 10以上 |
| メモリ | 4GB以上 |
| ネットワーク | インターネット接続が必須 |
| 対応シェル | Bash、Zsh |
| 対応エディタ | VS Code（1.98.0以上）、JetBrains系IDE |

<!-- 出典: https://code.claude.com/docs/ja/setup -->

Windowsの場合は、Git for Windowsのインストールも必要です。

詳しいインストール手順は後述します。

<!-- 内部リンク候補: 「Claude Code 使い方」記事（※公開済みの場合） -->

## Claude Codeのインストール前に確認すべき料金プラン

Claude Code自体のインストールは無料です。

ただし、実際にAI機能を利用するには、Claudeの有料プランへの加入またはAPIクレジットの設定が必要です。

インストール後に「使えない」とならないよう、事前にプランを把握しておきましょう。

以下では、個人利用に関係する3つの料金体系を解説します。

### Proプラン（月額20ドル）の特徴

Proプランは、Claude Codeを初めて使う方に最適なプランです。

月額20ドル（約3,000円）で、Claude Opus 4やSonnet 4など、最新のAIモデルにアクセスできます。

Proプランの主な特徴は以下のとおりです。

- Claude Codeを含む全てのClaude製品を利用できる
- 5時間あたり45メッセージの利用制限がある
- Web版のClaudeチャットも同じプランで使用可能

副業でのアプリ開発や個人プロジェクトでの利用であれば、Proプランの利用枠で十分対応できます。

まずはProプランから始め、利用頻度に応じてプランを見直すのが効率的です。

<!-- 出典: https://claude.ai/pricing -->

### Maxプラン（月額100ドル/200ドル）の特徴

Maxプランは、Claude Codeを日常的に使い込む開発者向けのプランです。

2つのグレードが用意されています。

| プラン | 月額 | 利用枠 |
|--------|------|--------|
| Max 5x | 100ドル（約15,000円） | Proプランの5倍 |
| Max 20x | 200ドル（約30,000円） | Proプランの20倍 |

1日に何時間もClaude Codeを使って開発を進める場合や、大規模なリファクタリングを頻繁に行う場合は、Maxプランの検討をおすすめします。

Proプランで利用制限に達する頻度が高くなった段階でアップグレードすれば、無駄な出費を避けられます。

### API従量課金の特徴

API従量課金は、使った分だけ料金が発生する方式です。

Anthropic Console（console.anthropic.com）でアカウントを作成し、クレジットカードを登録することで利用を開始できます。

API従量課金の特徴は以下のとおりです。

- 月額固定費がかからず、使用量に応じた支払いのみ
- トークン単位で課金されるため、使用量の可視化がしやすい
- 利用上限を自分で設定できるため、予算管理がしやすい

「毎日は使わないが、必要なときだけClaude Codeを使いたい」という方に向いています。

ただし、Claude Codeはやり取りのトークン消費量が多くなりやすいため、想定以上のコストが発生する場合があります。

コスト管理に不安がある場合は、まずProプランの固定料金で利用する方が安心です。

<!-- 内部リンク候補: 「Claude 料金」記事（※公開済みの場合） -->

## Claude CodeをOS別にインストールする手順

2026年3月現在、Claude Codeはネイティブインストーラーでのインストールが推奨されています。

以前はNode.jsのインストールが前提でしたが、現在はNode.js不要でコマンド1行でインストールが完了します。

ネイティブインストーラーには自動更新機能が含まれており、常に最新バージョンが維持される点もメリットです。

以下では、Windows・Mac・Linuxそれぞれのインストール手順を解説します。

### Windowsでのインストール手順

Windowsでは、PowerShellを使用してインストールを行います。

事前にGit for Windowsのインストールが必要です。

**手順1: Git for Windowsをインストールする**

Git for Windowsの公式サイト（https://git-scm.com/downloads/win）からインストーラーをダウンロードし、画面の指示に従ってインストールしてください。

すでにGit for Windowsがインストール済みの場合は、この手順をスキップできます。

<!-- 画像: git-for-windows-download.png | 内容: Git for Windowsの公式ダウンロードページのスクリーンショット。ダウンロードボタンを強調 -->
![Git for Windowsの公式ダウンロードページでダウンロードボタンを示した画面](./images/git-for-windows-download.png)

**手順2: PowerShellでインストールコマンドを実行する**

スタートメニューから「PowerShell」を検索し、右クリックで「管理者として実行」を選択してください。

以下のコマンドをコピーして貼り付け、Enterキーを押します。

```
irm https://claude.ai/install.ps1 | iex
```

<!-- 画像: windows-powershell-install.png | 内容: PowerShellでClaude Codeのインストールコマンドを実行している画面のスクリーンショット -->
![PowerShellでClaude Codeのインストールコマンドを実行している画面](./images/windows-powershell-install.png)

WinGetを使用する場合は、以下のコマンドでもインストールできます。

```
winget install Anthropic.ClaudeCode
```

**手順3: インストールを確認する**

インストールが完了したら、Git Bashを開いて以下のコマンドを実行してください。

```
claude --version
```

バージョン番号が表示されれば、インストールは成功です。

<!-- 画像: windows-version-check.png | 内容: Git Bashでclaude --versionを実行し、バージョン番号が表示されている画面のスクリーンショット -->
![Git Bashでclaude --versionを実行してバージョン番号が表示された画面](./images/windows-version-check.png)

<!-- 出典: https://code.claude.com/docs/ja/setup -->

### Macでのインストール手順

Macでは、ターミナルからコマンド1行でインストールできます。

**手順1: ターミナルを開く**

「アプリケーション」→「ユーティリティ」→「ターミナル」の順に開いてください。

Spotlight検索（Cmd+Space）で「ターミナル」と入力して開くこともできます。

**手順2: インストールコマンドを実行する**

以下のコマンドをコピーして貼り付け、Enterキーを押します。

```
curl -fsSL https://claude.ai/install.sh | bash
```

<!-- 画像: mac-terminal-install.png | 内容: Macのターミナルでcurlコマンドを実行してClaude Codeをインストールしている画面のスクリーンショット -->
![Macのターミナルでcurlコマンドを実行してClaude Codeをインストールしている画面](./images/mac-terminal-install.png)

Homebrewを使用する場合は、以下のコマンドでもインストールできます。

```
brew install --cask claude-code
```

ただし、Homebrewでインストールした場合は自動更新されません。

アップデートの際には `brew upgrade claude-code` を手動で実行する必要があります。

**手順3: インストールを確認する**

以下のコマンドを実行してバージョン番号が表示されれば、インストール完了です。

```
claude --version
```

<!-- 出典: https://code.claude.com/docs/ja/setup -->

### Linuxでのインストール手順

Linuxでも、ターミナルからコマンド1行でインストールできます。

**手順1: ターミナルでインストールコマンドを実行する**

以下のコマンドを実行してください。

```
curl -fsSL https://claude.ai/install.sh | bash
```

インストーラーがディストリビューションとアーキテクチャを自動検出し、適切なバイナリをダウンロードします。

**手順2: インストールを確認する**

以下のコマンドを実行してください。

```
claude --version
```

バージョン番号が表示されれば、インストールは成功です。

Alpine Linuxを使用している場合は、追加で `libgcc`、`libstdc++`、`ripgrep` のインストールが必要です。

以下のコマンドで追加パッケージをインストールしてください。

```
apk add libgcc libstdc++ ripgrep
```

<!-- 出典: https://code.claude.com/docs/ja/setup -->

## Claude Codeの初回認証と初期設定3ステップ

インストールが完了したら、Claude Codeを実際に使い始めるための初期設定を行います。

以下の3ステップで、すぐにClaude Codeを活用できる状態になります。

- ステップ1: claudeコマンドで初回起動し認証する
- ステップ2: VS Codeと連携する
- ステップ3: CLAUDE.mdでプロジェクト設定を作成する

### ステップ1　claudeコマンドで初回起動し認証する

ターミナル（Windowsの場合はGit Bash）を開き、以下のコマンドを実行してください。

```
claude
```

初回起動時には、自動的にブラウザが開いてClaudeの認証画面が表示されます。

<!-- 画像: claude-auth-browser.png | 内容: ブラウザに表示されたClaudeの認証画面のスクリーンショット。ログインボタンを強調 -->
![ブラウザに表示されたClaudeの認証画面でログインボタンを示した画面](./images/claude-auth-browser.png)

Claudeアカウントでログインし、認証を完了させてください。

認証が完了すると、ターミナルにClaude Codeの対話画面が表示されます。

ブラウザが自動で開かない場合は、ターミナルに表示されたURLを手動でコピーし、ブラウザに貼り付けてアクセスしてください。

WSL2を使用している場合は、以下のコマンドでブラウザのパスを設定すると、自動でブラウザが開くようになります。

```
export BROWSER="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
claude
```

<!-- 出典: https://code.claude.com/docs/ja/setup -->

### ステップ2　VS Codeと連携する

Claude CodeはターミナルだけでなくVS Codeの拡張機能としても利用できます。

VS Codeと連携することで、エディタ上で直接Claude Codeに指示を出せるようになります。

**拡張機能のインストール手順:**

1. VS Codeを開く
2. `Ctrl+Shift+X`（Macの場合は`Cmd+Shift+X`）で拡張機能パネルを開く
3. 検索欄に「Claude Code」と入力する
4. Anthropic社の公式拡張機能を選択し「Install」をクリックする

<!-- 画像: vscode-extension-install.png | 内容: VS Codeの拡張機能マーケットプレイスで「Claude Code」を検索し、Anthropic社の公式拡張機能が表示されている画面のスクリーンショット。Installボタンを強調 -->
![VS Codeの拡張機能マーケットプレイスでClaude Codeの公式拡張機能のInstallボタンを示した画面](./images/vscode-extension-install.png)

インストール後、エディター右上のSparkアイコン、またはステータスバー右下の「Claude Code」をクリックすると、Claude Codeのパネルが開きます。

コマンドパレット（`Ctrl+Shift+P` / `Cmd+Shift+P`）から「Claude Code: Open in New Tab」を選択して、新しいタブとして開くこともできます。

よく使うショートカットは以下のとおりです。

| 操作 | Mac | Windows/Linux |
|------|-----|---------------|
| エディターとClaude Code間のフォーカス切替 | `Cmd+Esc` | `Ctrl+Esc` |
| 新しいタブで開く | `Cmd+Shift+Esc` | `Ctrl+Shift+Esc` |
| 新しい会話を開始 | `Cmd+N` | `Ctrl+N` |

<!-- 出典: https://code.claude.com/docs/ja/vs-code -->

### ステップ3　CLAUDE.mdでプロジェクト設定を作成する

CLAUDE.mdとは、Claude Codeにプロジェクト固有のルールや情報を伝えるための設定ファイルです。

プロジェクトのディレクトリに移動し、以下のコマンドを実行すると、CLAUDE.mdが自動で生成されます。

```
cd プロジェクトのディレクトリ
claude
```

Claude Codeが起動したら、以下のコマンドを入力してください。

```
/init
```

`/init` コマンドを実行すると、Claude Codeがプロジェクトの構造を分析し、CLAUDE.mdを自動作成します。

CLAUDE.mdには以下のような情報が記載されます。

- プロジェクトの概要
- 使用している言語やフレームワーク
- ビルド・テストの実行コマンド
- コーディング規約

CLAUDE.mdを設定しておくと、Claude Codeがプロジェクトの文脈を理解した上でコードを生成するため、精度の高い出力が得られます。

<!-- CTA: 初期設定CTA（本文2） -->
<!-- CTA種類: SHIFT AI セミナー -->

## Claude Codeのインストールでよくあるエラーと対処法

Claude Codeのインストールや初回起動時にエラーが発生する場合があります。

以下では、よくあるエラーとその対処法をまとめています。

エラーが解決しない場合は、`claude doctor` コマンドを実行すると、インストール状態を自動で診断できます。

### 「command not found」と表示される場合

`claude` コマンドを実行した際に「command not found」と表示される場合は、インストール先のディレクトリがPATHに追加されていないことが原因です。

以下のコマンドで、PATHにインストール先を追加してください。

**Mac / Linuxの場合:**

```
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Zshを使用している場合は、`~/.bashrc` の部分を `~/.zshrc` に置き換えてください。

**Windowsの場合:**

Git Bashで以下のコマンドを実行してください。

```
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

コマンド実行後に `claude --version` を再度実行し、バージョン番号が表示されれば解決です。

<!-- 出典: https://code.claude.com/docs/ja/troubleshooting -->

### 認証画面が表示されない場合

`claude` コマンドを実行してもブラウザが自動で開かない場合は、以下の手順を試してください。

1. ターミナルに表示されたURLを手動でコピーし、ブラウザのアドレスバーに貼り付けてアクセスする
2. それでも認証できない場合は、`/logout` コマンドで一度サインアウトしてから、再度 `claude` を実行する

WSL2環境の場合は、以下のようにブラウザのパスを環境変数として設定してください。

```
export BROWSER="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
```

認証完了後に「403 Forbidden」エラーが表示される場合は、Claudeのサブスクリプション（ProプランまたはMaxプラン）がアクティブになっているか確認してください。

<!-- 出典: https://code.claude.com/docs/ja/troubleshooting -->

### Windows固有のエラーが出る場合

Windowsでは、以下のエラーが発生する場合があります。

**「Claude Code on Windows requires git-bash」と表示される場合:**

Git for Windowsがインストールされていません。

公式サイト（https://git-scm.com/downloads/win）からGit for Windowsをダウンロードしてインストールしてください。

**「irm is not recognized」と表示される場合:**

コマンドプロンプト（CMD）ではなくPowerShellを使用してください。

`irm` はPowerShell専用のコマンドです。

コマンドプロンプトを使用する場合は、以下の代替コマンドを実行してください。

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

**WSL環境でOS検出エラーが出る場合:**

WSLがWindows側のnpmを参照している可能性があります。

`which npm` コマンドを実行し、パスが `/mnt/c/` で始まっている場合はLinux側のnpmに切り替えてください。

2026年現在はネイティブインストーラーが推奨されているため、npmを使わずに `curl -fsSL https://claude.ai/install.sh | bash` でインストールすることで、この問題を回避できます。

<!-- 出典: https://code.claude.com/docs/ja/troubleshooting -->

### VS Code拡張機能が動作しない場合

VS CodeのClaude Code拡張機能が動作しない場合は、以下を確認してください。

**Sparkアイコンが表示されない場合:**

1. VS Codeのバージョンが1.98.0以上であることを確認する
2. エディターでファイルを1つ以上開く
3. コマンドパレット（`Ctrl+Shift+P` / `Cmd+Shift+P`）で「Developer: Reload Window」を実行する

**Claude Codeが応答しない場合:**

1. インターネット接続を確認する
2. コマンドパレットから「Claude Code: New Conversation」で新しい会話を開始する
3. ターミナルで `claude` コマンドを直接実行し、CLI版で動作するか確認する

CLI版では動作するがVS Code拡張機能では動作しない場合は、拡張機能を一度アンインストールしてから再インストールしてください。

<!-- 出典: https://code.claude.com/docs/ja/troubleshooting -->

## Claude Codeに関するよくある質問

### Claude Codeは無料で使えますか

Claude Code自体のダウンロードとインストールは無料です。

ただし、AI機能を利用するにはClaudeの有料プランへの加入が必要です。

最も手軽に始められるのはProプラン（月額20ドル、約3,000円）で、Claude Codeを含む全てのClaude製品を利用できます。

API従量課金を選択すれば、月額固定費なしで使用した分だけの支払いも可能です。

### Claude Codeはプログラミング初心者でも使えますか

Claude Codeは自然言語（日本語）で指示を出せるため、プログラミングの知識が少ない方でも利用できます。

「ToDoアプリを作って」「このコードのバグを修正して」のような日常的な表現で指示すれば、Claude Codeがコードの生成から実行までを自律的に進めます。

ただし、Claude Codeはターミナル上で動作するツールのため、以下の基本操作は事前に把握しておくとスムーズです。

- ターミナル（コマンドライン）の起動方法
- `cd` コマンドによるディレクトリ移動
- テキストの貼り付け（`Ctrl+V` / `Cmd+V`）

VS Codeの拡張機能を使えば、ターミナル操作に慣れていない方でもGUI上でClaude Codeを利用できます。

### CursorやGitHub Copilotとの違いは何ですか

Claude Code、Cursor、GitHub Copilotはいずれもコーディングを支援するAIツールですが、それぞれ設計思想が異なります。

| ツール | 種類 | 特徴 |
|--------|------|------|
| Claude Code | エージェント型 | 自然言語の指示から、コードの読み書き・ファイル操作・テスト実行まで自律的にタスクを完遂する |
| Cursor | エディタ統合型 | AI機能を組み込んだコードエディタ。エディタ上でAIとの対話やコード生成を行う |
| GitHub Copilot | コード補完型 | コーディング中にリアルタイムでコードの候補を提示する。エディタのプラグインとして動作する |

Claude Codeの最大の特徴は「エージェント型」である点です。

GitHub Copilotが「次の1行」を提案するのに対し、Claude Codeは「タスク全体」を自律的に遂行します。

「ログイン機能を作って」と指示すれば、必要なファイルの作成からコードの実装、テストの実行までを一連の流れで処理します。

一方、Cursorはエディタ自体にAI機能が統合されているため、エディタの操作性を重視する方に向いています。

目的に応じて使い分けるか、併用することで開発効率をさらに高められます。

<!-- 内部リンク候補: 「Cursor 使い方」記事（※公開済みの場合） -->

## Claude Codeをインストールしてすぐにでもコーディングの効率化を始めよう

本記事では、Claude Codeのインストール方法をWindows・Mac・Linuxの全OS対応で解説しました。

記事の要点をまとめます。

- Claude Codeは、Anthropic社が提供する自律型AIコーディングツールで、自然言語の指示からコード生成・ファイル操作・テスト実行まで自律的に行える
- 2026年3月現在、ネイティブインストーラーが推奨されており、Node.js不要でコマンド1行でインストールが完了する
- 利用にはClaudeの有料プラン（Proプラン月額20ドル〜）への加入が必要
- インストール後は、初回認証・VS Code連携・CLAUDE.md作成の3ステップで、すぐに開発を始められる
- 「command not found」などのエラーは、PATH設定やGit for Windowsのインストールで解決できる

Claude Codeを導入すれば、面倒なコーディング作業をAIに任せ、より創造的な業務に集中できるようになります。

ただし、Claude Codeのインストールは「AIを活用した開発の第一歩」にすぎません。

AIツールを使いこなし、副業やキャリアアップに繋げるには、AIの活用スキルを体系的に学ぶことが重要です。

<!-- CTA: まとめCTA（本文3） -->
<!-- CTA種類: SHIFT AI セミナー -->
