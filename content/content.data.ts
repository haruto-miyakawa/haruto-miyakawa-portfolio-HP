/**
 * サイト全体の表示データ。
 * 文言は確定版デザイン（添付HTML）から抽出。将来差し替えやすいよう型付きで集約する。
 * 改行は "\n" で表現し、表示側で <br/> に変換する（nl2br ヘルパー）。
 */

/* ============ 共通プロフィール / 連絡先 ============ */
export interface Profile {
  name: string;
  nameJa: string;
  roleLines: string[];
  email: string;
  githubUrl: string;
  xUrl: string;
  copyright: string;
}

export const profile: Profile = {
  name: "Haruto Miyakawa",
  nameJa: "宮川 陽翔（みやかわ はると）",
  roleLines: ["Web Engineer /", "AI Builder"],
  email: "haruto.miyakawa.dev@gmail.com",
  githubUrl: "https://github.com/haruto-miyakawa",
  xUrl: "https://x.com/myfuns101010",
  copyright: "© 2024 Haruto Miyakawa",
};

/* ============ サイドバー ナビ ============ */
export type NavKey = "home" | "works" | "research" | "about";
export interface NavItem {
  key: NavKey;
  label: string;
  href: string;
}
export const navItems: NavItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "works", label: "Works", href: "/works" },
  { key: "research", label: "Research", href: "/research" },
  { key: "about", label: "About", href: "/about" },
];

/* ============ Home : ヒーロー ============ */
export const homeHero = {
  hello: "Hello, I'm Haruto.",
  headingLines: ["現場の課題を、", "動くプロダクトに。"],
  jp: "",
  body:
    "情報系の学部2年。国際会議 IIAI AAI Winter 2025（IEEE Computer Society 掲載）の共著研究に参加。量販店の現場発ツールから AI 共同執筆エディタ「つむぐ」まで、企画から実装までひとりでやり切ります。",
  tags: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL"],
};

/* ============ 作品（プロジェクト） ============ */
export type WorkMock = "dash" | "travel" | "chat" | "code" | "analytics" | "portfolio";
export type WorkCategory = "web" | "ai" | "saas" | "tool" | "other";

export interface FeaturedWork {
  badge: string;
  title: string;
  description: string;
  tags: string[];
  mock: WorkMock;
  /** 実スクショのサムネ（あれば mock タイルより優先） */
  thumb?: string;
  /** Game mode quest badge — mirrors the corresponding Work entry */
  gameStatus?: "complete" | "in-progress";
}

export interface Work {
  slug: string;
  badge: string;
  category: WorkCategory;
  title: string;
  description: string;
  tags: string[];
  mock: WorkMock;
  /** 実スクショのサムネ（あれば mock タイルより優先） */
  thumb?: string;
  /** カード右下リンクのラベル */
  footRight: "Case Study" | "GitHub";
  /** 詳細（ケーススタディ）ページを持つか */
  hasCaseStudy: boolean;
  /** Game mode quest badge — derived from actual work status, no fabricated data */
  gameStatus: "complete" | "in-progress";
}

/** Home の Featured Works（全作品）。works 本体と一致させる */
export const featuredWorks: FeaturedWork[] = [
  {
    badge: "Web",
    title: "つむぐ",
    description: "note creators向けのAI共同執筆エディタ。書き手のリズムを崩さず、隣で支える。",
    tags: ["Next.js", "TypeScript", "React", "Tiptap", "Claude API", "Tailwind CSS"],
    mock: "dash",
    thumb: "/projects/tsumugu/home.webp",
    gameStatus: "in-progress",
  },
  {
    badge: "Tool",
    title: "講義議事録ジェネレーター",
    description: "音声をWhisperで文字起こしし、Geminiで議事録に整形するツール。聴くことに集中できる。",
    tags: ["Python", "Whisper", "Gemini API"],
    mock: "travel",
    thumb: "/projects/lecture-minutes/editor.webp",
    gameStatus: "complete",
  },
  {
    badge: "AI",
    title: "家電ガイド",
    description: "条件と好みから最適な家電を案内するPWA。制約付きAIで正確さを担保。",
    tags: ["Next.js", "TypeScript", "Supabase", "Gemini API", "PWA"],
    mock: "chat",
    thumb: "/projects/guide-manual/list.webp",
    gameStatus: "complete",
  },
];

/** Works 一覧のカード（実在3プロジェクト） */
export const works: Work[] = [
  {
    slug: "tsumugu",
    badge: "Web",
    category: "web",
    title: "つむぐ",
    description: "note creators向けのAI共同執筆エディタ。書き手のリズムを崩さず、隣で支える。",
    tags: ["Next.js", "TypeScript", "React", "Tiptap", "Claude API", "Tailwind CSS"],
    mock: "dash",
    thumb: "/projects/tsumugu/home.webp",
    footRight: "Case Study",
    hasCaseStudy: true,
    gameStatus: "in-progress",
  },
  {
    slug: "lecture-minutes",
    badge: "Tool",
    category: "tool",
    title: "講義議事録ジェネレーター",
    description: "音声をWhisperで文字起こしし、Geminiで議事録に整形するツール。聴くことに集中できる。",
    tags: ["Python", "Whisper", "Gemini API"],
    mock: "travel",
    thumb: "/projects/lecture-minutes/editor.webp",
    footRight: "Case Study",
    hasCaseStudy: true,
    gameStatus: "complete",
  },
  {
    slug: "guide-manual",
    badge: "AI",
    category: "ai",
    title: "家電ガイド",
    description: "条件と好みから最適な家電を案内するPWA。制約付きAIで正確さを担保。",
    tags: ["Next.js", "TypeScript", "Supabase", "Gemini API", "PWA"],
    mock: "chat",
    thumb: "/projects/guide-manual/list.webp",
    footRight: "Case Study",
    hasCaseStudy: true,
    gameStatus: "complete",
  },
];

export interface WorkCategoryDef {
  key: "all" | WorkCategory;
  label: string;
}
export const workCategories: WorkCategoryDef[] = [
  { key: "all", label: "すべて" },
  { key: "web", label: "Webアプリ" },
  { key: "ai", label: "AIプロダクト" },
  { key: "saas", label: "SaaS" },
  { key: "tool", label: "ツール・ライブラリ" },
  { key: "other", label: "その他" },
];

/* ============ Works 詳細（ケーススタディ） ============ */
/** 課題 / アプローチ / 成果 ブロック（見出しは任意） */
export interface CsoBlock {
  heading?: string;
  body: string;
  points?: string[];
  facts?: string[];
}
/** 濃いケーススタディの「技術判断」1件（取った選択＝見出し＋本文。両モード共通）。 */
export interface CaseDecision {
  /** 取った選択（見出し）。PRO/GAME 共通。 */
  heading: string;
  body: string;
}
/** 濃いケーススタディ（Problem→Approach→Role→Decisions→Outcome）。
 *  章見出しは labels.ts ＋ dual-span で PRO/GAME 切替。本文（事実）は両モード共通。 */
