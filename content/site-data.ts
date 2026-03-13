export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type EntryLink = {
  label: string;
  href: string;
};

export type WorkItem = {
  slug: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  tags: string[];
  highlights: string[];
  narrative: string[];
  links?: EntryLink[];
};

export type ProjectItem = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  stack: string[];
  highlights: string[];
  narrative: string[];
  links?: EntryLink[];
};

export type ResearchItem = {
  slug: string;
  title: string;
  publication: string;
  year: string;
  summary: string;
  keywords: string[];
  highlights: string[];
  abstract: string[];
  links?: EntryLink[];
};

export type WalkingItem = {
  slug: string;
  title: string;
  location: string;
  season: string;
  summary: string;
  image: string;
  notes: string[];
};

export const siteConfig = {
  name: "Chittem",
  fullName: "Chittem",
  title: "Engineer, researcher, and builder",
  description:
    "A warm, editorial personal website about work, projects, research, and the long walks that tie it all together.",
  email: "hello@replace-this.dev",
};

export const hero = {
  eyebrow: "Introduction",
  title: "Chittem",
  intro:
    "Write your introduction here in your own voice. Keep it honest, direct, and simple. This space should read like you, not like a headline.",
};

export const education = {
  institution: "BITS Pilani",
  degree: "Degree details to be added",
  period: "Expected graduation details to be added",
  summary:
    "Education snapshot placeholder. Replace with your degree, academic focus, and the through-line between the campus communities you invested in.",
  highlights: ["180 Degrees Consulting", "CEL", "BOSPO", "Student Senate"],
};

export const workItems: WorkItem[] = [
  {
    slug: "cloudflare",
    company: "Cloudflare",
    role: "Role details to be added",
    period: "Timeline to be added",
    location: "Location to be added",
    summary:
      "A placeholder summary for your Cloudflare experience. Replace this with the systems you worked on, the kind of scale involved, and the outcome you are proudest of.",
    tags: ["Infrastructure", "Scale", "Placeholder"],
    highlights: [
      "Explain the problem space in one sharp sentence.",
      "Call out the most interesting technical constraint.",
      "Describe the measurable or visible impact.",
    ],
    narrative: [
      "Use this page to explain the scope of the work clearly and without resume shorthand. A recruiter should understand what kind of systems you touched after one skim.",
      "You can also use this space to highlight how you approached ambiguity, ownership, and collaboration. That usually reads stronger than a raw task list.",
    ],
  },
  {
    slug: "google",
    company: "Google",
    role: "Role details to be added",
    period: "Timeline to be added",
    location: "Location to be added",
    summary:
      "A placeholder summary for your Google experience. Replace it with the product area, the engineering challenge, and the part that best reflects your taste and judgment.",
    tags: ["Product", "Systems", "Placeholder"],
    highlights: [
      "Summarize the team or product context.",
      "Mention the tradeoff that shaped your solution.",
      "Describe what changed because you did the work.",
    ],
    narrative: [
      "This detail page is built to carry more nuance than a bullet point. Use it for a concise story about what the team needed, how you responded, and what you learned.",
      "If there was a tension between speed, correctness, and user experience, that is often the most interesting part to write about.",
    ],
  },
  {
    slug: "oracle",
    company: "Oracle",
    role: "Role details to be added",
    period: "Timeline to be added",
    location: "Location to be added",
    summary:
      "A placeholder summary for your Oracle experience. Replace this with the domain, your contribution, and the practical engineering depth behind the work.",
    tags: ["Enterprise", "Execution", "Placeholder"],
    highlights: [
      "Identify the business or platform context.",
      "Explain what you owned directly.",
      "Show how the work became reliable or useful.",
    ],
    narrative: [
      "This section is a good place to explain the engineering baseline you worked within: team size, codebase maturity, and how you handled existing constraints.",
      "You can also anchor the page with one detail that makes the experience memorable, not just impressive.",
    ],
  },
];

