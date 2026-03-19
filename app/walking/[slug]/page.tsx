import { notFound } from "next/navigation";

import { DetailPage } from "@/components/detail-page";
import { walkingItems } from "@/content/site-data";
import { createPageMetadata, getWalkingItem } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return walkingItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWalkingItem(slug);

  if (!item) {
    return {};
  }

  return createPageMetadata(item.title, item.summary, `/walking/${item.slug}`);
}

export default async function WalkingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWalkingItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <DetailPage
      backHref="/"
      backLabel="Back to home"
      eyebrow={item.location}
      title={item.title}
      summary={item.summary}
      meta={[item.season]}
      paragraphs={item.notes}
      image={{ src: item.image, alt: `${item.title} placeholder artwork` }}
    />
  );
}