export interface CaseNarrative {
  problem: string;
  approach: string;
  /** Approach 章見出し PRO ラベルの上書き（既定: LABEL_CN_APPROACH_PRO）。作品ごとに章名が異なる場合に使用。 */
  approachLabelPro?: string;
  /** Approach セクションに差し込む実スクショ（plain <img> で描画。alt は可視キャプションも兼ねる）。
   *  w/h は元画像の実寸（width/height 属性に出力し、アスペクト比確定で CLS を防ぐ）。 */
  approachImages?: { src: string; alt: string; w: number; h: number }[];
  role: string;
  /** Role 章見出し PRO ラベルの上書き（既定: LABEL_CN_ROLE_PRO）。 */
  roleLabelPro?: string;
  /** Key Decisions（4判断）。各判断は「見出し＋本文」。 */
  decisions: CaseDecision[];
  /** 4判断の後に置く締めの一段落（任意）。 */
  decisionsOutro?: string;
  outcome: string;
}
/** ヒーロー/連絡先で使う外部リンク */
export interface CaseStudyLink {
  kind: "demo" | "github" | "zenn";
  label: string;
  href: string;
}
export interface CaseStudy {
  slug: string;
  categoryLabel: string;
  title: string;
  lead: string;
  /** ヒーロー本文（無ければ非表示） */
  body?: string;
  /** ブラウザ風モックのURL表記（demo確定までは未指定） */
  url?: string;
  shotMock: ShotMock;
  /** メタ帯。icon は icons レジストリのキー */
  meta: { label: string; value: string; sub?: string; icon: string; status?: boolean }[];
  /** TL;DR（CSO 構成の作品用。narrative を持つ作品では未指定） */
  tldr?: string;
  challenge?: CsoBlock;
  solution?: CsoBlock;
  outcome?: CsoBlock;
  /** 濃いケーススタディ。あれば TL;DR + CSO の代わりにこの物語を描画する。 */
  narrative?: CaseNarrative;
  /** 概要レール。icon は icons レジストリのキー */
  overview: { label: string; value: string; icon: string; link?: boolean; href?: string; status?: boolean }[];
  highlights: string[];
  relatedLinks: { label: string; href: string }[];
  /** ヒーローを実スクショのカルーセルにする場合の画像（あれば CSSモックの代わりに表示） */
  heroImages?: { src: string; caption: string }[];
  /** 実スクショがある場合のみ。無ければギャラリーセクション自体を非表示。
   *  src（実画像パス）があれば img として表示、無ければ mock（CSSモック）で描画 */
  gallery?: { title: string; desc: string; src?: string; mock?: ShotMock }[];
  /** 機能ブレイクダウンがある場合のみ。無ければ「主な機能」セクションを非表示 */
  features?: { title: string; desc: string; tags: string[]; mock: ShotMock; reverse: boolean }[];
  stack: { mark: string; name: string }[];
  /** ヒーローCTA（先頭がプライマリ） */
  links: CaseStudyLink[];
  /** 連絡先CTAの「GitHubで見る」先 */
  github: string;
}

export type ShotMock = "chat" | "dashboard" | "upload" | "cite" | "phone";

