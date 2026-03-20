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

type EntryLinkLike = {
  label: string;
  href: string;
};

function isEntryLinkLike(value: unknown): value is EntryLinkLike {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "label" in value &&
    "href" in value &&
    typeof value.label === "string" &&
    typeof value.href === "string"
  );
}

function formatFieldName(field: string) {
  return field
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatFieldValues(value: unknown): string[] {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized ? [normalized] : [];
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => {
      if (typeof entry === "string") {
        const normalized = entry.trim();
        return normalized ? [normalized] : [];
      }

      if (typeof entry === "number" || typeof entry === "boolean") {
        return [String(entry)];
      }

      if (isEntryLinkLike(entry)) {
        return [`${entry.label}: ${entry.href}`];
      }

      if (entry && typeof entry === "object") {
        return [JSON.stringify(entry)];
      }

      return [];
    });
  }

  if (isEntryLinkLike(value)) {
    return [`${value.label}: ${value.href}`];
  }

  if (value && typeof value === "object") {
    return [JSON.stringify(value)];
  }

  return [];
}

function appendDataBlock(
  lines: string[],
  heading: string,
  path: string,
  data: Record<string, unknown>,
) {
  lines.push(heading);
  lines.push(`Path: ${path}`);

  Object.entries(data).forEach(([field, value]) => {
    const values = formatFieldValues(value);

    if (!values.length) {
      return;
    }

    const label = formatFieldName(field);

    if (values.length === 1) {
      lines.push(`${label}: ${values[0]}`);
      return;
    }

    lines.push(`${label}:`);
    values.forEach((entry) => {
      lines.push(`- ${entry}`);
    });
  });

  lines.push("");
}

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
    "/education",
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
  const siteUrl = getSiteUrl();

  lines.push("ChittemGPT Website Knowledge Base");
  lines.push(`Site URL: ${siteUrl.origin}`);
  lines.push(
    "Use this context to answer questions about Adithya Chittem and the website content.",
  );
  lines.push("");

  lines.push("Available Paths");
  getAllStaticPaths().forEach((path) => {
    lines.push(`- ${path}`);
  });
  lines.push("");

  appendDataBlock(lines, "Site Profile", "/", siteConfig);
  appendDataBlock(lines, "Hero Section", "/", hero);
  appendDataBlock(lines, "Education", "/education", education);

  lines.push("Work Cards");
  lines.push("");
  workItems.forEach((item, index) => {
    appendDataBlock(
      lines,
      `${index + 1}. ${item.company} (${item.role})`,
      `/work/${item.slug}`,
      item,
    );
  });

  lines.push("Project Cards");
  lines.push("");
  projectItems.forEach((item, index) => {
    appendDataBlock(lines, `${index + 1}. ${item.title}`, `/projects/${item.slug}`, item);
  });

  lines.push("Research Cards");
  lines.push("");
  researchItems.forEach((item, index) => {
    appendDataBlock(
      lines,
      `${index + 1}. ${item.title}`,
      `/research/${item.slug}`,
      item,
    );
  });

  lines.push("Walking Cards");
  lines.push("");
  walkingItems.forEach((item, index) => {
    appendDataBlock(lines, `${index + 1}. ${item.title}`, `/walking/${item.slug}`, item);
  });

  lines.push("Social Links");
  lines.push("");
  socialLinks.forEach((item, index) => {
    appendDataBlock(lines, `${index + 1}. ${item.label}`, "/#socials", item);
  });

  return lines.join("\n");
}
