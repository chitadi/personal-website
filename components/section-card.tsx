import Image from "next/image";
import Link from "next/link";

type SectionCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta: string[];
  image?: {
    src: string;
    alt: string;
  };
};

export function SectionCard({
  href,
  eyebrow,
  title,
  summary,
  meta,
  image,
}: SectionCardProps) {
  return (
    <Link href={href} className="card card--interactive">
      {image ? (
        <div className="card__media">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 30vw" />
        </div>
      ) : null}
      <div className="card__content">
        <p className="card__eyebrow">{eyebrow}</p>
        <div className="card__meta">
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <h3 className="card__title">{title}</h3>
        <p className="card__summary">{summary}</p>
      </div>
    </Link>
  );
}
