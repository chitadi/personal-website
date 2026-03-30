import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { DetailMedia, DetailParagraph, DetailSection, EntryLink } from "@/content/site-data";

type DetailPageProps = {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta?: string[];
  paragraphs: DetailParagraph[];
  sections?: DetailSection[];
  links?: EntryLink[];
  media?: DetailMedia[];
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

function getYouTubeVideoId(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const [videoId] = url.pathname.split("/").filter(Boolean);
      return videoId ?? null;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      const [section, videoId] = url.pathname.split("/").filter(Boolean);
      if ((section === "embed" || section === "shorts" || section === "live") && videoId) {
        return videoId;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function getYouTubeEmbedUrl(src: string): string {
  const videoId = getYouTubeVideoId(src);

  if (!videoId) {
    return src;
  }

  return `https://www.youtube.com/embed/${videoId}?rel=0`;
}

function renderDetailParagraph(paragraph: DetailParagraph, key: string): ReactNode {
  if (typeof paragraph === "string") {
    return <p key={key}>{renderParagraphWithLinks(paragraph)}</p>;
  }

  return (
    <figure key={key} className="detail-main__media">
      <div
        className="detail-main__image-wrap"
        style={paragraph.aspectRatio ? { aspectRatio: paragraph.aspectRatio } : undefined}
      >
        <Image
          src={paragraph.src}
          alt={paragraph.alt}
          fill
          sizes="(max-width: 900px) 100vw, 60vw"
          className="detail-main__image"
        />
      </div>
      {paragraph.caption ? (
        <figcaption className="detail-main__media-caption">{paragraph.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function DetailPage({
  backHref,
  backLabel,
  eyebrow,
  title,
  summary,
  meta,
  paragraphs,
  sections,
  links,
  media,
  image,
}: DetailPageProps) {
  const hasSidebar = Boolean(links?.length);
  const sidebarLinks = links ?? [];
  const hasMeta = Boolean(meta?.length);
  const mediaItems = media ?? [];
  const sectionItems = sections ?? [];

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
            {paragraphs.length ? (
              <div className="detail-main__prose">
                {paragraphs.map((paragraph, index) =>
                  renderDetailParagraph(paragraph, `paragraph-${index}`),
                )}
              </div>
            ) : null}
            {sectionItems.length ? (
              <div className="detail-main__sections">
                {sectionItems.map((section, sectionIndex) => {
                  const sectionHeadingId = `detail-section-${sectionIndex}`;

                  return (
                    <section
                      key={`${section.title}-${sectionIndex}`}
                      className="detail-main__section"
                      aria-labelledby={sectionHeadingId}
                    >
                      <h2 id={sectionHeadingId} className="detail-main__section-title">
                        {section.title}
                      </h2>
                      <div className="detail-main__prose detail-main__section-prose">
                        {section.paragraphs.map((paragraph, paragraphIndex) =>
                          renderDetailParagraph(
                            paragraph,
                            `section-${sectionIndex}-paragraph-${paragraphIndex}`,
                          ),
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : null}
            {mediaItems.map((item, index) => {
              if (item.type === "video") {
                return (
                  <figure key={`${item.src}-${index}`} className="detail-main__media">
                    <video
                      className="detail-main__video"
                      src={item.src}
                      controls={item.controls ?? true}
                      muted={item.muted ?? true}
                      autoPlay={item.autoPlay ?? false}
                      loop={item.loop ?? false}
                      playsInline
                      preload="metadata"
                    />
                    {item.caption ? (
                      <figcaption className="detail-main__media-caption">{item.caption}</figcaption>
                    ) : null}
                  </figure>
                );
              }

              if (item.type === "youtube") {
                const embedUrl = getYouTubeEmbedUrl(item.src);

                return (
                  <figure key={`${item.src}-${index}`} className="detail-main__media">
                    <iframe
                      className="detail-main__video detail-main__youtube"
                      src={embedUrl}
                      title={item.title ?? item.caption ?? "YouTube video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      loading="lazy"
                      allowFullScreen
                    />
                    {item.caption ? (
                      <figcaption className="detail-main__media-caption">{item.caption}</figcaption>
                    ) : null}
                  </figure>
                );
              }

              return null;
            })}
          </section>
        </div>
      </div>
    </article>
  );
}
