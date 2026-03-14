import Image from "next/image";

import { JsonLd } from "@/components/json-ld";
import { SectionCard } from "@/components/section-card";
import { SocialIcon } from "@/components/social-icon";
import {
  education,
  hero,
  projectItems,
  researchItems,
  siteConfig,
  socialLinks,
  walkingItems,
  workItems,
} from "@/content/site-data";
import { createPageMetadata, getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = createPageMetadata(
  siteConfig.title,
  siteConfig.description,
  "/",
);

export default function HomePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    description: siteConfig.description,
    url: getSiteUrl().toString(),
    alumniOf: education.institution,
    knowsAbout: [
      "Software engineering",
      "Research",
      "Product-minded systems",
      "Machine learning",
      "Walking",
    ],
  };

  return (
    <>
      <JsonLd data={personSchema} />

      <div className="landing-page">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="hero__eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title" className="hero__title">
              {hero.title}
            </h1>
            <p className="hero__intro">{hero.intro}</p>
          </div>

          <div className="hero__portrait-card">
            <div className="hero__portrait-frame">
              <Image
                src="/portrait-placeholder.svg"
                alt="Portrait placeholder for Chittem"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                priority
              />
            </div>
            <div className="hero__portrait-caption">
              <strong>Portrait placeholder</strong>
              <span>Swap this with your final photo when ready.</span>
            </div>
          </div>
        </section>

        <section id="work" className="content-section" aria-labelledby="work-title">
          <div className="section-header">
            <p className="section-header__eyebrow">Work experience</p>
            <h2 id="work-title" className="section-header__title">
              Internships and roles that shaped how I build.
            </h2>
            <p className="section-header__summary">
              Each card expands into a detail page so the site stays scannable up
              front and still supports deeper reading.
            </p>
          </div>

          <div className="card-grid">
            {workItems.map((item) => (
              <SectionCard
                key={item.slug}
                href={`/work/${item.slug}`}
                eyebrow={item.role}
                title={item.company}
                summary={item.summary}
                meta={[item.period, item.location]}
                tags={item.tags}
              />
            ))}
          </div>
        </section>

        <section id="education" className="content-section" aria-labelledby="education-title">
          <div className="section-header">
            <p className="section-header__eyebrow">Education</p>
            <h2 id="education-title" className="section-header__title">
              A campus chapter with room for both academics and communities.
            </h2>
            <p className="section-header__summary">{education.summary}</p>
          </div>

          <article className="education-card">
            <div>
              <p className="education-card__eyebrow">{education.institution}</p>
              <h3 className="education-card__title">{education.degree}</h3>
              <p className="education-card__period">{education.period}</p>
            </div>
            <div className="education-card__highlights">
              {education.highlights.map((item) => (
                <span key={item} className="pill pill--soft">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section id="projects" className="content-section" aria-labelledby="projects-title">
          <div className="section-header">
            <p className="section-header__eyebrow">Projects</p>
            <h2 id="projects-title" className="section-header__title">
              Side builds with a mix of curiosity, systems thinking, and taste.
            </h2>
            <p className="section-header__summary">
              The summaries live in plain HTML so the work stays crawlable and easy
              to parse, even before someone clicks deeper.
            </p>
          </div>

          <div className="card-grid">
            {projectItems.map((item) => (
              <SectionCard
                key={item.slug}
                href={`/projects/${item.slug}`}
                eyebrow={item.period}
                title={item.title}
                summary={item.summary}
                meta={[item.period]}
                tags={item.stack}
              />
            ))}
          </div>
        </section>

        <section id="research" className="content-section" aria-labelledby="research-title">
          <div className="section-header">
            <p className="section-header__eyebrow">Research</p>
            <h2 id="research-title" className="section-header__title">
              Publications presented in a way that is readable, not just formal.
            </h2>
            <p className="section-header__summary">
              This section is designed for both recruiters and technical readers:
              short summaries on the landing page, fuller context on each paper page.
            </p>
          </div>

          <div className="card-grid card-grid--two">
            {researchItems.map((item) => (
              <SectionCard
                key={item.slug}
                href={`/research/${item.slug}`}
                eyebrow={item.publication}
                title={item.title}
                summary={item.summary}
                meta={[item.year]}
                tags={item.keywords}
              />
            ))}
          </div>
        </section>

        <section id="walking" className="content-section" aria-labelledby="walking-title">
          <div className="section-header">
            <p className="section-header__eyebrow">Walking</p>
            <h2 id="walking-title" className="section-header__title">
              A quiet photo-album section for the walks that keep everything else in balance.
            </h2>
            <p className="section-header__summary">
              This part stays lightweight on purpose. It makes the site feel human
              without pulling attention away from the work.
            </p>
          </div>

          <div className="card-grid">
            {walkingItems.map((item) => (
              <SectionCard
                key={item.slug}
                href={`/walking/${item.slug}`}
                eyebrow={item.location}
                title={item.title}
                summary={item.summary}
                meta={[item.season]}
                image={{ src: item.image, alt: `${item.title} placeholder artwork` }}
              />
            ))}
          </div>
        </section>

        <section id="socials" className="content-section" aria-labelledby="socials-title">
          <div className="section-header">
            <p className="section-header__eyebrow">Socials</p>
            <h2 id="socials-title" className="section-header__title">
              Find me elsewhere.
            </h2>
          </div>

          <div className="social-grid">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="social-card"
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                <span className="social-card__lead">
                  <span className="social-card__icon">
                    <SocialIcon icon={item.icon} />
                  </span>
                  <span className="social-card__copy">
                    <span className="social-card__label">{item.label}</span>
                    <strong>{item.handle}</strong>
                  </span>
                </span>
                <span className="social-card__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
