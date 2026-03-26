import { notFound } from "next/navigation";

import { DetailPage } from "@/components/detail-page";
import { projectItems } from "@/content/site-data";
import { createPageMetadata, getProjectItem } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return projectItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getProjectItem(slug);

  if (!item) {
    return {};
  }

  return createPageMetadata(item.title, item.summary, `/projects/${item.slug}`);
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getProjectItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <DetailPage
      backHref="/#projects"
      backLabel="Back to projects"
      eyebrow="Project"
      title={item.title}
      summary={item.summary}
      paragraphs={item.narrative}
      media={item.media}
      links={item.links}
    />
  );
}
