import { buildProfileText } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildProfileText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