export const caseStudies: Record<string, CaseStudy> = {
  /* 1. つむぐ */
  tsumugu: {
    slug: "tsumugu",
    categoryLabel: "Webアプリ",
    title: "つむぐ",
    lead: "AIに書かせるのではなく、書き手の思考を止めない。自分の執筆の痛みから生まれた、AI共同執筆エディタ。",
    shotMock: "dashboard",
    meta: [
      { label: "Role", value: "個人開発", icon: "user" },
      { label: "体制", value: "個人 (Solo)", icon: "people" },
      { label: "種類", value: "Webアプリ", icon: "monitor" },
      { label: "ステータス", value: "v2.0 完成", sub: "自分用に運用中", icon: "checkCircle", status: true },
      { label: "スタック", value: "Next.js, TypeScript,\nTiptap, Claude API 他", icon: "codeStack" },
    ],
    narrative: {
      problem:
        "知名度を広げるために note での発信を始めたものの、一本書くたびに数時間が溶けていくのが苦痛でした。特に二つの工程が重荷だった。ひとつは、リポジトリや手元の素材を「読みやすい記事の形」に整える整形作業。もうひとつは、書き上げた後に毎回 AI へ添削を投げ、表現を直していた往復です。これを毎回手作業でやる代わりに、整形と推敲を執筆フローへ最初から組み込んだツールが欲しい——つまり私自身が、つむぐの最初のユーザーでした。",
      approach:
        "既存の AI ライティングツールの多くは「テーマを渡すと丸ごと書いてくれる」方向に振れています。つむぐはその逆を狙いました。主導権は常に書き手に残す。AI は変えたい箇所だけを受け取って書き換え、構成については批評ではなく観察を返す。マスコット「つむぎ」は派手なエフェクトを持たず、AI の状態（待機・思考・執筆・完了）を mood として静かに可視化するだけの黒子に徹します。「AIを魔法のように振る舞わせると、ユーザーがツールに振り回される」——この一点を避けることが、設計全体の背骨になっています。",
      role:
        "個人開発です。企画と設計の草稿は自分、その草稿を読みやすい形に整えるのを Claude、実装を Claude Code、デザインモックを自分と ChatGPT で作り Claude Design で仕上げる、という分担で進めました。AI を道具として使い分けつつ、「何を作るか・どこで妥協しないか」の判断はすべて自分が下しています。",
      decisions: [
        {
          heading: "エディタに Tiptap を選んだ — 実装の重さは AI に任せ、人間は「土台の正しさ」を選んだ",
          body: "正直に言えば、着手時点で Tiptap の存在すら知りませんでした。自分で深く習熟したわけでもありません。それでも採用できたのは、実装が多少重くても Claude Code が書き切ってくれるという前提があったからです。だからこそ私は「自分が書きやすいか」ではなく、土台として正しいかだけで選べました。ProseMirror の構造化 DOM を保ちながら Headless で Tailwind と干渉しない——この性質は、将来 Phase 7 以降で画像挿入や続編生成を足すときに効きます。汎用性の低い土台を選んでいたら作り直しになる。実装の労力を AI が肩代わりしてくれる時代だからこそ、人間の判断は「目先の書きやすさ」から「長期の拡張耐性」へ寄せられる——その判断をした選定でした。",
        },
        {
          heading: "AI に Claude API（Sonnet）を選んだ — 安い選択肢を知った上で、品質に投資した",
          body: "Gemini API の方が安く、ローカルモデルを動かせば費用はゼロにできることは分かっていました。それでも Claude を選んだのは、つむぐの目玉が「文章作成」だからです。エッセイ調の日本語を生成させたとき、語の選び方が最も落ち着いていたのが Claude でした。コア機能の品質を価格で妥協したら、ツールそのものの存在意義が薄れる。加えて、tool_use でスタイル解析や記事生成のレスポンスを JSON Schema に縛れること、SSE ストリーミングが安定していることも、手作業のパースを消すうえで効きました。",
        },
        {
          heading: "ブロックタイプを保持したまま置換する — 「当たり前」を担保するための実装",
          body: "AI つむぎは、選択した段落だけを受け取って書き換えます。ここで素朴に実装すると、H2 見出しに相談したのに普通の段落になって返ってくる、といった崩れが起きる。これを防ぐため、ProseMirror の depth で doc 直下のブロックタイプを検出し、置換 HTML を組み立てる際に親要素（blockquote・list・heading）を壊さないよう分岐させました。「見出しに相談したら見出しのまま戻る」という、ユーザーから見れば当然の体験を、構造を理解した実装で裏から支えています。",
        },
        {
          heading: "CSS Modules へ移行せず Tailwind v4 を続投した — 定石より、意図を取った",
          body: "開発途中で CSS Modules への移行を検討しました。けれど Tailwind v4 の @theme 機能だけで「トークンの一元定義」と「型のように縛られたユーティリティ」の両方が成立すると判断し、移行を見送りました。色を #XXXXXX で直書きする逃げ道を塞ぐと、デザインの一貫性は自然に保たれる。「移行するのが定石だから」ではなく「この機能で意図が達成できるか」で決めた選択です。",
        },
      ],
      decisionsOutro:
        "——これら四つの判断は、すべて同じ一本の軸で貫かれています。目先の楽・安・定石よりも、長期の正しさを取る。これは作品に掲げた「妥協なき創作のために、技術を磨く」というモットーを、実装の現場で守った結果です。",
      outcome:
        "v2.0 まで完成し、Phase 1 から 10 までのロードマップを構造化しています。デザインは v2.0 で全面刷新し、独自カラートークン・Noto Serif JP を基調にした組版・オリジナルマスコットを実装しました。現時点では商用化や一般公開は狙わず、ポートフォリオであり自分専用の執筆ツールとして設計しています。利用者数を競う作品ではなく、自分の課題を起点に、技術選定の判断を一つずつ言語化して積み上げた「設計の作品」です。",
    },
    overview: [
      { label: "役割", value: "個人開発", icon: "user" },
      { label: "種類", value: "Webアプリ", icon: "monitor" },
      { label: "ステータス", value: "v2.0 完成", icon: "checkCircle", status: true },
      { label: "リポジトリ", value: "GitHub", icon: "link", link: true, href: "https://github.com/haruto-miyakawa/tsumugu" },
    ],
    highlights: [
      "選択範囲ベースの軽量な提案UI（ブロックリプレース）",
      "Claude API＋ストリーミングで「待たせない」応答",
      "マスコット『つむぎ』の5表情で、AIの介入を和らげる",
    ],
    relatedLinks: [{ label: "GitHub リポジトリ", href: "https://github.com/haruto-miyakawa/tsumugu" }],
    heroImages: [
      { src: "/projects/tsumugu/editor.webp", caption: "エディタ — AIの提案をブロック単位で挿入（ブロックリプレース）" },
      { src: "/projects/tsumugu/home.webp", caption: "ホーム — 下書きの一覧管理とテーマからの自動生成" },
      { src: "/projects/tsumugu/preview.webp", caption: "プレビュー — note公開前の仕上がり確認" },
    ],
    stack: [
      { mark: "N", name: "Next.js 16 (App Router)" },
      { mark: "R", name: "React 19" },
      { mark: "TS", name: "TypeScript 5" },
      { mark: "~", name: "Tailwind CSS v4" },
      { mark: "T", name: "Tiptap 3" },
      { mark: "C", name: "Claude API (Sonnet)" },
      { mark: "V", name: "Vitest" },
    ],
    links: [{ kind: "github", label: "GitHub", href: "https://github.com/haruto-miyakawa/tsumugu" }],
    github: "https://github.com/haruto-miyakawa/tsumugu",
  },

  /* 2. 講義議事録ジェネレーター */
  "lecture-minutes": {
    slug: "lecture-minutes",
    categoryLabel: "ツール・ライブラリ",
    title: "講義議事録ジェネレーター",
    lead: "聞き逃した講義も、後から確実に拾い直す。AIの「もっともらしい嘘」を仕組みで捕まえる、ローカル完結の文字起こしツール。",
    shotMock: "chat",
    meta: [
      { label: "Role", value: "個人開発", icon: "user" },
      { label: "体制", value: "個人 (Solo)", icon: "people" },
      { label: "種類", value: "ツール・ライブラリ", icon: "monitor" },
      { label: "ステータス", value: "公開（OSS）", icon: "checkCircle", status: true },
      { label: "スタック", value: "Python, Whisper, Gemini API", icon: "codeStack" },
    ],
    narrative: {
      problem:
        "きっかけは二つありました。ひとつは、大学で共同研究が始まり、ミーティングの内容を後から確認できるようにしたかったこと。もうひとつは、講義中に聞き逃した——資料に載っていない口頭の補足を、後から確実に拾い直したかったことです。調べてみると、既存のクラウド型文字起こしツールには二つの根本的な問題がありました。コスト——API の従量課金では、長時間の講義を毎日処理していると費用がかさみ、学生が使い続けられない。そしてハルシネーション——専門用語や固有名詞の多い講義では、LLM がもっともらしい誤った内容を生成し、それをそのまま試験勉強に使うとむしろ逆効果になる。この二つを同時に解くツールが欲しくて、自分で作りました。",
      approachLabelPro: "どう解いたか",
      approach:
        "音声ファイルをアップロードすると、ローカルの GPU で動く Whisper が文字起こしし、Gemini 2.5 Flash が議事録の形に整えます。文字起こしはローカル実行なのでクラウド従量課金が発生せず、長時間講義を何本処理してもゼロコスト。さらに講義資料（PDF）を AI に同時に渡して専門用語の精度を補正し、誤認識を自動で検知したら精度優先の設定で処理をやり直します。生成された議事録はアプリ内で直接編集でき、PDF や Markdown で書き出せます。",
      approachImages: [
        { src: "/projects/lecture-minutes/home.webp", alt: "ホーム画面。音声ファイル（mp3 / m4a）をドロップしてローカル処理を開始する", w: 1440, h: 774 },
        { src: "/projects/lecture-minutes/transcribe.webp", alt: "文字起こし画面。ローカル GPU の Whisper がタイムスタンプ付きでテキスト化する", w: 1440, h: 774 },
        { src: "/projects/lecture-minutes/editor.webp", alt: "議事録画面。Gemini が見出し・要点に整形した議事録をアプリ内で編集し、PDF / Markdown で書き出せる", w: 1440, h: 774 },
      ],
      role:
        "個人開発です。これまでの「つむぐ」「家電ガイド」と同じく、Claude Code との協働だけで開発しました。同じ開発スタイルで、執筆支援・接客支援・音声処理という異なる領域のアプリを作っています。",
      decisions: [
        {
          heading: "ハルシネーションを仕組みで検知する — AI の誤りを鵜呑みにしない",
          body: "このツールの一番の肝です。Whisper は無音区間や不明瞭な音声に対して、定型文を繰り返したり、ありもしない内容をもっともらしく出力することがあります。試験勉強に使う議事録でこれが起きると致命的です。そこで、三つの条件——定型文フレーズの一致、音声長に対して出力文字数が極端に少ない、無音確率（no_speech_prob）の平均が 0.7 を超える——のいずれかで誤認識を検知したら、精度優先の設定（condition_on_previous_text=False など）で自動的にやり直す仕組みを入れました。ポイントは、この精度優先設定を通常時には使わないことです。常に適用すると通常時の精度がかえって落ちるため、検知したときだけフォールバックとして発動させる。AI の出力を信頼しきらず、誤りを後段で捕まえて補正するという考え方を、文字起こしの品質保証として実装した部分です。",
        },
        {
          heading: "ローカル Whisper — コストを設計の前提に置いた",
          body: "文字起こしには、クラウドの Whisper API ではなくローカル実行の Whisper を選びました。API は 1 分あたり約 0.006 ドル。2 時間の講義を週 15 本も処理すれば、月に数千円かかります。学生が毎日使い続けるツールでこの金額は重い。手元に CUDA 対応の GPU があったので、ローカルで動かせばゼロコスト・無制限になる。「安く速く」より一段手前の、「そもそも継続して使えるか」を最優先した判断です。",
        },
        {
          heading: "Gemini と RAG — 用途に合わせた使い分けと、幻覚の抑制",
          body: "議事録の整形には Gemini 2.5 Flash を選びました。整形という用途では品質の差が小さく、コストは Claude のおよそ五分の一に収まり、100 万トークンの長いコンテキストが長時間講義の文字起こしを一度に扱えるからです。さらに、講義資料の PDF を整形時に同時に渡すことで、外部のベクトルデータベースを用意せずに専門用語の文脈を AI に与え、固有名詞の取り違えを抑えました。（文章エディタ「つむぐ」では日本語の質を最優先して Claude を選び、こちらでは用途とコストで Gemini を選ぶ——コア機能が何かによって最適な AI は変わる、という使い分けです。）",
        },
        {
          heading: "SSE で進捗を可視化する — 長い処理を待てる UX に",
          body: "Whisper は別の Python プロセスとして動くため、Node.js 側から処理の進捗を直接知ることができません。何分も無言で待たされるのは、長時間の文字起こしでは苦痛です。そこで Whisper の進捗表示（tqdm）に手を入れて、進捗を JSON として標準出力に流し、それを Node.js が SSE（Server-Sent Events）に変換してブラウザにリアルタイム表示する構成にしました。WebSocket より実装が軽量で、この一方向の進捗通知には十分です。",
        },
      ],
      outcome:
        "実際の大学講義で継続的に使い、当時は小テストで安定して点を取れていました。今は、ローカル Whisper が GPU を占有して研究作業と競合するため、毎回の講義ではなく期末前に講義内容をまとめ直す使い方へ切り替えています。ゼロコストと引き換えに GPU を使うという選択の帰結を、運用の側で調整した形です。開発の過程は記事として公開し、自分の学習効率のために作ったツールが、そのまま発信の題材にもなっています。",
    },
    overview: [
      { label: "役割", value: "個人開発", icon: "user" },
      { label: "種類", value: "ツール・ライブラリ", icon: "monitor" },
      { label: "ステータス", value: "公開（OSS）", icon: "checkCircle", status: true },
      { label: "リポジトリ", value: "GitHub", icon: "link", link: true, href: "https://github.com/haruto-miyakawa/lecture-minutes" },
    ],
    highlights: [
      "Whisper文字起こし＋Geminiで議事録に自動整形",
      "コピー / .txt / .md / PDF で出力",
      "ハルシネーション再解析・Whisperモデル選択などの設定",
    ],
    relatedLinks: [
      { label: "GitHub リポジトリ", href: "https://github.com/haruto-miyakawa/lecture-minutes" },
      { label: "Zenn 記事", href: "https://zenn.dev/haruto_miyakawa/articles/4b7754712b7585" },
    ],
    heroImages: [
      { src: "/projects/lecture-minutes/editor.webp", caption: "議事録 — Geminiが見出し・要点・キーワードに自動整形（編集 / PDF / .md 出力）" },
      { src: "/projects/lecture-minutes/transcribe.webp", caption: "文字起こし — Whisperでタイムスタンプ付きにテキスト化（コピー / .txt 出力）" },
      { src: "/projects/lecture-minutes/home.webp", caption: "ホーム — 音声ファイルをドロップして処理を開始（mp3 / m4a・複数同時対応）" },
      { src: "/projects/lecture-minutes/settings.webp", caption: "設定 — Whisperモデル・議事録テンプレート・話者分離・処理時間帯を調整" },
      { src: "/projects/lecture-minutes/result.webp", caption: "処理キュー — アップロードした音声を順次処理（文字起こし → 議事録生成）" },
    ],
    stack: [
      { mark: "N", name: "Next.js 16 (App Router)" },
      { mark: "TS", name: "TypeScript 5" },
      { mark: "~", name: "Tailwind CSS v4" },
      { mark: "Py", name: "Python 3" },
      { mark: "W", name: "OpenAI Whisper (large-v3, local)" },
      { mark: "G", name: "Google Gemini 2.5 Flash" },
      { mark: "SD", name: "simple-diarizer" },
      { mark: "S", name: "SSE" },
    ],
    links: [
      { kind: "github", label: "GitHub", href: "https://github.com/haruto-miyakawa/lecture-minutes" },
      { kind: "zenn", label: "Zenn", href: "https://zenn.dev/haruto_miyakawa/articles/4b7754712b7585" },
    ],
    github: "https://github.com/haruto-miyakawa/lecture-minutes",
  },

  /* 3. 家電ガイド */
  "guide-manual": {
    slug: "guide-manual",
    categoryLabel: "AIプロダクト",
    title: "家電ガイド",
    lead: "自分が新人だったとき、商品知識がなくてお客様に迷惑をかけた。その失敗を、新人全員のために先回りして解いたアプリ。",
    shotMock: "phone",
    meta: [
      { label: "Role", value: "個人開発", icon: "user" },
      { label: "体制", value: "個人 (Solo)", icon: "people" },
      { label: "種類", value: "AIプロダクト", icon: "monitor" },
      { label: "ステータス", value: "公開", sub: "PWA", icon: "checkCircle", status: true },
      { label: "スタック", value: "Next.js, TypeScript,\nSupabase, Gemini API 他", icon: "codeStack" },
    ],
    narrative: {
      problem:
        "家電量販店で働き始めたころ、商品知識が乏しく、お客様に正確な情報をスムーズにご案内できず、ご迷惑をおかけしてしまったことがありました。これは私個人の問題ではなく、新人スタッフのほぼ全員が通る道です。経験を積めばいずれ解決するとはいえ、その「いずれ」までの間にお客様を待たせ続けるのは違う。なら、知識の差を仕組みで先回りして埋められないか——その問いがこのアプリの出発点でした。",
      approachLabelPro: "どう解いたか",
      approach:
        "管理者が商品の型番や URL を入力するだけで、AI がメーカーページからスペック・接客トーク・売りポイントを自動抽出し、スタッフのタブレットにリアルタイムで反映されます。スタッフ側は、接客トークの例、専門用語のわかりやすい言い換え、複数機種の横並び比較、そしてお客様の条件を聞きながら最適な一台を絞り込む「おすすめウィザード」を、接客のその場で使えます。新人でも、ベテランの知識を借りながらお客様の前に立てる状態をつくることを狙いました。",
      approachImages: [
        { src: "/projects/guide-manual/list.webp", alt: "スタッフアプリの商品一覧画面。型番・メーカーで絞り込み、複数機種を選んで比較に進める", w: 1440, h: 708 },
        { src: "/projects/guide-manual/compare.webp", alt: "比較画面。複数機種のスペックを軸ごとに横並びにして、違いを一目で確認できる", w: 1440, h: 708 },
        { src: "/projects/guide-manual/wizard.webp", alt: "おすすめウィザード。お客様の条件を聞きながら回答すると、最適な一台と理由を提示する", w: 1440, h: 708 },
      ],
      roleLabelPro: "役割分担と、これが「最初の一歩」だった意味",
      role:
        "個人開発です。そして、これは私が初めて本格的に作ったアプリでした。プログラミングを十分に学んでから着手したのではなく、現場で感じた課題が先にあり、それを解くために Claude Code との協働だけで開発を進めました。型番入力から AI 抽出、Supabase でのデータ連携、管理者アプリとスタッフアプリの二本立てまで——未経験の状態から実用を目指せるところまで到達できたこと自体が、AI と協働する開発スタイルの最初の証明になっています。そして次に述べる「AI に任せる処理と、コードで確定させる処理を切り分ける」という判断を私が初めて下したのも、このアプリでした。つまりこれは、私の技術判断の出発点です。",
      decisions: [
        {
          heading: "AI 抽出とルールベース抽出を切り分けた — AI を過信せず、信頼できる所だけ任せた",
          body: "最初はスペックの数値抽出も Gemini に任せていました。ところが「公式ページに値があるのに null になる」「非搭載の機能を搭載と誤って出力する」といった幻覚が頻発し、おすすめウィザードのスコアリングが正しく動きませんでした。原因を掘ると、オーブン温度調節範囲: 65〜250・300℃ から オーブン最高温度: 300℃ を取り出すような「ラベルの変換と値の解釈」を LLM に同時にやらせるのが不安定だと分かった。そこで役割を分離しました。数値・フラグといった確定的に決まるスペックはコードのルールベースで抽出し、接客トークや用語解説のような文章生成は Gemini に任せる。AI は万能の魔法ではなく、得意な所だけ使う道具だと割り切った——これが、この後のすべての開発で効く判断の原型になりました。",
        },
        {
          heading: "AI に Gemini を選んだ — 用途に合わせてモデルを使い分ける",
          body: "スペック抽出と接客トーク生成には Gemini 2.5 Flash を採用しました。大量の商品ページを処理するこの用途では、コストと速度が効くからです。さらに AI プロバイダーを抽象化し、環境変数ひとつで Gemini とローカル LLM（Ollama）を切り替えられるようにしました。開発中はローカルでコストをかけずに動作確認できます。（後に作った文章エディタ「つむぐ」では、逆に日本語の質を最優先して Claude を選びました。コア機能が何かで、最適な AI は変わる——その使い分けの感覚は、このアプリで AI と向き合った経験から来ています。）",
        },
        {
          heading: "店頭で使うための PWA と、データを守る RLS",
          body: "スタッフが店頭の iPad で使うことを前提に、PWA 対応にしました。ホーム画面に追加すればアプリのように起動できます。データ面では Supabase の Row Level Security を使い、書き込みは管理者のみ・スタッフアプリは読み取り専用に制限。強い権限を持つサービスロールキーはサーバーサイドの API でしか使わない構成にして、現場の端末から機密が漏れない設計にしました。",
        },
        {
          heading: "メーカーごとにバラバラな公式サイトを吸収する多段フォールバック",
          body: "現実のメーカー公式ページは、スペックの書き方も色展開の載せ方も各社バラバラです。たとえばカラーバリエーションの取得は、テーブル → 定義リスト → カラー選択 UI → 画像の alt テキスト → カラーコードのパターン、という順に複数の戦略で探しにいき、どこかで拾えるようにしました。メーカー公式に構造化されたスペック API があればそれを最優先で使う。「きれいに整ったデータは来ない」という現場の前提に、実装で対応した部分です。",
        },
      ],
      outcome:
        "自分の現場経験から作った、初めての本格的なアプリです。スタッフアプリ・管理者アプリともに継続的にバージョンを重ね、AI 抽出パイプライン・比較・おすすめウィザード・PWA まで実装しました。勤務先での正式採用は検討段階で、まだ本格運用には至っていません。利用実績を誇る段階の作品ではありませんが、現場で自分が感じた具体的な痛みを起点に、初めての開発で「AI をどこで使い、どこで使わないか」という判断にまで踏み込んだ——その意味で、私のものづくりの原点になっている一作です。",
    },
    overview: [
      { label: "役割", value: "個人開発", icon: "user" },
      { label: "種類", value: "AIプロダクト", icon: "monitor" },
      { label: "ステータス", value: "公開（PWA）", icon: "checkCircle", status: true },
      { label: "リポジトリ", value: "GitHub", icon: "link", link: true, href: "https://github.com/haruto-miyakawa/Guide-manual" },
    ],
    highlights: [
      "Gemini 2.5 Flashの参照をメーカー公式に限定し、誤情報を抑制",
      "型番×キーワード×スコア×理由の構造化データで判定根拠を明示",
      "PWAとしてモバイルでも使える形に",
    ],
    relatedLinks: [{ label: "GitHub リポジトリ", href: "https://github.com/haruto-miyakawa/Guide-manual" }],
    heroImages: [
      { src: "/projects/guide-manual/wizard.webp", caption: "ガイドウィザード — 質問に答えると、条件と好みからおすすめ候補と理由を提示" },
      { src: "/projects/guide-manual/compare.webp", caption: "比較 — 選んだ製品のスペックを軸ごとに並べ、生活でのメリットまで整理" },
      { src: "/projects/guide-manual/list.webp", caption: "商品一覧 — 型番・メーカーで絞り込み、最大5件選んで比較へ" },
      { src: "/projects/guide-manual/home.webp", caption: "ホーム — 製品名・型番・メーカー検索とカテゴリから商品を探す" },
    ],
    stack: [
      { mark: "N", name: "Next.js 16 (App Router)" },
      { mark: "TS", name: "TypeScript 5" },
      { mark: "~", name: "Tailwind CSS v4" },
      { mark: "S", name: "Supabase (PostgreSQL + RLS)" },
      { mark: "G", name: "Gemini 2.5 Flash" },
      { mark: "O", name: "Ollama" },
      { mark: "V", name: "Vercel" },
    ],
    links: [{ kind: "github", label: "GitHub", href: "https://github.com/haruto-miyakawa/Guide-manual" }],
    github: "https://github.com/haruto-miyakawa/Guide-manual",
  },
};

