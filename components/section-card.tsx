import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type SectionCardProps = {
  href: string;
  eyebrow?: string;
  title: string;
  titleLogo?: {
    src: StaticImageData;
    alt: string;
    className?: string;
  };
  summary: string;
  meta?: string[];
  image?: {
    src: string;
    alt: string;
  };
};

export function SectionCard({
  href,
  eyebrow,
  title,
  titleLogo,
  summary,
  meta,
  image,
}: SectionCardProps) {
  const hasEyebrow = Boolean(eyebrow);
  const hasMeta = Boolean(meta?.length);

  return (
    <Link href={href} className="card card--interactive">
      {image ? (
        <div className="card__media">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 30vw" />
        </div>
      ) : null}
      <div className="card__content">
        {hasEyebrow ? <p className="card__eyebrow">{eyebrow}</p> : null}
        {hasMeta ? (
          <div className="card__meta">
            {meta?.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ) : null}
        {titleLogo ? (
          <h3 className="card__title card__title--logo">
            <span className={`card__title-logo-shell ${titleLogo.className ?? ""}`.trim()}>
              <Image
                src={titleLogo.src}
                alt={titleLogo.alt}
                fill
                sizes="(max-width: 900px) 65vw, 320px"
                className="card__title-logo-image"
              />
            </span>
          </h3>
        ) : (
          <h3 className="card__title">{title}</h3>
        )}
        <p className="card__summary">{summary}</p>
      </div>
    </Link>
  );
}