export const projectItems: ProjectItem[] = [
  {
    slug: "cel-newsletter",
    title: "CEL Newsletter",
    period: "Campus project",
    summary:
      "A newsletter workflow for campus updates, community stories, and consistent publication. This is a good place to show product judgment in a scrappy setting.",
    stack: ["Editorial workflow", "Automation", "Distribution"],
    highlights: [
      "How the content pipeline worked from idea to issue.",
      "What was automated or made easier.",
      "How you measured whether readers cared.",
    ],
    narrative: [
      "Explain why the newsletter mattered, who it served, and what felt broken before you built the workflow.",
      "You can use the rest of the page to walk through the system design, the publishing process, and the small choices that made the output more dependable.",
    ],
  },
  {
    slug: "mcp-server",
    title: "MCP Server",
    period: "Side project",
    summary:
      "An experiment in tool-using LLM workflows through an MCP server. This is the project to make your taste in interfaces, context design, and agent ergonomics visible.",
    stack: ["LLMs", "Tooling", "Backend"],
    highlights: [
      "What tools or resources the server exposed.",
      "How you shaped the interface for reliability.",
      "What the experiment taught you about agent workflows.",
    ],
    narrative: [
      "Use this page to explain the architecture and the human problem it was meant to solve. The most useful detail is usually why this needed to exist in the first place.",
      "A crisp diagram or linked demo can come later, but the text should already communicate the point of view behind the build.",
    ],
  },
  {
    slug: "cnn-from-scratch",
    title: "CNN From Scratch",
    period: "Learning project",
    summary:
      "A from-first-principles implementation of a convolutional neural network. The strength here is clarity: what you rebuilt, why, and what understanding it gave you.",
    stack: ["Machine learning", "Numerical methods", "Foundations"],
    highlights: [
      "What components you implemented yourself.",
      "How you validated correctness.",
      "What tradeoffs became clearer after building it manually.",
    ],
    narrative: [
      "This page works best when it shows the delta between using a framework and understanding the mechanics underneath it.",
      "Focus on the most interesting implementation detail, whether that was convolution logic, backpropagation, debugging gradients, or training behavior.",
    ],
  },
];

export const researchItems: ResearchItem[] = [
  {
    slug: "publication-one",
    title: "Publication One",
    publication: "Publication details to be added",
    year: "Year to be added",
    summary:
      "Placeholder summary for your first publication. Replace this with the central research question, the method, and the most meaningful result.",
    keywords: ["Research", "Publication", "Placeholder"],
    highlights: [
      "State the research problem in plain language.",
      "Describe your contribution, not just the paper topic.",
      "Surface the most compelling result or takeaway.",
    ],
    abstract: [
      "Use this page for a readable explanation of the paper. Someone outside your exact subfield should still understand what the work was trying to prove or improve.",
      "If you contributed to experiments, analysis, writing, or framing, make that explicit. It helps readers understand how you work, not just what the paper covered.",
    ],
  },
  {
    slug: "publication-two",
    title: "Publication Two",
    publication: "Publication details to be added",
    year: "Year to be added",
    summary:
      "Placeholder summary for your second publication. Replace it with the key idea, the context, and why the result matters.",
    keywords: ["Research", "Writing", "Placeholder"],
    highlights: [
      "Name the question the paper tried to answer.",
      "Explain what changed because of the work.",
      "Describe the part you are proud to have owned.",
    ],
    abstract: [
      "This detail page is designed for a plain-English summary first and a research summary second. That balance helps both recruiters and technical readers.",
      "When you have the final paper link, abstract, and citation details, they can slot into this page without changing the overall design.",
    ],
  },
];

export const walkingItems: WalkingItem[] = [
  {
    slug: "campus-loop",
    title: "Campus Loop",
    location: "Pilani",
    season: "Late evening",
    summary:
      "A placeholder entry for the kind of walk that resets the day and makes room for new ideas. Replace with a real route, image, and short note.",
    image: "/walking-campus.svg",
    notes: [
      "This section is meant to make the site feel personal without becoming noisy. Short notes and thoughtful images will do more than long explanations here.",
      "If you want, each walk page can become a tiny visual journal entry with one image, one route, and one sentence worth remembering.",
    ],
  },
  {
    slug: "monsoon-evening",
    title: "Monsoon Evening",
    location: "City streets",
    season: "Rain",
    summary:
      "A softer, weather-shaped walk entry placeholder. It adds texture and shows that the site has a life outside work alone.",
    image: "/walking-rain.svg",
    notes: [
      "This is a good slot for a more atmospheric image and a small reflection rather than a full story.",
      "Keeping the text sparse here helps the rest of the site stay professional while still feeling genuinely yours.",
    ],
  },
  {
    slug: "airport-dawn",
    title: "Airport Dawn",
    location: "Transit",
    season: "Early morning",
    summary:
      "A travel-adjacent walk placeholder for moments between destinations. Replace with a real memory if that feeling matters to your story.",
    image: "/walking-dawn.svg",
    notes: [
      "Some of the best personal-site moments come from small, specific details like this. They make the whole page feel observed rather than assembled.",
      "One photo and two strong lines are enough.",
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/replace-this",
    handle: "linkedin.com/in/replace-this",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/replace-this",
    handle: "@replace-this",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/replace-this",
    handle: "@replace-this",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    handle: siteConfig.email,
  },
];

export const suggestedPrompts = [
  "give me fun facts about chittem",
  "want to know something about chittem?",
  "is this guy employable?",
  "what kinds of projects has chittem built?",
  "tell me about chittem's research",
];

export const primarySections = [
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "walking", label: "Walking" },
  { id: "socials", label: "Socials" },
];
