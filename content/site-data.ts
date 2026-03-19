export type SocialIconName =
  | "scholar"
  | "linkedin"
  | "instagram"
  | "x"
  | "email"
  | "github";

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: SocialIconName;
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
  name: "Adithya Chittem",
  fullName: "Adithya Chittem",
  title: "Adithya Chittem's Workspace",
  description:
    "A warm, editorial personal website about uni, work, projects and research by yours truly",
  email: "chittemadithya@gmail.com",
};

export const hero = {
  eyebrow: "",
  title: "Adithya Chittem",
  intro:
    "I mostly go by my last name, pronounced Chith-um (actually Chit-tem but someone in the 4th grade decided it was wrong and it has stuck ever since). " +
    "I'm currently in my senior year of pursuing a Bachelor's in Computer Science at BITS Pilani and also interning as a Software Engineer at Google India." + 
    " You can find everything that I do here, from work experience to projects and research. You should also be able to see a little chatbot at the bottom of your screen, yes it's real and capable of" +
    " answering questions about me (totally not a narc). Feel free to reach out to me on my socials at the bottom of the page!"
};

export const education = {
  institution: "BITS Pilani",
  degree: "Bachelor's of Engineering in Computer Science",
  period: "October 2022 - I have a few months left",
  summary: "Will (somehow) graduate with an 8.81 GPA. I spent a lot of time with the Center for Entrepreneurial Leadership and 180 Degrees Consulting, worked on ML/DL research projects with three different professors, and currently serve as the student representative on the BITS Pilani Senate.",
  highlights: ["180 Degrees Consulting", "CEL", "BOSPO", "Student Senate"],
};

export const workItems: WorkItem[] = [
  {
    slug: "google",
    company: "Google",
    role: "SWE Intern",
    period: "Jan 2026 - Present",
    location: "Bangalore, India",
    summary:
      "Currently working in Google Cloud, building agents for the Networks team that automate the processes of triaging, troubleshooting and fixing crucial bugs in Google's network.",
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
    role: "SDE Intern",
    period: "May 2025 - July 2025",
    location: "Bangalore, India",
    summary:
      "Worked in the NoSQL Database team where I built an exhaustive checkpointing mechanism for their database migration tool to bring service downtime to a near zero.",
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
  {
    slug: "campus-fund",
    company: "Campus Fund",
    role: "Investment Analyst",
    period: "June 2023 - July 2024",
    location: "Bangalore, India",
    summary:
      "An early member of the student investment team. Sourced and evaluated 100+ early stage startups, and led diligence on Campus Fund's biggest deal at the time.",
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
];

export const projectItems: ProjectItem[] = [
  {
    slug: "cel-newsletter",
    title: "CEL Newsletter",
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
    links: [{ label: "GitHub", href: "https://github.com/chitadi/cel-newsletter" }],
  },
  {
    slug: "mcp-server",
    title: "MCP Server",
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
    links: [{ label: "GitHub", href: "https://github.com/chitadi/news-agent-poke-mcp" }],
  },
  {
    slug: "cnn-from-scratch",
    title: "CNN From Scratch",
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
    links: [{ label: "GitHub", href: "https://github.com/chitadi/cnn_proj_cpu" }],
  },
  {
    slug: "live-interior-designer-agent",
    title: "Live Interior Designer Agent",
    summary:
      "A real-time design assistant for interior planning. This project is a good place to show multimodal UX decisions, tool orchestration, and how the agent stays useful under ambiguity.",
    stack: ["LLMs", "Computer vision", "Realtime systems"],
    highlights: [
      "How the live interaction loop worked end-to-end.",
      "What constraints shaped the agent's recommendations.",
      "How you evaluated output quality and usefulness.",
    ],
    narrative: [
      "Use this page to explain the product problem first: what users struggled with before the agent existed and why realtime guidance mattered.",
      "Then walk through architecture and tradeoffs, especially latency, grounding, and how you balanced creative suggestions with practical constraints.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/chitadi/gemini-live-agent-hack" }],
  },
];

export const researchItems: ResearchItem[] = [
  {
    slug: "publication-one",
    title: "SAC: A Framework for Measuring and Inducing Personality Traits in LLMs with Intensity Control",
    publication: "arXiv preprint",
    year: "2025",
    summary:
      "Introduced Specific Attribute Control (SAC), extending MPI from the Big Five to 16PF so LLM personalities can be measured and steered across 16 fine-grained traits with explicit intensity levels. Experiments show continuous intensity control is more reliable than binary toggles and causes coherent shifts in related traits, enabling more nuanced human-machine interactions.",
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
    links: [{ label: "Read on arXiv", href: "https://arxiv.org/abs/2506.20993" }],
  },
  {
    slug: "publication-two",
    title: "mmWave Radar Aware Dual-Conditioned GAN for Speech Reconstruction of Signals With Low SNR",
    publication: "arXiv preprint",
    year: "2026",
    summary:
      "Built a two-stage RAD-GAN pipeline to reconstruct intelligible full-band speech from noisy, band-limited mmWave captures (-5 dB to -1 dB), with a radar-tailored Multi-Mel Discriminator and Residual Fusion Gate. Even with limited data, no pre-trained modules, and no augmentations, the method outperformed SOTA approaches for this task.",
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
    links: [{ label: "Read on arXiv", href: "https://arxiv.org/abs/2602.22431" }],
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
    label: "Email",
    href: "mailto:chittemadithya@gmail.com",
    handle: "chittemadithya@gmail.com",
    icon: "email",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/AdithyaChittem",
    handle: "@AdithyaChittem",
    icon: "x",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adithya-chittem-b016481b0/",
    handle: "adithya-chittem-b016481b0",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/chitadi",
    handle: "github.com/chitadi",
    icon: "github",
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AF9nlQs5uIPZjmlFs_joHg0PR-XgO29AnImS6pA9le5gh0ZrOBk1b8gR_vQeO77sjdXrGgtr5pqFqkPp8aanmb5iyrwQJVBQDXV7aUPNG5E&user=iLp7izgAAAAJ",
    handle: "scholar.google.com/citations",
    icon: "scholar",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/adithya.chittem/",
    handle: "@adithya.chittem",
    icon: "instagram",
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
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "socials", label: "Socials" },
];
