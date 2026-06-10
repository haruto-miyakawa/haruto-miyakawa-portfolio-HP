"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { works, workCategories } from "@/content/content.data";
import { WorkThumb } from "@/components/mockups";
import { ArrowRight, PlusCircle } from "@/components/icons";

export function WorksExplorer() {
  const router = useRouter();
  const [curCat, setCurCat] = useState<string>("all");
  const [selTags, setSelTags] = useState<Set<string>>(new Set());

  const catCount = (cat: string) => (cat === "all" ? works.length : works.filter((w) => w.category === cat).length);

  // タグを出現頻度（降順）→ 初出順で並べ、件数を数える
  const tagOrder = useMemo(() => {
    const counts: Record<string, number> = {};
    const order: string[] = [];
    works.forEach((w) =>
      w.tags.forEach((tag) => {
        if (!(tag in counts)) {
          counts[tag] = 0;
          order.push(tag);
        }
        counts[tag]++;
      }),
    );
    order.sort((a, b) => counts[b] - counts[a] || order.indexOf(a) - order.indexOf(b));
    return order.map((tag) => ({ tag, count: counts[tag] }));
  }, []);

  const isVisible = (cat: string, tags: string[]) => {
    const okCat = curCat === "all" || cat === curCat;
    const okTags = selTags.size === 0 || tags.some((t) => selTags.has(t));
    return okCat && okTags;
  };

  const visibleCount = works.filter((w) => isVisible(w.category, w.tags)).length;

  const toggleTag = (tag: string) => {
    setSelTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <>
      <section className="whead">
        <div className="hero-img">
          <img src="/assets/hero-Works.webp" alt="夕暮れのキャンプ（テントと焚き火）" decoding="async" fetchPriority="high" />
        </div>
        <div className="whead-content">
          <div className="cta-status">
            <span className="cta-dot" />
            Available for work
          </div>
          <h1 className="whead-title">Works</h1>
          <p className="whead-lead">これまでに開発したプロダクトやツールの一覧です。</p>
          <p className="whead-sub">課題解決のプロセスと、実装・改善の工夫を大切にしています。</p>
          <div className="tabs">
            {workCategories.map((cat) => (
              <button
                key={cat.key}
                className={`tab${curCat === cat.key ? " active" : ""}`}
                onClick={() => setCurCat(cat.key)}
              >
                {cat.label} <span className="tab-n">{catCount(cat.key)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="works-body">
        <div className="works-grid">
          {works.map((work) => {
            const visible = isVisible(work.category, work.tags);
            const href = work.hasCaseStudy ? `/works/${work.slug}` : "#";
            return (
              <article
                key={work.slug}
                className={`wcard${visible ? "" : " hide"}`}
                onClick={(e) => {
                  if (work.hasCaseStudy && !(e.target as HTMLElement).closest("a")) {
                    router.push(`/works/${work.slug}`);
                  }
                }}
              >
                <div className="wthumb">
                  <span className="wbadge">
                    <span className="bdot" />
                    {work.badge}
                  </span>
                  <WorkThumb title={work.title} badge={work.badge} thumb={work.thumb} />
                </div>
                <h3 className="wtitle">{work.title}</h3>
                <p className="wdesc">{work.description}</p>
                <div className="chips">
                  {work.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="wfoot">
                  {work.hasCaseStudy ? (
                    <Link className="wfoot-a" href={href}>
                      <PlusCircle />
                      概要を見る
                    </Link>
                  ) : (
                    <a className="wfoot-a" href={href}>
                      <PlusCircle />
                      概要を見る
                    </a>
                  )}
                  {work.hasCaseStudy ? (
                    <Link className="wfoot-b" href={href}>
                      {work.footRight} <ArrowRight />
                    </Link>
                  ) : (
                    <a className="wfoot-b" href={href}>
                      {work.footRight} <ArrowRight />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
          {visibleCount === 0 && <div className="works-empty">該当するプロジェクトはありません。</div>}
        </div>

        <aside className="filter">
          <div className="filter-sec">
            <span className="filter-sectitle">カテゴリ</span>
            <span className="sec-rule" />
          </div>
          <div className="filter-list">
            {workCategories.map((cat) => (
              <label
                key={cat.key}
                className={`filter-row${curCat === cat.key ? " active" : ""}`}
                onClick={() => setCurCat(cat.key)}
              >
                <span className="radio" />
                <span className="filter-label">{cat.label}</span>
                <span className="filter-n">{catCount(cat.key)}</span>
              </label>
            ))}
          </div>
          <div className="filter-sec" style={{ marginTop: 22 }}>
            <span className="filter-sectitle">技術タグ</span>
            <span className="sec-rule" />
            {selTags.size > 0 && (
              <button className="tag-clear" onClick={() => setSelTags(new Set())}>
                クリア
              </button>
            )}
          </div>
          <div className="tagfilter">
            {tagOrder.map(({ tag, count }) => (
              <button
                key={tag}
                className={`tagchip${selTags.has(tag) ? " active" : ""}`}
                onClick={() => toggleTag(tag)}
              >
                {tag} <span className="tc-n">{count}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
