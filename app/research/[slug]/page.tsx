import { notFound } from "next/navigation";

import { DetailPage } from "@/components/detail-page";
import { JsonLd } from "@/components/json-ld";
import { researchItems, siteConfig } from "@/content/site-data";
import { createPageMetadata, getResearchItem } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return researchItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getResearchItem(slug);

  if (!item) {
    return {};
  }

  return createPageMetadata(item.title, item.summary, `/research/${item.slug}`);
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getResearchItem(slug);

  if (!item) {
    notFound();
  }

  const scholarlyArticleSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: item.title,
    description: item.summary,
    author: {
      "@type": "Person",
      name: siteConfig.fullName,
    },
    isPartOf: {
      "@type": "PublicationIssue",
      name: item.publication,
    },
    datePublished: item.year,
  };

  return (
    <>
      <JsonLd data={scholarlyArticleSchema} />
      <DetailPage
        backHref="/#research"
        backLabel="Back to research"
        eyebrow={item.publication}
        title={item.title}
        summary={item.summary}
        meta={[item.year]}
        tags={item.keywords}
        paragraphs={item.abstract}
        bullets={item.highlights}
        links={item.links}
      />
    </>
  );
}
