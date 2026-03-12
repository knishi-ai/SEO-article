# 共有時に送るファイルリスト

## 送るもの

```
共有フォルダ/
├── create-article-tool/     ← プロジェクト本体
│   ├── CLAUDE.md
│   ├── .gitignore
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── config.js
│   │   ├── sheets.js
│   │   └── test-connection.js
│   ├── workflow/
│   │   └── article-flow.md
│   ├── articles/
│   │   └── KW「claude code インストール」/
│   │       └── article.md
│   ├── scripts/
│   │   └── archive/
│   │       ├── factcheck-fix.js
│   │       ├── fix-rewrite.js
│   │       └── read-hyperlinks.js
│   └── docs/
│       ├── report.md
│       ├── setup-guide.md
│       └── sharing-checklist.md（このファイル）
│
├── commands/                ← Claude Code スキル
│   ├── s.md
│   ├── create-article.md
│   ├── rewrite-article.md
│   ├── create-breaking-article.md
│   ├── regulation.md
│   ├── regulation_research.md
│   ├── research-memo-guide.md
│   └── writing-style-guide.md
│
├── rules/                   ← Claude Code ルール
│   └── coding-rules.md
│
└── credentials.json         ← Google OAuth（※別途セキュアに共有）
```

## 送らないもの

| ファイル | 理由 |
|----------|------|
| `node_modules/` | `npm install` で再生成される |
| `token.json` | 個人のOAuthトークン。各自で `npm run auth` して生成 |
| `.git/` | ローカルのGit履歴。受け取り側で初期化すればよい |
| `client_secret_*.json` | credentials.json と重複していたため削除済み |

## credentials.json の共有について

OAuth クライアント認証情報が含まれるため、以下のいずれかの方法でセキュアに共有してください：
- 1Password / パスワードマネージャー経由
- 暗号化ZIP
- 対面での直接受け渡し

**Slack / メール本文への貼り付けは避けてください。**