/* ============ Research ============ */
export const researchHero = {
  statusLabel: "Available for research",
  title: "Research",
  lead: "探究心を原動力に、実世界の課題解決を目指した研究を行っています。",
  sub: "査読付き国際会議での発表に加え、進行中の研究にも取り組んでいます。",
  interestsLabel: "Research Interests",
  /** 実在3件の研究領域から抽出した関心トピック（icon は icons レジストリのキー） */
  interests: [
    { label: "Explainable AI", icon: "shield" },
    { label: "Content Moderation", icon: "people" },
    { label: "NLP", icon: "book" },
    { label: "LLM", icon: "layers" },
    { label: "Multi-Agent", icon: "network" },
    { label: "Generative AI", icon: "sun" },
    { label: "Pixel Art", icon: "grid" },
  ] as { label: string; icon: string }[],
};

export type PaperThumb = "cubes" | "traffic" | "collage" | "galaxy" | "wave" | "cloud" | "terrain";
export type PaperBadge = "intl" | "domestic" | "reviewed" | "ongoing";

export interface Publication {
  slug: string;
  badge: PaperBadge;
  badgeLabel: string;
  status?: string;
  title: string;
  description: string;
  tags: string[];
  venue: string;
  thumb: PaperThumb;
  cats: string[];
  linkLabel: string;
  hasDetail: boolean;
}

