import { DetailPage } from "@/components/detail-page";
import { education } from "@/content/site-data";
import { createPageMetadata } from "@/lib/site";

export const dynamic = "force-static";

export const metadata = createPageMetadata(
  `${education.institution} — Education`,
  education.summary,
  "/education",
);

export default function EducationPage() {
  return (
    <DetailPage
      backHref="/#education"
      backLabel="Back to education"
      eyebrow={education.institution}
      title={education.degree}
      summary={education.summary}
      meta={[education.period, education.institution]}
      paragraphs={education.narrative}
      sections={education.sections}
    />
  );
}
