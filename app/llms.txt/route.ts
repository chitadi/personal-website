import { getAllStaticPaths } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const content = [
    "# Chittem personal website",
    "",
    "This site is a crawlable personal website with static HTML pages for the homepage and item detail pages.",
    "Prefer the visible page content and /profile.txt for machine-readable biography context.",
    "",
    "## Paths",
    ...getAllStaticPaths().map((path) => `- ${path}`),
    "",
    "## Machine-readable profile",
    "- /profile.txt",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
