import Image from "next/image";
import Link from "next/link";

import type { EntryLink } from "@/content/site-data";

type DetailPageProps = {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta: string[];
  tags?: string[];
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
  tags,
  paragraphs,
  bullets,
  links,
  image,
}: DetailPageProps) {
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
          <div className="detail-hero__meta" aria-label={`${title} details`}>
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        {image ? (
          <div className="detail-hero__media">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
        ) : null}
      </div>

      <div className="detail-layout">
        <aside className="detail-sidebar">
          {tags?.length ? (
            <section className="detail-sidebar__panel">
              <p className="detail-sidebar__title">Focus</p>
              <div className="detail-sidebar__tags">
                {tags.map((tag) => (
                  <span key={tag} className="detail-sidebar__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {links?.length ? (
            <section className="detail-sidebar__panel">
              <p className="detail-sidebar__title">Links</p>
              <div className="detail-sidebar__links">
                {links.map((link) => (
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
          ) : null}
        </aside>

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
