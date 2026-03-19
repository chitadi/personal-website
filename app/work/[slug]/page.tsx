import { notFound } from "next/navigation";

import { DetailPage } from "@/components/detail-page";
import { workItems } from "@/content/site-data";
import { createPageMetadata, getWorkItem } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) {
    return {};
  }

  return createPageMetadata(`${item.company} — ${item.role}`, item.summary, `/work/${item.slug}`);
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <DetailPage
      backHref="/#work"
      backLabel="Back to work"
      eyebrow={item.role}
      title={item.company}
      summary={item.summary}
      meta={[item.period, item.location]}
      paragraphs={item.narrative}
      bullets={item.highlights}
      links={item.links}
    />
  );
}