export const featuredResearch = {
  slug: "firestorm-detection",
  badgeLabel: "査読付き国際会議（IIAI AAI 2025・IEEE）",
  title: "Persona-Conditioned Online\nFirestorm Risk Detection",
  description:
    "コミュニティごとに異なる「炎上」基準を、事例データベースへの類似度マージンで判定。データベースを差し替えるだけでペルソナを切り替えられ、再学習を要しない。",
  tags: ["Explainable AI", "Content Moderation", "NLP"],
  venue: "IIAI AAI 2025",
  where: "IEEE Xplore · Peer-reviewed",
  thumb: "traffic" as PaperThumb,
  paperUrl: "https://ieeexplore.ieee.org/document/11418320",
};

export const publications: Publication[] = [
  {
    slug: "firestorm-detection",
    badge: "intl",
    badgeLabel: "国際会議（IEEE）",
    status: "査読付き",
    title: "Persona-Conditioned Online\nFirestorm Risk Detection",
    description: "OUT/SAFE事例DBへの類似度マージンで炎上リスクを判定。DB差し替えだけでペルソナを切り替え（再学習不要）。",
    tags: ["Explainable AI", "Content Moderation", "NLP"],
    venue: "IIAI AAI 2025 (IEEE)",
    thumb: "traffic",
    cats: ["intl"],
    linkLabel: "Read Paper",
    hasDetail: true,
  },
  {
    slug: "rumor-distortion-npc",
    badge: "ongoing",
    badgeLabel: "進行中",
    title: "Forgetting to Remember:\nRumor Distortion in Multi-Agent NPCs",
    description: "人間社会の「噂の変質」をLLMマルチエージェントで意図的にモデル化するNPC対話フレームワーク（執筆中）。",
    tags: ["LLM", "Multi-Agent", "Game AI"],
    venue: "IIAI AAI 2026 投稿予定・執筆中",
    thumb: "cubes",
    cats: ["progress"],
    linkLabel: "Research Note",
    hasDetail: true,
  },
  {
    slug: "pixelart-wfc",
    badge: "ongoing",
    badgeLabel: "進行中",
    title: "Spatio-Temporal Wave Function\nCollapse for Pixel Art Animation",
    description: "ピクセルアート・アニメのフレーム間不整合を制約充足問題として解く事後補正フレームワーク（個人研究・進行中）。",
    tags: ["Pixel Art", "Neuro-Symbolic", "Generative AI"],
    venue: "個人研究",
    thumb: "collage",
    cats: ["progress"],
    linkLabel: "Research Note",
    hasDetail: true,
  },
];

