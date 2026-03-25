import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { EntryLink } from "@/content/site-data";

type DetailPageProps = {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta?: string[];
  paragraphs: string[];
  links?: EntryLink[];
  image?: {
    src: string;
    alt: string;
  };
};

function renderParagraphWithLinks(paragraph: string): ReactNode {
  const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(paragraph)) !== null) {
    const [fullMatch, label, href] = match;

    if (match.index > lastIndex) {
      parts.push(paragraph.slice(lastIndex, match.index));
    }

    const isExternal = href.startsWith("http://") || href.startsWith("https://");

    parts.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        className="detail-main__inline-link"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        {label}
      </a>,
    );

    lastIndex = match.index + fullMatch.length;
  }

  if (parts.length === 0) {
    return paragraph;
  }

  if (lastIndex < paragraph.length) {
    parts.push(paragraph.slice(lastIndex));
  }

  return parts;
}

export function DetailPage({
  backHref,
  backLabel,
  eyebrow,
  title,
  summary,
  meta,
  paragraphs,
  links,
  image,
}: DetailPageProps) {
  const hasSidebar = Boolean(links?.length);
  const sidebarLinks = links ?? [];
  const hasMeta = Boolean(meta?.length);

  return (
    <article className="detail-page">
      <div className={`detail-hero ${image ? "" : "detail-hero--single"}`}>
        <div className="detail-hero__copy">
          <Link href={backHref} className="detail-hero__back">
            <span className="detail-hero__back-icon" aria-hidden="true">
              &larr;
            </span>
            <span>{backLabel}</span>
          </Link>
          <p className="detail-hero__eyebrow">{eyebrow}</p>
          <h1 className="detail-hero__title">{title}</h1>
          <p className="detail-hero__summary">{summary}</p>
          {hasMeta ? (
            <div className="detail-hero__meta" aria-label={`${title} details`}>
              {meta?.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
        </div>
        {image ? (
          <div className="detail-hero__media">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
        ) : null}
      </div>

      <div className={`detail-layout ${hasSidebar ? "" : "detail-layout--single"}`}>
        {hasSidebar ? (
          <aside className="detail-sidebar">
            <section className="detail-sidebar__panel">
              <p className="detail-sidebar__title">Links</p>
              <div className="detail-sidebar__links">
                {sidebarLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-link"
                    target={link.href.startsWith("/") ? undefined : "_blank"}
                    rel={link.href.startsWith("/") ? undefined : "noreferrer"}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          </aside>
        ) : null}

        <div className="detail-main">
          <section className="detail-main__panel">
            <div className="detail-main__prose">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{renderParagraphWithLinks(paragraph)}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
