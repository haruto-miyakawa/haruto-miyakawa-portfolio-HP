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
  email: "hello@harutomiyakawa.dev",
  githubUrl: "#",
  xUrl: "#",
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

/** Home の Featured Works（3枚） */
export const featuredWorks: FeaturedWork[] = [
  {
    badge: "AI",
    title: "つむぐ",
    description: "note creators向けのAI共同執筆エディタ。書き手のリズムを崩さず、隣で支える。",
    tags: ["Next.js", "TypeScript", "Tiptap", "Claude API"],
    mock: "dash",
  },
  {
    badge: "Web",
    title: "講義文字起こし",
    description: "講義音声を自動で文字起こし・整理。聴くことに集中できる。",
    tags: ["Python", "Whisper"],
    mock: "travel",
  },
  {
    badge: "AI",
    title: "家電ガイド",
    description: "条件と好みから最適な家電を案内するPWA。制約付きAIで正確さを担保。",
    tags: ["Next.js", "TypeScript", "Supabase", "Gemini API"],
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
    title: "講義文字起こしアプリ",
    description: "講義音声を自動で文字起こし・整理。聴くことに集中できる体験へ。",
    tags: ["Python", "Whisper"],
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
  /** 実スクショがある場合のみ。無ければギャラリーセクション自体を非表示 */
  gallery?: { title: string; desc: string; mock: ShotMock }[];
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

  /* 2. 講義文字起こしアプリ */
  "lecture-minutes": {
    slug: "lecture-minutes",
    categoryLabel: "ツール・ライブラリ",
    title: "講義文字起こしアプリ",
    lead: "講義音声を自動で文字起こし・整理。聴くことに集中できる体験へ。",
    shotMock: "chat",
    meta: [
      { label: "Role", value: "個人開発", icon: "user" },
      { label: "体制", value: "個人 (Solo)", icon: "people" },
      { label: "種類", value: "ツール・ライブラリ", icon: "monitor" },
      { label: "ステータス", value: "公開（OSS）", icon: "checkCircle", status: true },
      { label: "スタック", value: "Python, Whisper", icon: "codeStack" },
    ],
    tldr:
      "講義中に板書とノートと理解を同時にこなすのは難しい——という自分自身の課題から作った、講義音声の自動文字起こしツールです。録音した音声をWhisperで文字起こしし、長い書き起こしを後から読み返しやすい形に整理します。実装の過程はZennに記事としてまとめ、初動から良い反応をいただきました。企画から実装まで個人で担当しています。",
    challenge: {
      heading: "聴く・書く・理解するを同時にできない",
      body: "講義中はノートを取ることに気を取られ、肝心の内容理解がおろそかになりがち。後から見返しても、断片的なメモでは話の流れを追えない——という自分の困りごとが出発点でした。",
      points: ["板書とノートに気を取られ、話そのものを聴けない", "手書きメモは断片的で、後から流れを再構成できない", "録音しても長すぎて、結局聴き直せない"],
    },
    solution: {
      heading: "録って、起こして、読める形に",
      body: "音声をWhisperで文字起こしし、生の書き起こしを読み返しやすい単位に整理する流れを組みました。ノートを取る作業から書き手を解放し、講義そのものへ集中できる状態を目指しています。",
      points: ["Whisperによる自動文字起こし", "長い書き起こしを、読み返しやすい形に整理"],
    },
    outcome: {
      heading: "自分の困りごとを、動くツールとして解いた",
      body: "『聴くことに集中して、あとで読み返せる』状態を実際に手に入れられたことが成果です。実装で得た知見はZennに記事化し、初動で良い反応を得られました。",
      facts: ["Zenn 記事化", "Whisper 音声→テキスト自動化", "個人開発（企画〜実装）"],
    },
    overview: [
      { label: "役割", value: "個人開発", icon: "user" },
      { label: "種類", value: "ツール・ライブラリ", icon: "monitor" },
      { label: "ステータス", value: "公開（OSS）", icon: "checkCircle", status: true },
      { label: "リポジトリ", value: "GitHub", icon: "link", link: true, href: "https://github.com/haruto-miyakawa/lecture-minutes" },
    ],
    highlights: ["Whisperによる自動文字起こし", "長い書き起こしを、読み返しやすい形に整理", "実装の知見をZennに記事化"],
    relatedLinks: [
      { label: "GitHub リポジトリ", href: "https://github.com/haruto-miyakawa/lecture-minutes" },
      { label: "Zenn 記事", href: "https://zenn.dev/haruto_miyakawa/articles/4b7754712b7585" },
    ],
    stack: [
      { mark: "Py", name: "Python" },
      { mark: "W", name: "Whisper" },
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
  sub: "国際会議や学会での発表・採択実績を積み重ねています。",
  interestsLabel: "Research Interests",
  interests: [
    "Generative AI",
    "3D Vision",
    "Point Cloud",
    "Traffic AI",
    "LLM",
    "Human-AI Interaction",
    "Creative Tools",
  ],
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
  slug: "generative-terrain-modeling",
  badgeLabel: "ICCV 2024 Accepted",
  title: "Generative Terrain Modeling\nUsing Diffusion Models",
  description: "拡散モデルを用いた高解像度地形生成手法を提案。地形の自然さと制御性を両立。",
  tags: ["Generative AI", "Diffusion Model", "3D Generation"],
  venue: "ICCV 2024",
  where: "Oct 2024 · Paris, France",
  thumb: "terrain" as PaperThumb,
};

export const publications: Publication[] = [
  {
    slug: "efficient-3d-object-detection",
    badge: "intl",
    badgeLabel: "国際会議",
    status: "Accepted",
    title: "Efficient 3D Object Detection\nwith Point Transformer",
    description: "Point Transformerを用いた軽量かつ高精度な3D物体検出手法を提案。",
    tags: ["3D Vision", "Point Cloud", "Transformer"],
    venue: "CVPR 2024",
    thumb: "cubes",
    cats: ["intl", "presented"],
    linkLabel: "Read Paper",
    hasDetail: true,
  },
  {
    slug: "traffic-flow-prediction",
    badge: "domestic",
    badgeLabel: "国内学会",
    title: "時系列データに基づく\n交通流予測のための深層学習手法",
    description: "グラフニューラルネットワークを用いた都市部の交通流予測モデルを提案。",
    tags: ["GNN", "Time Series", "Traffic Forecasting"],
    venue: "第28回 交通工学論文集",
    thumb: "traffic",
    cats: ["domestic", "presented"],
    linkLabel: "Read Paper",
    hasDetail: true,
  },
  {
    slug: "llm-learning-support",
    badge: "reviewed",
    badgeLabel: "査読論文",
    title: "LLMを活用した対話型学習支援\nシステムの設計",
    description: "大規模言語モデルを活用した個別最適化型の学習支援システムを設計・評価。",
    tags: ["LLM", "EdTech", "Conversational AI"],
    venue: "情報処理学会論文誌",
    thumb: "collage",
    cats: ["reviewed", "presented"],
    linkLabel: "Read Paper",
    hasDetail: true,
  },
  {
    slug: "text-to-image-semantic-control",
    badge: "intl",
    badgeLabel: "国際会議",
    status: "Presented",
    title: "Text-to-Image Generation\nwith Semantic Control",
    description: "セマンティックマップによる制御可能な画像生成手法を提案。",
    tags: ["GAN", "ControlNet", "Semantic Segmentation"],
    venue: "ECCV 2023",
    thumb: "galaxy",
    cats: ["intl", "presented"],
    linkLabel: "Read Paper",
    hasDetail: true,
  },
  {
    slug: "multimodal-action-recognition",
    badge: "ongoing",
    badgeLabel: "進行中",
    title: "マルチモーダル情報を用いた\n行動認識モデルの構築",
    description: "RGB・深度・音声を統合したマルチモーダル行動認識モデルを研究中。",
    tags: ["Multi-modal", "Action Recognition", "Deep Learning"],
    venue: "—",
    thumb: "wave",
    cats: ["ongoing"],
    linkLabel: "Research Note",
    hasDetail: true,
  },
  {
    slug: "lidar-self-supervised",
    badge: "domestic",
    badgeLabel: "国内学会",
    title: "LiDAR点群の自己教師あり表現学習",
    description: "点群データの自己教師あり学習による3D表現獲得手法を提案。",
    tags: ["Point Cloud", "Self-Supervised", "3D Representation"],
    venue: "第42回 日本ロボット学会学術講演会",
    thumb: "cloud",
    cats: ["domestic", "presented"],
    linkLabel: "Research Note",
    hasDetail: true,
  },
];

/** Research タブ（件数は確定版デザインの表記をそのまま使用） */
export const researchTabs: { key: string; label: string; count: number }[] = [
  { key: "all", label: "すべて", count: 9 },
  { key: "intl", label: "国際会議", count: 5 },
  { key: "domestic", label: "国内学会", count: 3 },
  { key: "reviewed", label: "査読論文", count: 2 },
  { key: "presented", label: "発表済み", count: 6 },
  { key: "ongoing", label: "進行中", count: 3 },
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
export interface PaperDetail {
  slug: string;
  statusBadge: string;
  title: string;
  lead: string;
  body: string;
  meta: { label: string; value: string; sub?: string }[];
  tldr: string;
  tldrTags: string[];
  problem: { body: string; points: string[] };
  approach: { body: string; points: string[] };
  results: { body: string; stats: { num: string; unit: string; label: string; sub: string }[] };
  overview: { label: string; value: string; links?: { label: string; external?: boolean }[] }[];
  highlights: string[];
  stack: string[];
  relatedLinks: string[];
  quantitative: { metric: string; ours: string; pgm: string; stylegan: string }[];
  ablation: {
    setting: string;
    multiScale: boolean;
    terrain: boolean;
    fid: string;
    rmse: string;
    diversity: string;
    best: boolean;
  }[];
  contributions: string[];
  publication: {
    statusBadge: string;
    title: string;
    authors: string;
    affiliation: string;
    tags: string[];
  };
  presentation: { statusBadge: string; date: string; duration: string; slideTitle: string; slideAuthors: string };
  relatedWork: { title: string; desc: string; icon: string }[];
}

export const paperDetails: Record<string, PaperDetail> = {
  "generative-terrain-modeling": {
    slug: "generative-terrain-modeling",
    statusBadge: "ICCV 2024 Accepted",
    title: "Generative Terrain\nModeling Using\nDiffusion Models",
    lead: "拡散モデルを用いた高解像度地形生成手法の提案",
    body:
      "本研究では、拡散モデルを3Dノイズ場に適用することで、地形の自然さと地形多様性を両立する高解像度地形生成手法を提案します。従来の手法と比較して、地形の連続性と細かな地形特徴において定量・定性的に優れた結果を示しました。",
    meta: [
      { label: "Conference", value: "ICCV 2024", sub: "Oral Presentation" },
      { label: "Acceptance Rate", value: "23.6%" },
      { label: "Authors", value: "Haruto Miyakawa", sub: "et al." },
      { label: "Affiliation", value: "Tokyo University", sub: "情報工学研究科" },
      { label: "Period", value: "2024.01 – 2024.07" },
      { label: "Role", value: "First Author", sub: "Lead Researcher" },
    ],
    tldr:
      "拡散モデルを3Dノイズ場に適用する新しい地形生成手法を提案します。マルチスケールの条件付き地形制約を組み合わせることで、自然で多様性のある高解像な地形を効率的に生成できます。",
    tldrTags: ["Generative AI", "Diffusion Model", "3D Generation", "Terrain", "Procedural Generation"],
    problem: {
      body: "従来の地形生成手法には以下の課題がありました。",
      points: ["高解像度での生成における計算コストの増大", "地形の自然さと多様性のトレードオフ", "細かな地形特徴の再現が困難"],
    },
    approach: {
      body: "拡散モデルをベースとした新しい枠組みを提案。",
      points: ["3Dノイズ場における拡散過程の設計", "マルチスケール条件付けによる制御", "地形制約を組み込んだサンプリング"],
    },
    results: {
      body: "既存手法と比較して、定量・定性的に優れた性能を達成しました。",
      stats: [
        { num: "22.3", unit: "%", label: "FID", sub: "↓ Lower is better" },
        { num: "18.7", unit: "%", label: "RMSE", sub: "↓ Lower is better" },
        { num: "31.2", unit: "%", label: "多様性スコア", sub: "↑ Higher is better" },
      ],
    },
    overview: [
      { label: "期間", value: "2024.01 – 2024.07" },
      { label: "分野", value: "Computer Vision /\nGenerative AI" },
      { label: "タイプ", value: "研究・論文" },
      { label: "ステータス", value: "ICCV 2024 採択" },
      {
        label: "リンク",
        value: "",
        links: [
          { label: "arXiv: 2405.12345v1" },
          { label: "Project Page", external: true },
        ],
      },
    ],
    highlights: [
      "高解像度地形の高品質生成を実現",
      "自然さと多様性をバランスよく両立",
      "計算効率の高い生成プロセス",
      "様々な地形タイプに対応可能",
      "ゲーム・CG・シミュレーションへの応用が期待",
    ],
    stack: ["Python", "PyTorch", "JAX", "Diffusers", "NumPy", "Scipy", "Trimesh", "NVIDIA CUDA"],
    relatedLinks: ["GitHub リポジトリ", "発表スライド（予定）"],
    quantitative: [
      { metric: "FID (↓)", ours: "22.3", pgm: "28.7", stylegan: "32.1" },
      { metric: "RMSE (↓)", ours: "18.7", pgm: "23.4", stylegan: "27.9" },
      { metric: "多様性スコア (↑)", ours: "31.2", pgm: "22.1", stylegan: "19.3" },
      { metric: "地形連続性 (↑)", ours: "0.882", pgm: "0.756", stylegan: "0.701" },
      { metric: "細部再現性 (↑)", ours: "0.873", pgm: "0.692", stylegan: "0.634" },
    ],
    ablation: [
      { setting: "Full Model (Ours)", multiScale: true, terrain: true, fid: "22.3", rmse: "18.7", diversity: "31.2", best: true },
      { setting: "w/o Multi-scale", multiScale: false, terrain: true, fid: "27.9", rmse: "22.4", diversity: "24.1", best: false },
      { setting: "w/o Terrain Constraint", multiScale: true, terrain: false, fid: "30.1", rmse: "24.8", diversity: "21.3", best: false },
      { setting: "w/o Both", multiScale: false, terrain: false, fid: "34.6", rmse: "28.7", diversity: "17.6", best: false },
    ],
    contributions: [
      "3Dノイズ場における拡散モデルの新しい適用方法を提案",
      "マルチスケール条件付けによる多様な地形制御を実現",
      "地形制約を組み込んだ効率的なサンプリング手法を設計",
      "既存手法を上回る高品質・高多様性の地形生成を達成",
    ],
    publication: {
      statusBadge: "ICCV 2024 (Accepted)",
      title: "Generative Terrain Modeling Using Diffusion Models",
      authors: "Haruto Miyakawa*, Taro Yamada, Hanako Suzuki",
      affiliation: "Tokyo University",
      tags: ["Diffusion Models", "3D Generation", "Terrain", "Procedural Generation"],
    },
    presentation: {
      statusBadge: "ICCV 2024 Oral Presentation",
      date: "発表予定日: 2024年10月",
      duration: "Duration: 12 min + 3 min Q&A",
      slideTitle: "Generative Terrain Modeling Using Diffusion Models",
      slideAuthors: "Haruto Miyakawa et al.",
    },
    relatedWork: [
      { title: "Terrain Generation", desc: "Houdini, Unity Terrain などの従来のプロシージャル手法", icon: "terrain" },
      { title: "Generative Models", desc: "GANやVAEを用いた地形生成手法", icon: "sun" },
      { title: "Diffusion Models", desc: "画像生成分野での拡散モデルの成功例", icon: "noise" },
      { title: "3D Generation", desc: "3Dオブジェクト生成や3Dシーン生成の研究", icon: "cube" },
    ],
  },
};

/* ============ Home : About 抜粋 / Tech I Use / My Process ============ */
export const homeAbout = {
  name: "宮川 陽翔（みやかわ はると）",
  bio: "フロントエンド開発とAI活用が得意な学生エンジニア。ユーザー体験を大切にしたWebプロダクト開発に取り組んでいます。",
  points: ["東京の大学に在学中（情報系）", "インターン・業務委託を積極的に検討中", "新しい技術のキャッチアップが好きです"],
};

export const homeTech: { name: string; desc: string }[] = [
  { name: "Next.js", desc: "フルスタック開発 / SSR / API Routesで高速なWeb体験を実現" },
  { name: "TypeScript", desc: "型安全な設計で、保守性の高いコードを書く" },
  { name: "React", desc: "再利用性の高いUIコンポーネント設計" },
  { name: "Tailwind CSS", desc: "ユーティリティファーストで高速なUI実装" },
  { name: "OpenAI API", desc: "自然言語処理を活用したAI機能の実装" },
  { name: "PostgreSQL", desc: "リレーショナルデータの設計・最適化" },
  { name: "Prisma", desc: "型安全なORMで開発体験と生産性を向上" },
];

export const processSteps: { title: string; desc: string }[] = [
  { title: "01. 課題を理解する", desc: "ユーザーやビジネスを理解し、本質的な課題を定義します。" },
  { title: "02. 設計する", desc: "要件を整理し、最適な体験に落とし込む設計を行います。" },
  { title: "03. 実装する", desc: "品質と保守性を意識して、丁寧に実装します。" },
  { title: "04. 改善し続ける", desc: "データやフィードバックをもとに、継続的に改善します。" },
];

/* ============ About ページ ============ */
export const about = {
  catch: "妥協なき創作を、誠実に。",
  intro: [
    "私は、技術そのものよりも、その先にある体験に興味があります。",
    "新しい技術を試すことは好きです。でも本当に大切なのは、\nそれが誰かの課題を解決できるか、使う人にとって心地よいものになるかだと考えています。",
    "だから設計も、実装も、改善もできるだけ自分の手で向き合います。\n細かな余白や色温度まで、コードの保守性まで気にするのは、\nその積み重ねが最終的な体験の質を決めると信じているからです。",
    "派手な成果を重ねるわけではありません。\nそれでも、一つひとつのプロダクトに責任を持ち、最後までやり切ること。\nそれが私のものづくりの姿勢です。",
  ],
  profileRows: [
    { label: "名前", value: "宮川 陽翔（みやかわ はると）", icon: "user" },
    { label: "所属", value: "東京の大学に在学中（情報系）", icon: "building" },
    { label: "学年", value: "学部3年生", icon: "cap" },
    { label: "専攻", value: "情報工学", icon: "atom" },
    { label: "拠点", value: "Tokyo, Japan", icon: "pin" },
    { label: "言語", value: "日本語 / English", icon: "globe" },
    { label: "興味", value: "Web開発 / AI活用 /\n体験設計 / 旅行 / ゲーム制作", icon: "heart" },
  ],
  profileNote: "ユーザーに価値を届けるプロダクトを、誠実に、やり切ることを大切にしています。",
  values: [
    { title: "ユーザーに寄り添う設計", desc: "使う人の課題に向き合い、直感的で心地よい体験を届けます。", icon: "user" },
    { title: "技術で本質を解決する", desc: "流行にむやみに惑わされず、課題の本質を見極めて技術を選びます。", icon: "gem" },
    { title: "誠実に、やり切る", desc: "小さな改善も妥協せず、最後まで責任を持ってやり切ります。", icon: "shield" },
    { title: "学び続け、還元する", desc: "学びを発信し、チームやコミュニティに価値を還元します。", icon: "book" },
  ],
  whatIDo: [
    {
      title: "Webアプリケーション開発",
      desc: "Next.js / React / TypeScriptを中心に、パフォーマンスとアクセシビリティを意識したWebアプリを開発します。",
      icon: "monitor",
    },
    {
      title: "AIプロダクト開発・活用",
      desc: "LLMや各種APIを活用し、AIを組み込んだプロダクトの設計・実装・改善を行います。",
      icon: "sparkle",
    },
    {
      title: "体験設計・UI/UX実装",
      desc: "情報設計からUI実装まで一貫して担当し、ユーザー体験の最大化を追求します。",
      icon: "pen",
    },
    {
      title: "技術調査・改善・運用",
      desc: "技術調査、パフォーマンス改善、継続的な運用・改善でプロダクトを成長させます。",
      icon: "chart",
    },
  ],
  tech: [
    { name: "Next.js", use: "フルスタック開発 / SSR / API Routesで高速なWeb体験を実現", emblem: "N" },
    { name: "OpenAI API", use: "自然言語処理を活用したAI機能の実装", emblem: "openai" },
    { name: "TypeScript", use: "型安全な設計で、保守性の高いコードを書きます", emblem: "TS" },
    { name: "PostgreSQL", use: "リレーショナルデータの設計・最適化", emblem: "postgres" },
    { name: "React", use: "再利用性の高いUIコンポーネント設計と状態管理", emblem: "react" },
    { name: "Prisma", use: "型安全なORMで開発体験と生産性を向上", emblem: "prisma" },
    { name: "Tailwind CSS", use: "ユーティリティファーストで高速なUI実装", emblem: "tailwind" },
    { name: "Vercel / GitHub", use: "デプロイ / CI/CD / コード管理", emblem: "github" },
  ],
};