/** Research タブ（実数・ステータスベース） */
export const researchTabs: { key: string; label: string; count: number }[] = [
  { key: "all", label: "すべて", count: 3 },
  { key: "intl", label: "国際会議", count: 1 },
  { key: "progress", label: "進行中", count: 2 },
];

export const researchAreas = [
  { title: "説明可能AI", desc: "コンテンツモデレーションへの応用", icon: "shield" },
  { title: "LLMマルチエージェント", desc: "ゲームAIへの応用", icon: "network" },
  { title: "生成AI × 離散制約", desc: "ピクセルアート生成", icon: "grid" },
];

export const researchHighlights = [
  { title: "問いを立てる", desc: "現象の背後にある仕組みを問い、\n検証できる形に落とし込む", icon: "question" },
  { title: "手を動かす", desc: "プロトタイプを作りながら\n仮説を素早く確かめる", icon: "wand" },
  { title: "分野を横断する", desc: "生成AI・3D・マルチエージェントなど\n領域をまたいで学ぶ", icon: "layers" },
  { title: "社会とつなぐ", desc: "研究を実世界の課題解決へ\n接続することを重視", icon: "people" },
];

/* ============ Research 詳細（論文） ============ */
/** 3枚目のCSOカード。① は結果(stats)あり、②③ は検証予定でstatsなし */
export interface PaperResults {
  label: string;
  en: string;
  body: string;
  stats?: { num: string; unit: string; label: string; sub: string }[];
}
export interface PaperDetail {
  slug: string;
  statusBadge: string;
  title: string;
  lead: string;
  body?: string;
  /** メタ帯。icon は icons レジストリのキー。6件なら pd-meta6(6列)、5件なら meta-strip(5列) */
  meta: { label: string; value: string; sub?: string; icon: string; status?: boolean }[];
  tldr: string;
  tldrTags: string[];
  problem: { body: string; points: string[] };
  approach: { body: string; points: string[] };
  results: PaperResults;
  overview: { label: string; value: string; icon: string; link?: boolean; href?: string; status?: boolean }[];
  highlights: string[];
  /** 技術スタック（実装がある場合のみ。無ければレール非表示） */
  stack?: string[];
  relatedLinks: { label: string; href: string }[];
  /** 貢献（発表済み=①のみ。未発表は非表示） */
  contributions?: string[];
  /** 出版情報（発表済み=①のみ。未発表は非表示） */
  publication?: {
    statusBadge: string;
    title: string;
    authors: string;
    authorHighlight?: string;
    affiliation: string;
    tags: string[];
    links: { label: string; href: string }[];
  };
  /** ヒーローCTA（先頭が btn-pub）。無ければボタン非表示 */
  links: { label: string; href: string }[];
  /** 連絡先CTAの GitHub 先（無ければボタン非表示） */
  github?: string;
}

