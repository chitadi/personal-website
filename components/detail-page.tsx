import Image from "next/image";
import Link from "next/link";

import type { EntryLink } from "@/content/site-data";

type DetailPageProps = {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta?: string[];
  paragraphs: string[];
  bullets?: string[];
  links?: EntryLink[];
  image?: {
    src: string;
    alt: string;
  };
};

export function DetailPage({
  backHref,
  backLabel,
  eyebrow,
  title,
  summary,
  meta,
  paragraphs,
  bullets,
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
            {backLabel}
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
            <p className="detail-main__eyebrow">Overview</p>
            <div className="detail-main__prose">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {bullets?.length ? (
            <section className="detail-main__panel">
              <p className="detail-main__eyebrow">Highlights</p>
              <ul className="detail-main__list">
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
