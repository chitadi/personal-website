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

const FALLBACK_SITE_URL = "https://example.com";

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    FALLBACK_SITE_URL;

  const normalized = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  try {
    return new URL(normalized);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
) {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}

export function getAllStaticPaths() {
  return [
    "/",
    ...workItems.map((item) => `/work/${item.slug}`),
    ...projectItems.map((item) => `/projects/${item.slug}`),
    ...researchItems.map((item) => `/research/${item.slug}`),
    ...walkingItems.map((item) => `/walking/${item.slug}`),
  ];
}

export function getWorkItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getProjectItem(slug: string) {
  return projectItems.find((item) => item.slug === slug);
}

export function getResearchItem(slug: string) {
  return researchItems.find((item) => item.slug === slug);
}

export function getWalkingItem(slug: string) {
  return walkingItems.find((item) => item.slug === slug);
}

export function buildProfileText() {
  const lines: string[] = [];

  lines.push(`${siteConfig.fullName} — ${siteConfig.title}`);
  lines.push(siteConfig.description);
  lines.push("");
  lines.push(hero.title);
  lines.push(hero.intro);
  lines.push("");
  lines.push("Education");
  lines.push(`${education.institution} | ${education.degree}`);
  lines.push(education.summary);
  lines.push(`Highlights: ${education.highlights.join(", ")}`);
  lines.push("");
  lines.push("Work");
  workItems.forEach((item) => {
    lines.push(`${item.company} | ${item.role}`);
    lines.push(item.summary);
    lines.push(`Highlights: ${item.highlights.join(" | ")}`);
  });
  lines.push("");
  lines.push("Projects");
  projectItems.forEach((item) => {
    lines.push(`${item.title} | ${item.period}`);
    lines.push(item.summary);
    lines.push(`Highlights: ${item.highlights.join(" | ")}`);
  });
  lines.push("");
  lines.push("Research");
  researchItems.forEach((item) => {
    lines.push(`${item.title} | ${item.publication}`);
    lines.push(item.summary);
  });
  lines.push("");
  lines.push("Walking");
  walkingItems.forEach((item) => {
    lines.push(`${item.title} | ${item.location}`);
    lines.push(item.summary);
  });
  lines.push("");
  lines.push("Socials");
  socialLinks.forEach((item) => {
    lines.push(`${item.label}: ${item.handle}`);
  });

  return lines.join("\n");
}