export const paperDetails: Record<string, PaperDetail> = {
  /* ① 炎上検知（査読付き国際会議・IEEE収録／発表済み） */
  "firestorm-detection": {
    slug: "firestorm-detection",
    statusBadge: "査読付き国際会議（IIAI AAI 2025・IEEE）",
    title: "Persona-Conditioned Online\nFirestorm Risk Detection",
    lead: "ペルソナ条件づけによる、事例ベースの炎上リスク検知フレームワーク",
    body: "A Similarity-Based Approach with Switchable OUT/SAFE Exemplars",
    meta: [
      { label: "会場", value: "IIAI AAI 2025", sub: "IEEE", icon: "globe" },
      { label: "査読", value: "査読付き", sub: "Peer-reviewed", icon: "shield" },
      { label: "収録", value: "IEEE Xplore", icon: "book" },
      { label: "Role", value: "Co-author", sub: "4th author", icon: "user" },
      { label: "著者", value: "7 名（共著）", icon: "people" },
      { label: "所属", value: "東京の大学", sub: "情報システム学部", icon: "building" },
    ],
    tldr:
      "SNSでの「炎上」リスクを検知するフレームワーク。毒性の基準はコミュニティや組織ごとに異なるという問題に対し、「炎上事例(OUT)」と「安全事例(SAFE)」の事例データベースへの類似度マージンでリスクを判定する。データベースを差し替えるだけで「誰の基準で見るか（ペルソナ）」を切り替えられ、再学習を必要としない。",
    tldrTags: ["Explainable AI", "Content Moderation", "NLP", "RoBERTa"],
    problem: {
      body: "既存の毒性分類器は、万人に共通する「毒性」を前提とします。しかし実際の炎上基準は、コミュニティや組織ごとに大きく異なります。",
      points: [
        "毒性・炎上の基準はコミュニティ/組織ごとに異なる",
        "共通基準の分類器では各コミュニティの炎上を捉えにくい",
        "基準を変えるたびにモデルの再学習が必要になりがち",
      ],
    },
    approach: {
      body: "「炎上事例(OUT)」と「安全事例(SAFE)」の2つの事例データベースを持ち、入力文の埋め込みベクトルがどちらに近いか（類似度マージン）でリスクを判定します。データベースを差し替えるだけでペルソナを切り替えられ、再学習は不要です。",
      points: [
        "OUT/SAFE 2つの事例DBへの類似度マージンでリスク判定",
        "DBの差し替えだけでペルソナを切り替え（再学習不要）",
        "近傍事例で「なぜ危険か」を示す説明可能性と書き換え提案",
      ],
    },
    results: {
      label: "結果",
      en: "Results",
      body: "Jigsaw データセットで評価し、SAFEクラスで以下の性能を達成しました。",
      stats: [
        { num: "79.0", unit: "%", label: "F値 (F1)", sub: "SAFE class" },
        { num: "76.3", unit: "%", label: "Precision", sub: "SAFE class" },
        { num: "82.0", unit: "%", label: "Recall", sub: "SAFE class" },
      ],
    },
    overview: [
      { label: "会場", value: "IIAI AAI 2025（IEEE）", icon: "globe" },
      { label: "形式", value: "査読付き国際会議", icon: "shield" },
      { label: "ステータス", value: "発表済み", icon: "checkCircle", status: true },
      { label: "論文", value: "IEEE Xplore", icon: "link", link: true, href: "https://ieeexplore.ieee.org/document/11418320" },
    ],
    highlights: [
      "ペルソナ条件づけで炎上基準を切り替え可能",
      "再学習を必要としない事例ベース判定",
      "近傍事例による説明可能性と書き換え提案",
    ],
    stack: ["Python 3.12", "Hugging Face Transformers", "RoBERTa-base", "コサイン類似度", "Jigsaw Dataset"],
    relatedLinks: [{ label: "IEEE Xplore（論文）", href: "https://ieeexplore.ieee.org/document/11418320" }],
    contributions: [
      "ペルソナ条件づけによる炎上基準の切り替えを実現",
      "再学習を必要としない事例ベースのリスク判定",
      "近傍事例による説明可能性（なぜ危険かの提示）",
    ],
    publication: {
      statusBadge: "IIAI AAI 2025（IEEE・査読付き）",
      title:
        "Persona-Conditioned Online Firestorm Risk Detection: A Similarity-Based Approach with Switchable OUT/SAFE Exemplars",
      authors:
        "Ren Yamauchi, Yuki Fujimatsu, Jinyu Toida, Haruto Miyakawa, Haruto Ichikawa, Rei Oshima, Takafumi Nakanishi",
      authorHighlight: "Haruto Miyakawa",
      affiliation: "東京の大学 情報システム学部",
      tags: ["Explainable AI", "Content Moderation", "NLP", "RoBERTa"],
      links: [{ label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11418320" }],
    },
    links: [{ label: "Read Paper", href: "https://ieeexplore.ieee.org/document/11418320" }],
  },

  /* ② 噂の変質・マルチエージェントNPC（執筆中・筆頭著者） */
  "rumor-distortion-npc": {
    slug: "rumor-distortion-npc",
    statusBadge: "進行中（執筆中・IIAI AAI 2026 投稿予定）",
    title: "Forgetting to Remember:\nRumor Distortion via Hierarchical\nMemory in Multi-Agent NPCs",
    lead: "LLMマルチエージェントで「噂の変質」を意図的にモデル化するNPC対話フレームワーク",
    meta: [
      { label: "ステータス", value: "執筆中", sub: "In Progress", icon: "checkCircle", status: true },
      { label: "投稿予定", value: "IIAI AAI 2026", icon: "globe" },
      { label: "Role", value: "First Author", sub: "筆頭著者", icon: "user" },
      { label: "分野", value: "LLM / Multi-Agent", icon: "network" },
      { label: "応用", value: "Game AI", icon: "monitor" },
    ],
    tldr:
      "LLMで複数のゲームNPCを同時に動かすと、応答の単調化（モード崩壊）と個性の収束が起きる。人間社会の「噂の変質」（情報が人を経由する過程で意味が変わる現象）に着想し、それをLLMマルチエージェント環境で意図的にモデル化するNPC対話フレームワークを提案する。",
    tldrTags: ["LLM", "Multi-Agent", "Game AI"],
    problem: {
      body: "LLMで複数のNPCを同時に動かすと、出力が画一化しやすいという課題があります。",
      points: ["応答が単調になる（モード崩壊）", "NPCの個性が互いに収束してしまう", "長時間運用で会話の多様性が失われる"],
    },
    approach: {
      body: "人間社会の「噂の変質」に着想し、3つの機構を統合したNPC対話フレームワークを提案します。",
      points: [
        "ランダムイベント注入による話題刺激",
        "エビングハウスの忘却曲線に着想を得た階層型記憶減衰",
        "キャラクター性格パラメータに基づく確率的話題選択",
      ],
    },
    results: {
      label: "検証予定",
      en: "Planned Evaluation",
      body: "複数NPCを同一世界で長時間運用するシミュレーションを通じて、情報がNPC間で伝播する際の意味的変質を、埋め込み距離・伝播ホップ数・キャラクター一貫性などの指標で定量評価し、ベースライン手法と比較する予定です。",
    },
    overview: [
      { label: "ステータス", value: "執筆中（In Progress）", icon: "checkCircle", status: true },
      { label: "投稿予定", value: "IIAI AAI 2026", icon: "globe" },
      { label: "役割", value: "First Author（筆頭著者）", icon: "user" },
      { label: "分野", value: "LLM / Multi-Agent / Game AI", icon: "network" },
    ],
    highlights: [
      "ランダムイベント注入による話題刺激",
      "忘却曲線に着想を得た階層型記憶減衰",
      "性格パラメータに基づく確率的話題選択",
    ],
    relatedLinks: [],
    links: [],
  },

  /* ③ ピクセルアート・アニメーションの時間的一貫性（個人研究・進行中） */
  "pixelart-wfc": {
    slug: "pixelart-wfc",
    statusBadge: "進行中（個人研究 / Solo）",
    title: "Spatio-Temporal Wave Function\nCollapse for Topology-Preserving\nPixel Art Animation Refinement",
    lead: "ピクセルアート・アニメの時間的一貫性を、制約充足で事後補正する",
    meta: [
      { label: "ステータス", value: "進行中", sub: "In Progress", icon: "checkCircle", status: true },
      { label: "体制", value: "単独 (Solo)", icon: "people" },
      { label: "Role", value: "個人研究", icon: "user" },
      { label: "分野", value: "Pixel Art / Neuro-Symbolic", icon: "grid" },
      { label: "手法", value: "Wave Function Collapse", icon: "codeStack" },
    ],
    tldr:
      "生成AIが作るピクセルアート・アニメは、フレーム間でピクセルが明滅し、輪郭がドリフトし、キャラクター部位の接続（トポロジー）が破綻するなど時間的非一貫性に悩まされ、そのままでは制作現場で使えない。ピクセルアートの離散構造を活かし、フレーム間の不整合を制約充足問題として解く事後補正フレームワークを提案する。",
    tldrTags: ["Pixel Art", "Neuro-Symbolic", "Generative AI"],
    problem: {
      body: "生成AIが作るピクセルアート・アニメは、時間的な非一貫性のために制作現場でそのまま使えません。",
      points: ["フレーム間でピクセルが明滅する", "輪郭がフレームごとにドリフトする", "キャラクター部位の接続（トポロジー）が破綻する"],
    },
    approach: {
      body: "ピクセルアートの離散構造を活かし、フレーム間の不整合を制約充足問題として解く事後補正フレームワークを提案します。",
      points: [
        "アニメをX×Y×Tの三次元離散格子として再定式化",
        "Wave Function Collapse をベースに「時空隣接制約」を導入",
        "追加学習なし・汎用ハードウェア上で数秒オーダーの事後補正",
      ],
    },
    results: {
      label: "検証予定",
      en: "Planned Evaluation",
      body: "歩行アニメーションのスプライトを対象に、光学フロー系・拡散ベース手法をベースラインとして、Warp Error・LPIPS・ピクセルアート実務者による主観評価で比較検証する予定です。",
    },
    overview: [
      { label: "ステータス", value: "進行中（In Progress）", icon: "checkCircle", status: true },
      { label: "体制", value: "単独（個人研究）", icon: "people" },
      { label: "分野", value: "Pixel Art / Neuro-Symbolic / Generative AI", icon: "grid" },
    ],
    highlights: [
      "アニメをX×Y×Tの離散格子として再定式化",
      "WFCベースの時空隣接制約",
      "追加学習なしで数秒オーダーの事後補正",
    ],
    relatedLinks: [],
    links: [],
  },
};

/* ============ Home : About 抜粋 / Tech I Use / My Process ============ */
export const homeAbout = {
  name: "宮川 陽翔（みやかわ はると）",
  bio: "情報システムを専攻する学生エンジニア。Next.js / TypeScript と AI活用を軸に、ユーザー体験を大切にしたプロダクト開発に取り組んでいます。",
  points: [
    "東京の大学に在学中（情報システム専攻・2年生）",
    "埼玉在住。インターン・業務委託も積極的に検討中",
    "新しい技術のキャッチアップが好きです",
  ],
};

export const homeTech: { name: string; desc: string }[] = [
  { name: "Next.js", desc: "フルスタックなWeb開発（App Router / SSR）" },
  { name: "TypeScript", desc: "型安全な設計で保守性の高いコードを書く" },
  { name: "React", desc: "再利用性の高いUIコンポーネント設計" },
  { name: "Tailwind CSS", desc: "ユーティリティファーストで高速なUI実装" },
  { name: "Claude API", desc: "AIを組み込んだプロダクト開発（つむぐ 等）" },
  { name: "Gemini API", desc: "制約付きAI活用（家電ガイド 等）" },
  { name: "Python", desc: "研究・データ処理（Whisper / sentence-transformers 等）" },
  { name: "Supabase / PostgreSQL", desc: "データの設計・管理" },
  { name: "Vercel / GitHub", desc: "デプロイ / コード管理" },
];

export const processSteps: { title: string; desc: string }[] = [
  { title: "01. 課題を理解する", desc: "ユーザーやビジネスを理解し、本質的な課題を定義します。" },
  { title: "02. 設計する", desc: "要件を整理し、最適な体験に落とし込む設計を行います。" },
  { title: "03. 実装する", desc: "品質と保守性を意識して、丁寧に実装します。" },
  { title: "04. 改善し続ける", desc: "データやフィードバックをもとに、継続的に改善します。" },
];

/* ============ About ページ ============ */
export const about = {
  catch: "妥協なき創作のために、技術を磨く。",
  intro: [
    "情報システムを専攻する大学生です。Next.js / TypeScript でのWeb開発を軸に、Claude や Gemini などのAIを実プロダクトへ組み込むことに取り組んでいます。",
    "新しい技術を試すことは好きです。でも本当に大切なのは、\nそれが誰かの課題を解決できるか、使う人にとって心地よいものになるかだと考えています。",
    "AIに任せきりにはしません。\n構造的な制約をかけて出力を検証できる形にする——そんな『信頼できるAI活用』を、設計の中心に据えています。",
    "派手な成果を重ねるわけではありません。\nそれでも企画から実装まで一人で作りきり、一つひとつのプロダクトに責任を持つこと。\nそれが私のものづくりの姿勢です。",
  ],
  profileRows: [
    { label: "名前", value: "宮川 陽翔（みやかわ はると）", icon: "user" },
    { label: "所属", value: "東京の大学（情報システム専攻・在学中）", icon: "building" },
    { label: "学年", value: "2年生", icon: "cap" },
    { label: "専攻", value: "情報システム", icon: "atom" },
    { label: "拠点", value: "埼玉, Japan", icon: "pin" },
    { label: "言語", value: "日本語 / English", icon: "globe" },
    { label: "興味", value: "Web開発 / AI活用 /\nゲーム制作 / 研究", icon: "heart" },
  ],
  profileNote: "ユーザーに価値を届けるプロダクトを、誠実に、やり切ることを大切にしています。",
  values: [
    { title: "ユーザーに寄り添う設計", desc: "使う人の課題に向き合い、直感的で心地よい体験を届けます。", icon: "user" },
    { title: "技術で本質を解決する", desc: "流行にむやみに惑わされず、課題の本質を見極めて技術を選びます。", icon: "gem" },
    { title: "誠実に、やり切る", desc: "小さな改善も妥協せず、最後まで責任を持ってやり切ります。", icon: "shield" },
    { title: "学び続け、発信する", desc: "学びや実装の知見を技術記事として発信し、研究にも取り組みます。", icon: "book" },
  ],
  whatIDo: [
    {
      title: "Webアプリケーション開発",
      desc: "Next.js / TypeScript / React を中心に、Webアプリケーションを設計・開発します。",
      icon: "monitor",
    },
    {
      title: "AIプロダクト開発・活用",
      desc: "Claude API / Gemini API を実装に組み込み、制約付きで検証可能な『信頼できるAI活用』を実現します。",
      icon: "sparkle",
    },
    {
      title: "体験設計・UI/UX実装",
      desc: "情報設計からUI実装まで一貫して担当し、ユーザー体験を追求します。",
      icon: "pen",
    },
    {
      title: "技術記事の執筆・研究",
      desc: "学びや実装の知見を技術記事として発信し、研究にも取り組みます。",
      icon: "book",
    },
  ],
  tech: [
    { name: "Next.js", use: "フルスタックなWeb開発（App Router / SSR）", emblem: "N" },
    { name: "TypeScript", use: "型安全な設計で保守性の高いコードを書く", emblem: "TS" },
    { name: "React", use: "再利用性の高いUIコンポーネント設計", emblem: "react" },
    { name: "Tailwind CSS", use: "ユーティリティファーストで高速なUI実装", emblem: "tailwind" },
    { name: "Claude API", use: "AIを組み込んだプロダクト開発（つむぐ 等）", emblem: "C" },
    { name: "Gemini API", use: "制約付きAI活用（家電ガイド 等）", emblem: "G" },
    { name: "Python", use: "研究・データ処理（Whisper / sentence-transformers 等）", emblem: "Py" },
    { name: "Supabase / PostgreSQL", use: "データの設計・管理", emblem: "postgres" },
    { name: "Vercel / GitHub", use: "デプロイ / コード管理", emblem: "github" },
  ],
};
