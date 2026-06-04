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
  headingLines: ["Build with Code.", "Create with Purpose."],
  jp: "技術で価値を生み出し、体験をより良くする。",
  body:
    "フロントエンドとAIを軸に、課題を解決するプロダクトを開発しています。\nユーザーに価値を届けることにこだわり、設計から実装・改善までやり切ります。",
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
}

export interface Work {
  slug: string;
  badge: string;
  category: WorkCategory;
  title: string;
  description: string;
  tags: string[];
  mock: WorkMock;
  /** カード右下リンクのラベル */
  footRight: "Case Study" | "GitHub";
  /** 詳細（ケーススタディ）ページを持つか */
  hasCaseStudy: boolean;
}

/** Home の Featured Works（3枚）。works 本体と一致させる */
export const featuredWorks: FeaturedWork[] = [
  {
    badge: "Web",
    title: "つむぐ",
    description: "note creators向けのAI共同執筆エディタ。書き手のリズムを崩さず、隣で支える。",
    tags: ["Next.js", "TypeScript", "React", "Tiptap", "Claude API", "Tailwind CSS"],
    mock: "dash",
  },
  {
    badge: "Tool",
    title: "講義議事録ジェネレーター",
    description: "音声をWhisperで文字起こしし、Geminiで議事録に整形するツール。聴くことに集中できる。",
    tags: ["Python", "Whisper", "Gemini API"],
    mock: "travel",
  },
  {
    badge: "AI",
    title: "家電ガイド",
    description: "条件と好みから最適な家電を案内するPWA。制約付きAIで正確さを担保。",
    tags: ["Next.js", "TypeScript", "Supabase", "Gemini API", "PWA"],
    mock: "chat",
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
    footRight: "Case Study",
    hasCaseStudy: true,
  },
  {
    slug: "lecture-minutes",
    badge: "Tool",
    category: "tool",
    title: "講義議事録ジェネレーター",
    description: "音声をWhisperで文字起こしし、Geminiで議事録に整形するツール。聴くことに集中できる。",
    tags: ["Python", "Whisper", "Gemini API"],
    mock: "travel",
    footRight: "Case Study",
    hasCaseStudy: true,
  },
  {
    slug: "guide-manual",
    badge: "AI",
    category: "ai",
    title: "家電ガイド",
    description: "条件と好みから最適な家電を案内するPWA。制約付きAIで正確さを担保。",
    tags: ["Next.js", "TypeScript", "Supabase", "Gemini API", "PWA"],
    mock: "chat",
    footRight: "Case Study",
    hasCaseStudy: true,
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
  tldr: string;
  challenge: CsoBlock;
  solution: CsoBlock;
  outcome: CsoBlock;
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
    lead: "note creators向けのAI共同執筆エディタ。書き手のリズムを崩さず、隣で支える。",
    shotMock: "dashboard",
    meta: [
      { label: "Role", value: "個人開発", icon: "user" },
      { label: "体制", value: "個人 (Solo)", icon: "people" },
      { label: "種類", value: "Webアプリ", icon: "monitor" },
      { label: "ステータス", value: "v2.0 開発中", sub: "クローズドβ準備中", icon: "checkCircle", status: true },
      { label: "スタック", value: "Next.js, TypeScript,\nTiptap, Claude API 他", icon: "codeStack" },
    ],
    tldr:
      "Tsumugu（つむぐ）は、noteで発信するクリエイターのためのAI共同執筆エディタです。「AIに書かせる」のではなく「書き手の思考を止めない」ことを設計の中心に据えました。エディタ本体はTiptapで構築し、AIの提案は本文のブロック単位で差し替わる仕組み（ブロックリプレース）にすることで、執筆の流れを断たずに推敲を差し込めるようにしています。さらに、マスコットキャラクター『つむぎ』が5つの表情で寄り添い、AIを冷たい道具ではなく並走者として感じられる体験を目指しました。企画・設計・実装まで個人開発で一人で担当しています。",
    challenge: {
      heading: "AIが書く流れを奪う",
      body: "既存のAI執筆ツールは生成が主役になりがちで、提案の量やタイミングが過剰だと、書き手のリズムや自分の言葉が削られてしまう——そう感じたのが出発点でした。",
      points: ["提案が多すぎて思考と集中が途切れる", "操作のたびにエディタの外へ意識が逸れる", "文体が「AIっぽく」均質化してしまう"],
    },
    solution: {
      heading: "呼んだときだけ並走するエディタ",
      body: "AIを常時介入させず、書き手が求めた瞬間だけ応答する設計にしました。Tiptapのブロック構造を活かして、提案を本文へ自然に差し込むブロックリプレースを実装。生成はClaude APIを用い、ストリーミング表示で待ち時間を感じさせないようにしています。",
      points: [
        "選択範囲ベースの軽量な提案UI（ブロックリプレース）",
        "Claude API＋ストリーミングで「待たせない」応答",
        "マスコット『つむぎ』の5表情で、AIの介入を和らげる",
      ],
    },
    outcome: {
      heading: "設計思想を、動くプロダクトに落とし込めた",
      body: "現時点での成果は利用者数ではなく、『静かな並走者』という設計思想を実際に動くプロダクトとして形にできたことです。フルリニューアル版（v2.0）を完成させ、Tiptapのブロックリプレースとつむぎの5表情を実装。実装過程は技術記事（Zenn）にもまとめました。『呼んだときだけ支える体験が、書き手の文体を保ったまま下書きを速くできるか』を、これからのクローズドβで検証していきます。",
      facts: ["v2.0 フルリニューアル達成", "マスコット『つむぎ』5表情", "Zenn 技術記事化"],
    },
    overview: [
      { label: "役割", value: "個人開発", icon: "user" },
      { label: "種類", value: "Webアプリ", icon: "monitor" },
      { label: "ステータス", value: "v2.0 開発中", icon: "checkCircle", status: true },
      { label: "リポジトリ", value: "GitHub", icon: "link", link: true, href: "https://github.com/haruto-miyakawa/tsumugu" },
    ],
    highlights: [
      "選択範囲ベースの軽量な提案UI（ブロックリプレース）",
      "Claude API＋ストリーミングで「待たせない」応答",
      "マスコット『つむぎ』の5表情で、AIの介入を和らげる",
    ],
    relatedLinks: [{ label: "GitHub リポジトリ", href: "https://github.com/haruto-miyakawa/tsumugu" }],
    heroImages: [
      { src: "/projects/tsumugu/editor.png", caption: "エディタ — AIの提案をブロック単位で挿入（ブロックリプレース）" },
      { src: "/projects/tsumugu/home.png", caption: "ホーム — 下書きの一覧管理とテーマからの自動生成" },
      { src: "/projects/tsumugu/preview.png", caption: "プレビュー — note公開前の仕上がり確認" },
    ],
    stack: [
      { mark: "N", name: "Next.js" },
      { mark: "TS", name: "TypeScript" },
      { mark: "R", name: "React" },
      { mark: "T", name: "Tiptap" },
      { mark: "C", name: "Claude API" },
      { mark: "~", name: "Tailwind CSS" },
    ],
    links: [{ kind: "github", label: "GitHub", href: "https://github.com/haruto-miyakawa/tsumugu" }],
    github: "https://github.com/haruto-miyakawa/tsumugu",
  },

  /* 2. 講義議事録ジェネレーター */
  "lecture-minutes": {
    slug: "lecture-minutes",
    categoryLabel: "ツール・ライブラリ",
    title: "講義議事録ジェネレーター",
    lead: "音声をWhisperで文字起こしし、Geminiで議事録に整形するツール。聴くことに集中できる。",
    shotMock: "chat",
    meta: [
      { label: "Role", value: "個人開発", icon: "user" },
      { label: "体制", value: "個人 (Solo)", icon: "people" },
      { label: "種類", value: "ツール・ライブラリ", icon: "monitor" },
      { label: "ステータス", value: "公開（OSS）", icon: "checkCircle", status: true },
      { label: "スタック", value: "Python, Whisper, Gemini API", icon: "codeStack" },
    ],
    tldr:
      "講義中に板書・ノート・理解を同時にこなすのは難しい——という自分の課題から作った、講義音声の議事録ジェネレーターです。録音した音声をWhisperで文字起こしし、その結果をGeminiで見出し・要点・キーワードを備えた議事録へ自動整形します。聴くことに集中でき、後から読み返せる形に。実装の過程はZennに記事化しました。企画から実装まで個人で担当しています。",
    challenge: {
      heading: "聴く・書く・理解するを同時にできない",
      body: "講義中はノートを取ることに気を取られ、肝心の内容理解がおろそかになりがち。後から見返しても、断片的なメモでは話の流れを追えない——という自分の困りごとが出発点でした。",
      points: ["板書とノートに気を取られ、話そのものを聴けない", "手書きメモは断片的で、後から流れを再構成できない", "録音しても長すぎて、結局聴き直せない"],
    },
    solution: {
      heading: "文字起こしから議事録まで自動で",
      body: "音声をWhisperで文字起こしし、その結果をGeminiで議事録（見出し・要点・キーワード）に自動整形する流れを組みました。ノートを取る作業から解放し、講義そのものへ集中できる状態を目指しています。",
      points: [
        "Whisperによる音声の文字起こし（タイムスタンプ付き）",
        "Geminiによる議事録への自動整形（見出し・まとめ・キーワード抽出）",
        "出力に対応（コピー / .txt / .md / PDF ダウンロード）",
        "ハルシネーション再解析（AIの誤りを再チェック）",
        "Whisperモデル選択・話者分離などの設定",
      ],
    },
    outcome: {
      heading: "文字起こしの先の「議事録」まで自動化できた",
      body: "ただ文字起こしするだけでなく、Geminiで議事録に整形して『あとで読み返せる』状態まで実現できたことが成果です。実装で得た知見はZennに記事化しました。",
      facts: ["Whisper×Gemini", "議事録自動整形", "PDF / Markdown 出力"],
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
    stack: [
      { mark: "Py", name: "Python" },
      { mark: "W", name: "Whisper" },
      { mark: "G", name: "Gemini API" },
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
    lead: "条件と好みから最適な家電を案内するPWA。制約付きAIで正確さを担保。",
    shotMock: "phone",
    meta: [
      { label: "Role", value: "個人開発", icon: "user" },
      { label: "体制", value: "個人 (Solo)", icon: "people" },
      { label: "種類", value: "AIプロダクト", icon: "monitor" },
      { label: "ステータス", value: "公開", sub: "PWA", icon: "checkCircle", status: true },
      { label: "スタック", value: "Next.js, TypeScript,\nSupabase, Gemini API 他", icon: "codeStack" },
    ],
    tldr:
      "家電を選ぶとき、型番もスペックも膨大で、何を基準にすればいいか分からなくなる——その「選びにくさ」を減らすために作ったPWAです。利用者の条件と好みから候補を絞り込み、比較すべき軸を整理して提示します。技術的には、AIに任せきりにせず「正確さ」を担保する作りを重視しました。",
    challenge: {
      heading: "型番が多すぎて、選ぶ基準が見えない",
      body: "家電は型番もスペック項目も膨大で、初めて選ぶ人ほど『結局どれが自分に合うのか』が見えなくなる。比較情報はあっても軸が整理されておらず、迷いが残るという課題でした。",
      points: ["型番・スペックが多すぎて比較しきれない", "何を基準に選べばいいかが分からない", "AIに聞くと、もっともらしい誤情報（ハルシネーション）が混じる"],
    },
    solution: {
      heading: "AIを使う、でも正確さは手放さない",
      body: "候補の絞り込みにAIを使いつつ、誤情報を出さない制約を組み込みました。スペック収集はGemini 2.5 Flashの参照先をメーカー公式ドメインに限定してハルシネーションを抑え、おすすめ判定は型番・キーワード・スコア・理由を持つ構造化データで根拠を明示。『AIの出力を後から検証できる』設計にしています。",
      points: [
        "Gemini 2.5 Flashの参照をメーカー公式に限定し、誤情報を抑制",
        "型番×キーワード×スコア×理由の構造化データで判定根拠を明示",
        "PWAとしてモバイルでも使える形に",
      ],
    },
    outcome: {
      heading: "『制約のあるAI活用』を形にした",
      body: "AIを使いながらも誤情報を抑え、判定の根拠を残す——信頼できるAIプロダクトの作り方を、実装として示せたことが成果です。スペック収集から判定までを、動くPWAとして組み上げました。",
      facts: ["PWA モバイル対応", "構造化判定で根拠を残す", "参照先限定でハルシネーション対策"],
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
    stack: [
      { mark: "N", name: "Next.js" },
      { mark: "TS", name: "TypeScript" },
      { mark: "S", name: "Supabase" },
      { mark: "G", name: "Gemini API" },
      { mark: "P", name: "PWA" },
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
      { label: "所属", value: "東京の大学", sub: "コンピュータサイエンス学部", icon: "building" },
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
      affiliation: "東京の大学 コンピュータサイエンス学部",
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
    "東京の大学に在学中（コンピュータサイエンス専攻・2年生）",
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
    { label: "所属", value: "東京の大学（コンピュータサイエンス専攻・在学中）", icon: "building" },
    { label: "学年", value: "2年生", icon: "cap" },
    { label: "専攻", value: "コンピュータサイエンス / 情報システム", icon: "atom" },
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
