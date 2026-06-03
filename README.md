# Haruto Miyakawa — Portfolio

宮川陽翔のポートフォリオサイト — Next.js / TypeScript / Tailwind CSS

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

## 概要

Next.js（App Router）で構築した多ページ構成のポートフォリオサイトです。以下の6ページを持ちます。

- **Home**（`/`）
- **Works 一覧**（`/works`） / **Works 詳細**（`/works/[slug]`）
- **Research 一覧**（`/research`） / **Research 詳細**（`/research/[slug]`）
- **About**（`/about`）

表示テキスト・プロジェクト・論文・プロフィールといったコンテンツは `content/content.data.ts` に型付きで集約されており、データを追記することで作品や論文を増やせる設計です。

## 主な機能

実装済みの機能のみを記載します。

- **App Router による多ページルーティング** — 上記6ページを `app/` 配下のファイルベースルーティングで構成
- **静的生成（SSG）** — 詳細ページ（`/works/[slug]` / `/research/[slug]`）は `generateStaticParams` で対象スラッグを静的生成
- **データ駆動のコンテンツ管理** — 文言・作品・論文・プロフィールを `content/content.data.ts` に集約し、各ページがそれを参照
- **クライアントサイドの絞り込み** — Works はカテゴリ／技術タグ、Research はステータスで一覧をフィルタ
- **ダーク固定 UI** — テーマ切替は持たない（`next-themes` 不使用）。配色は `app/globals.css` の `@theme` / CSS 変数で管理
- **レスポンシブ** — メディアクエリでサイドバー・グリッドが画面幅に応じて折りたたみ

## 技術スタック

`package.json` で宣言している依存に基づきます。

| 領域 | 技術 |
| --- | --- |
| フレームワーク | Next.js 15（App Router） |
| UI ライブラリ | React 19 |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS v4（`@tailwindcss/postcss`）／ `app/globals.css` の `@import "tailwindcss"` と `@theme` |
| フォント | `next/font`（Space Grotesk / Zen Kaku Gothic New / JetBrains Mono） |
| Lint | ESLint 8 + `eslint-config-next` 15 |

## ディレクトリ構成

主要なものを抜粋します。

```text
.
├─ app/
│  ├─ layout.tsx           # 共通レイアウト（サイドバー＋フォント読み込み）
│  ├─ globals.css          # デザイントークン / Tailwind v4 / 全スタイル
│  ├─ page.tsx             # Home
│  ├─ works/
│  │  ├─ page.tsx          # Works 一覧
│  │  └─ [slug]/page.tsx   # Works 詳細（ケーススタディ）
│  ├─ research/
│  │  ├─ page.tsx          # Research 一覧
│  │  └─ [slug]/page.tsx   # Research 詳細（論文）
│  └─ about/page.tsx       # About
├─ components/             # Sidebar, WorksExplorer, ResearchGrid, Gallery, SectionHead,
│                          # CardLink, Lines, mockups, icons
├─ content/
│  └─ content.data.ts      # 全ページの表示データ（型付き・正本）
├─ public/assets/          # 画像（アバター / ヒーロー / ランタン / 各種アイコン）
├─ next.config.mjs
├─ postcss.config.mjs      # @tailwindcss/postcss
└─ tsconfig.json           # パスエイリアス @/* → ./
```

## セットアップ

```bash
git clone git@github.com:haruto-miyakawa/haruto-miyakawa-portfolio-HP.git
cd haruto-miyakawa-portfolio-HP
npm install
npm run dev   # http://localhost:3000
```

利用できる npm scripts は次の通りです。

| script | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバを起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | ビルド済みアプリを起動 |
| `npm run lint` | ESLint を実行 |

## コンテンツ編集

コンテンツの正本は `content/content.data.ts` です。レイアウトやコンポーネントを変えずに、データの追記だけで項目を増やせます。

- **作品を追加** — `works` 配列に1件追加。詳細ページを持たせる場合は `hasCaseStudy: true` とし、`caseStudies` に同じ `slug` の詳細データを追加する（`generateStaticParams` が対象スラッグを自動で静的生成）
- **論文を追加** — `publications` 配列に1件追加し、詳細を `paperDetails` に同じ `slug` で追加する
- **Home / About / プロフィール** — `homeHero` / `homeAbout` / `homeTech` / `about` / `profile` 等を編集

型（`Work` / `CaseStudy` / `Publication` / `PaperDetail` / `Profile` など）は同ファイルに定義されています。

## ライセンス

このリポジトリは個人ポートフォリオです。コードの閲覧は自由ですが、再利用・複製は想定していません（All rights reserved）。
