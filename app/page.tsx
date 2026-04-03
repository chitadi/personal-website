import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import bitsLogo from "@/app/figs/BITS_university_logo.gif";
import campusFundLogo from "@/app/figs/cf_logo.png";
import googleLogo from "@/app/figs/Google-logo.png";
import oracleLogo from "@/app/figs/Oracle_logo.svg.png";
import heroPortrait from "@/app/figs/pfp.jpeg";
import { JsonLd } from "@/components/json-ld";
import { MobileSlideCarousel } from "@/components/mobile-slide-carousel";
import { ProjectsCarousel } from "@/components/projects-carousel";
import { SectionCard } from "@/components/section-card";
import { SocialIcon } from "@/components/social-icon";
import {
  education,
  hero,
  projectItems,
  researchItems,
  siteConfig,
  socialLinks,
  workItems,
} from "@/content/site-data";
import { createPageMetadata, getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = createPageMetadata(
  siteConfig.title,
  siteConfig.description,
  "/",
);

const workLogoBySlug: Record<
  string,
  { src: StaticImageData; alt: string; className?: string }
> = {
  google: {
    src: googleLogo,
    alt: "Google",
    className: "card__title-logo--google",
  },
  oracle: {
    src: oracleLogo,
    alt: "Oracle",
  },
  "campus-fund": {
    src: campusFundLogo,
    alt: "Campus Fund",
    className: "card__title-logo--campus-fund",
  },
};

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
    ],
  };

  return (
    <>
      <JsonLd data={personSchema} />

      <div className="landing-page">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            {hero.eyebrow ? <p className="hero__eyebrow">{hero.eyebrow}</p> : null}
            <h1 id="hero-title" className="hero__title">
              {hero.title}
            </h1>
            <p className="hero__intro hero__intro--desktop">{hero.intro}</p>
            <p className="hero__intro hero__intro--mobile">{hero.introMobile ?? hero.intro}</p>
          </div>

          <div className="hero__portrait-card">
            <div className="hero__portrait-frame">
              <Image
                src={heroPortrait}
                alt="Portrait of Adithya Chittem"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </section>

        <section id="work" className="content-section" aria-labelledby="work-title">
          <div className="section-header">
            <p className="section-header__eyebrow">Work experience</p>
            <h2 id="work-title" className="section-header__title">
              My professional journey so far (try clicking the cards!)
            </h2>
          </div>

          <div className="card-grid mobile-grid-only">
            {workItems.map((item) => (
              <SectionCard
                key={item.slug}
                href={`/work/${item.slug}`}
                eyebrow={item.role}
                title={item.company}
                titleLogo={workLogoBySlug[item.slug]}
                summary={item.summary}
                meta={[item.period, item.location]}
              />
            ))}
          </div>

          <div className="mobile-carousel-only">
            <MobileSlideCarousel
              ariaLabel="Work experience cards"
              dotLabelPrefix="work card"
              slideKeys={workItems.map((item) => item.slug)}
              slides={workItems.map((item) => (
                <SectionCard
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  eyebrow={item.role}
                  title={item.company}
                  titleLogo={workLogoBySlug[item.slug]}
                  summary={item.summary}
                  meta={[item.period, item.location]}
                />
              ))}
            />
          </div>
        </section>

        <section id="education" className="content-section" aria-labelledby="education-title">
          <div className="section-header">
            <p className="section-header__eyebrow">Education</p>
            <h2 id="education-title" className="section-header__title">
              Can't say I'd do it all over again
            </h2>
          </div>

          <Link href="/education" className="education-card education-card--interactive">
            <div>
              <div className="education-card__institution">
                <Image
                  src={bitsLogo}
                  alt="BITS Pilani"
                  className="education-card__institution-logo"
                />
                <p className="education-card__eyebrow">{education.institution}</p>
              </div>
              <h3 className="education-card__title">{education.degree}</h3>
              <p className="education-card__period">{education.period}</p>
              <p className="education-card__summary education-card__summary--desktop">
                {education.summary}
              </p>
              <p className="education-card__summary education-card__summary--mobile">
                {education.summaryMobile ?? education.summary}
              </p>
            </div>
          </Link>
        </section>

        <section id="research" className="content-section" aria-labelledby="research-title">
          <div className="section-header section-header--wide">
            <p className="section-header__eyebrow">Research</p>
            <h2 id="research-title" className="section-header__title">
              I've written some papers over the last year (i think they are very cool)
            </h2>
          </div>

          <div className="card-grid card-grid--two mobile-grid-only">
            {researchItems.map((item) => (
              <article key={item.slug} className="card card--research card--interactive card--full-link">
                <div className="card__content card__content--research">
                  <h3 className="card__title">{item.title}</h3>
                  <div className="card__research-meta">
                    {item.links?.[0]?.href ? (
                      <a
                        href={item.links[0].href}
                        className="text-link card__link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.publication}
                      </a>
                    ) : null}
                    <span className="card__research-year">{item.year}</span>
                  </div>
                  <p className="card__summary card__summary--compact">{item.summary}</p>
                </div>
                <Link
                  href={`/research/${item.slug}`}
                  className="card__cover-link"
                  aria-label={`Read research item: ${item.title}`}
                />
              </article>
            ))}
          </div>

          <div className="mobile-carousel-only">
            <MobileSlideCarousel
              ariaLabel="Research cards"
              dotLabelPrefix="research card"
              slideKeys={researchItems.map((item) => item.slug)}
              slides={researchItems.map((item) => (
                <article
                  key={item.slug}
                  className="card card--research card--interactive card--full-link"
                >
                  <div className="card__content card__content--research">
                    <h3 className="card__title">{item.title}</h3>
                    <div className="card__research-meta">
                      {item.links?.[0]?.href ? (
                        <a
                          href={item.links[0].href}
                          className="text-link card__link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.publication}
                        </a>
                      ) : null}
                      <span className="card__research-year">{item.year}</span>
                    </div>
                    <p className="card__summary card__summary--compact">
                      {item.summaryMobile ?? item.summary}
                    </p>
                  </div>
                  <Link
                    href={`/research/${item.slug}`}
                    className="card__cover-link"
                    aria-label={`Read research item: ${item.title}`}
                  />
                </article>
              ))}
            />
          </div>
        </section>

        <section id="projects" className="content-section" aria-labelledby="projects-title">
          <div className="section-header section-header--wide">
            <p className="section-header__eyebrow">Projects</p>
            <h2 id="projects-title" className="section-header__title">
              "Are you really living if you dont have 10 pending side projects?"
            </h2>
          </div>

          <ProjectsCarousel items={projectItems} />
        </section>

        <section id="socials" className="content-section" aria-labelledby="socials-title">
          <div className="section-header">
            <p className="section-header__eyebrow">Socials</p>
            <h2 id="socials-title" className="section-header__title">
              Get in touch with me!
            </h2>
          </div>

          <div className="social-links" aria-label="Social links">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="social-link"
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                <span className="social-link__icon" aria-hidden="true">
                  <SocialIcon icon={item.icon} />
                </span>
                <span className="social-link__label">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
