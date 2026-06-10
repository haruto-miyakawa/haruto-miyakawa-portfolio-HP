/** サイト全体で使うURL/メタ定数。本番URLは Vercel の環境変数から解決する。 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "Haruto Miyakawa";
export const SITE_TITLE = "Haruto Miyakawa — Web Engineer / AI Builder";
export const SITE_DESCRIPTION =
  "フロントエンドとAIを軸に、課題を解決するプロダクトを開発しています。Web Engineer / AI Builder, 宮川陽翔のポートフォリオ。";
