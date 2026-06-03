import type { Metadata } from "next";
import { WorksExplorer } from "@/components/WorksExplorer";

export const metadata: Metadata = {
  title: "Works — Haruto Miyakawa",
  description: "これまでに開発したプロダクトやツールの一覧。課題解決のプロセスと、実装・改善の工夫を大切にしています。",
};

export default function WorksPage() {
  return <WorksExplorer />;
}
