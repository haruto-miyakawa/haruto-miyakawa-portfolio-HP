/** サイト全体で使うURL/メタ定数。 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://haruto-miyakawa.dev");

export const SITE_NAME = "Haruto Miyakawa";
export const SITE_TITLE = "Haruto Miyakawa — Web Engineer / AI Builder";
export const SITE_DESCRIPTION =
  "情報系の学部2年。企画から実装までひとりでやり切る、宮川陽翔のポートフォリオ。Web Engineer / AI Builder。";
