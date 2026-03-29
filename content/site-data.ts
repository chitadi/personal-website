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

export type DetailMedia =
  | {
      type: "video";
      src: string;
      caption?: string;
      controls?: boolean;
      muted?: boolean;
      autoPlay?: boolean;
      loop?: boolean;
    }
  | {
      type: "youtube";
      src: string;
      caption?: string;
      title?: string;
    };

export type DetailParagraph =
  | string
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      aspectRatio?: string;
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
  narrative: DetailParagraph[];
  links?: EntryLink[];
};

export type ProjectItem = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  highlights: string[];
  narrative: DetailParagraph[];
  media?: DetailMedia[];
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
  abstract: DetailParagraph[];
  links?: EntryLink[];
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
    " answering questions about me. Feel free to reach out to me on my socials at the bottom of the page!"
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
      "As a part of my Practice School-2 in BITS Pilani, I have been interning at Google since January of this year.",
      "I work in the WANForms team in [Google Global Networking (GGN)](https://research.google/teams/global-networking/), which is a part of Google Cloud. In Google's push to make all their teams' efforts AI-first, I have been tasked to build industry grade agents for WANForms that can work with any developer in GGN to automate workflows of detecting, triaging, troubleshooting and fixing crucial defects and bugs in Google's network. The goal is to empower developers in GGN by fasttracking tedious (and annoying) tasks that can take up weeks at a time and bring that down to mere minutes.",
      "I'm not going to lie, it was intimidating to find out that I would be leading these efforts because the team has put quite some faith in the little experience I have with tinkering around with AI products.",
      "Unlike most big corporations that would otherwise have interns work on non-production or non-crucial tools, my team has put enormous trust in me to build tools that will be used by the entire GGN organization and I have been loving every second of it. The learning curve has been steep but the team has been super supportive and I'm really proud of the work I've done so far and excited for what's to come in the next few months!",
      "I've definitely grown a lot as a dev, and its been fun using some of my indie hacking skills and seeing how they scale at an organisation the size of Google. I think I am getting to witness firsthand how big corporations are embracing AI and how engineers who have worked for decades are learning from the younger folks and vice versa (obviously).",
      "If anyone is around the [Kyoto Office in Bangalore](https://maps.app.goo.gl/9vBHsGB1ov5s5FEr9) (i know i thought it was funny too) come say hi!"
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
      "After a gruelling on-campus Summer Internship season, I finally made it to Oracle. I worked in the NoSQL Database team, which is responsible for Oracle's distributed NoSQL database service that offers low latency and high throughput for mission-critical applications.",
      "Numerous customers of Oracle used the migration tool of the [NoSQL team](https://www.oracle.com/in/database/nosql/) to migrate their databases which were either a file/object store to Oracle's OnPrem DB or the Oracle Cloud DB. However, the migration tool had a major issue of causing significant downtime for customers during the migration process which was a huge pain point for them.",
      "Servers could crash, processes could get terminated, outages could happen, in any case, the migration process that could sometimes comprise over 4TB worth of data would have to start all over again, from the top. This wasted time, effort and resources for our customers.",
      "Our task was to make a sound checkpoint feature for the migration tool that would ensure data was backed up, the last safest state was tracked, and the process could resume from the point of failure, saving clients numerous hours and bringing downtime to a near zero.",
      "On a more personal note, this was my first proper professional experience and I'm glad, even though our internship was about 3 months long, the team encouraged us to work on production-grade projects that were actually relevant to the organisation. I had barely used git before this, and almost never paid much attention to neatly written code before. I thought OOP was a subject and nothing more and as funny as it may sound now, I learnt how to REALLY write code at Oracle.",
      "Turns out my degree was a little useful afterall.",
      "And yes, they were kind enough to call me back for a full-time role and I will be returning to Oracle later this year."
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
      "This was my first experience doing anything professionally really. I was a part of the 3rd cohort of student investment analysts at [Campus Fund](https://yourcampusfund.com/cohort-2023-24/). Worked directly with the core team to source, evaluate and invest in Startups across India.",
      "In my first and second year, I really wanted to understand what it took to be a good founder and what it takes to build an actual company. I figured working at a VC firm would help me understand how it all really works outside of the bubble I had on campus.",
      "I was at CF for a year and in that year, I spoke to 100s of young founders from all over India and most importantly led what was CF's biggest deal at the time - [Sarla Aviation](https://www.sarla-aviation.com/).",
      "Now, I enjoy the perks of being a part of the Campus Fund Mafia and will forever be grateful to Richa and co for giving me this opportunity so early in my undergrad.",
      "If you are a student founder or a recent grad, feel free to reach out to me, I'd be happy to connect you with the Campus Fund team :)"
    ],
  },
];

export const projectItems: ProjectItem[] = [
  {
    slug: "cel-newsletter",
    title: "CEL Newsletter Agent",
    summary:
      "An automated newsletter agent that scours over 1000+ articles related to startups, finance and tech on the internet daily, semantically sorts them according to relevance and sends them to subscribers.",
    stack: ["Editorial workflow", "Automation", "Distribution"],
    highlights: [
      "How the content pipeline worked from idea to issue.",
      "What was automated or made easier.",
      "How you measured whether readers cared.",
    ],
    narrative: [
      "We are a small team at the Center for Entrepreneurial Leadership at BITS Pilani. With all the large scale projects that we take up, we sometimes forget the smaller details, the habit of reading insightful content that ensures we stay up to date with all happenings of the ecosystem.",
      "A newsletter that compiles the best articles every day would be the most ideal way to consume content without really having to search for it. But since we are a small team, we had no manpower to actually curate and maintain an efficient newsletter pipeline every few days.",
      "I built an agent that scrapes 1000s of articles and Youtube videos across startups, finance, tech in India and all over the world, semantically arranges the most relevant articles and Youtube videos, summarises each entry so that people with no time can take a glance if they wish, and automatically shoots it out to its subscribers every Tuesday, Thursday and Saturday.",
      "The newsletter has been up for close to a year now, and everyone at CEL is super happy this exists, and has been a great starting point for all the members to get fresh news articles and go off on their own deep dives on topics they find interesting!",
      "Here's what the latest newsletter looked like - " 
    ],
    media: [
      {
        type: "video",
        src: "/figs/cel-newsletter-demo.mp4",
        caption: "Newsletter issue walkthrough",
        controls: true,
        muted: true,
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/chitadi/cel-newsletter" }],
  },
  {
    slug: "mcp-server",
    title: "Real time News MCP Server",
    summary:
      "Built a Model Context Protocol (MCP) server to fetch real-time news updates across sports, startups, tech, finance for the interactive voice agent, Poke, built by the Interaction Company of California.",
    stack: ["LLMs", "Tooling", "Backend"],
    highlights: [
      "What tools or resources the server exposed.",
      "How you shaped the interface for reliability.",
      "What the experiment taught you about agent workflows.",
    ],
    narrative: [
      "As a part of the Hackathon conducted at MIT by the Interaction Company of California, the task was to build an MCP server for their voice agent chatbot - Poke.",
      "Poke, at the time, had an excellent personality, and was extremely easy to talk to and converse with, capable of processing voice notes and even images. Where it struggled was fetching real-time, fresh data accurately.",
      "This is where the MCP server came in. I built a scraper that fetches 1000s of articles and Youtube videos across entertainment, sports, tech, startups, finance and basically anything that you would consume in your weekly news cycle on an hourly basis so that the news stayed as fresh as possible. This datastore became the source of truth for the MCP server and moreover Poke itself.",
      "Poke could then fetch articles and videos every hour and keep me posted on the latest happenings, create a newsletter and send it to my mail, and I could even chat to Poke about the news it just fetched, requesting for further breakdowns or more information. Think of it as a news assistant that you could actually talk to like you would with a friend.",
      "I demoed all the relavant use cases in this [twitter post](https://x.com/AdithyaChittem/status/1968458583722308040?s=20), go check it out!"
    ],
    links: [{ label: "GitHub", href: "https://github.com/chitadi/news-agent-poke-mcp" },
      { label: "Twitter Post", href: "https://x.com/AdithyaChittem/status/1968458583722308040?s=20" }
    ],
  },
  {
    slug: "cnn-from-scratch",
    title: "CNN From Scratch in C++",
    summary:
      "Implemented a Convolutional Neural Network from scratch in C++ without using any deep learning libraries. Actually wrote the computation for each matrix operation, convolution, and backpropagation step manually.",
    stack: ["Machine learning", "Numerical methods", "Foundations"],
    highlights: [
      "What components you implemented yourself.",
      "How you validated correctness.",
      "What tradeoffs became clearer after building it manually.",
    ],
    narrative: [
      "As a part of my Machine Learning course at BITS Pilani, we had to implement a CNN from scratch in C++. The catch was that we couldn't use any deep learning libraries or frameworks and had to write the computation for each matrix operation, convolution, and backpropagation step manually.",
      "Extremely intimidating at first, but it really did shape the way I now understand any ML/DL concept now. When you have to write the code for a convolution operation yourself, you really understand what it does and how it works. When you have to write the backpropagation code yourself, you really understand how gradients flow and how the model learns. It was a lot of work but I'm really glad I did it because it gave me a much deeper understanding of the foundations of machine learning and deep learning.",
      "Since we werent allowed to use any external libraries whatsoever, we had to do everything ourselves, from optimisations to even the data augmentations. It achieved a ~60% accuracy on the CIFAR-10 dataset which was pretty good considering the constraints of the task and the fact that we had to write everything from scratch.",
      "To test the methodology's efficacy, we were also asked to compare it against standard logistic regression on the same dataset, which performed poorly with a 39.8% accuracy on the same dataset.",
      "Easily one of the more challenging courses I took in college, but happy that I did!"
    ],
    links: [{ label: "GitHub", href: "https://github.com/chitadi/cnn_proj_cpu" }],
  },
  {
    slug: "live-interior-designer-agent",
    title: "Live Interior Designer Agent",
    summary:
      "Built an Agent that works with the user's live camera feed and microphone input to provide real-time interior design suggestions to generate a perfect image of their room with the interior style of their choice.",
    stack: ["LLMs", "Computer vision", "Realtime systems"],
    highlights: [
      "How the live interaction loop worked end-to-end.",
      "What constraints shaped the agent's recommendations.",
      "How you evaluated output quality and usefulness.",
    ],
    narrative: [
      "This was a project that my friends and I built for the Gemini Live Agents Hackathon hosted by Google. The task was to leverage Gemini's cutting edge live API, i.e, the ability to process live camera feed and microphone input in real time, to build an agent that could interact with the user in a way that was never possible before.",
      "We built an interior designer agent that could provide real-time interior design suggestions to users based on their live camera feed and microphone input. The user would simply have to turn on their camera and microphone, and the agent would be able to see their room in real time, understand the current interior design style, and provide suggestions on how to improve it based on the user's preferences.",
      "Finally, the agent would scrape the web to find matching furniture, decor and aesthetic styles to help the user generate a perfect image of their room with the interior style of their choice.",
      "We were surprised by how well the agent was able to understand multi-modal input and provide relevant suggestions in real-time, but we were happy that we went one step beyond just using the live-api and also leverage Nano Banana to generate the most accurate image possible.",
      "We made a video demo that you can watch below.",
      " "
    ],
    media: [
      {
        type: "youtube",
        src: "https://www.youtube.com/watch?v=rf7WWT3usGQ",
        title: "Live Interior Designer Agent demo",
        caption: "Live demo walkthrough",
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/chitadi/gemini-live-agent-hack" }, 
      { label: "Demo Video", href: "https://www.youtube.com/watch?v=rf7WWT3usGQ" }],
  },
];

export const researchItems: ResearchItem[] = [
  {
    slug: "publication-one",
    title: "SAC: A Framework for Measuring and Inducing Personality Traits in LLMs with Intensity Control",
    publication: "SCITEPRESS proceedings",
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
      "When you interact with ChatGPT, Claude or Gemini on a daily basis, you have a vague understanding of whether or not they are cooperative, kind, or even stubborn at times. However these perceptions are all subjective. Our research works towards evaluating these personality factors in an objective form. We then go one step beyond to introduce a framework that can steer these personality traits in a way that is more nuanced than just saying 'be more cooperative' or 'be more stubborn'. We introduce the concept of intensity control, which allows us to specify not just the direction of change but also the degree of change in these personality traits. This opens up new possibilities for creating AI agents that can adapt their personalities in a more human-like and contextually appropriate manner.",
      "The use cases of this work are incredibly exciting, imagine a mental health agent that continuously modifies its personality on the basis of the interactions it has with its patient. On a certain day when the patient is feeling low, the warmth level of the agent goes up and on a certain day if the patient is seeking advice, the assertiveness level goes up.",
      "Imagine a multi-agent framework where you have different agents with different personalities and you can control the intensity of their traits to create a more dynamic and engaging interaction. For example, in a customer service scenario, you could have an agent that is more empathetic and cooperative for handling sensitive issues, and another agent that is more assertive and direct for handling straightforward inquiries.",
      {
        type: "image",
        src: "/figs/sac.jpeg",
        alt: "SAC research poster presentation at ICAART 2026",
        caption: "SAC poster presentation at ICAART 2026",
      },
      "Overall, our work on SAC and intensity control provides a new way to think about and design AI personalities, moving beyond static traits to a more fluid and adaptable model that can better meet the needs of users in a wide range of contexts.",
      "We started this work as a course project in our second year, professors took notice of the value that this work could have and encouraged us to pursue this further. In a year, we managed to conduct full fledged experiments and had results that had direct applications to real world scenarios.",
      "Our work got accepted at the 18th edition of the [International Conference on Agents and Artificial Intelligence (ICAART 2026)](https://www.scitepress.org/Events/ICAART/ICAART26/ConferencePapers.aspx) and we went to Marbella, Spain in March to present our work in front of some of the leading researchers in Artificial Intelligence.",
      "In a sequence of events that kept getting more surreal - we met some of the best researchers from all over the world (who were all so welcoming to two complete noobs), had an incredible audience at our poster booth and we flew back to see that our paper has also been cited now :)"
    ],
    links: [
      {
        label: "Read official publication",
        href: "https://www.scitepress.org/Link.aspx?doi=10.5220%2f0014415000004052",
      },
    ],
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
      "Regular microphones capture audio waves through the air, radar sensors on the other hand capture the surface vibrations to capture millimeter waves. These waves are then processed to produce intelligible speech. Now, the issue with radar capture is that the environments are generally extremely noisy, making audio reconstruction a near impossible task, especially in scenarios with low SNR (Signal to Noise Ratio). Our work tries to solve this problem by introducing a novel two-stage Radar Aware Dual Path-Generative Adversarial Network (RAD-GAN) pipeline that is specifically designed to handle the unique challenges of mmWave radar captures",
      "What makes our work stand out is that we designed a radar-tailored Multi-Mel Discriminator and a Residual Fusion Gate to effectively reconstruct intelligible full-band speech from noisy, band-limited mmWave captures with SNRs as low as -5 dB. Even with limited data, no pre-trained modules, and no augmentations, our method outperformed state-of-the-art approaches for this task.",
      "This research has significant implications for the development of more robust and effective speech reconstruction techniques in noisy environments, which could have applications in various fields such as telecommunications, assistive technologies, and surveillance.",
      "The work is currently under review for publication in Interspeech 2026, and we have also made a preprint available on arXiv for the community to access and build upon. We have also built a demo website with the output spectrograms, comparison with baselines and even audio outputs so that you cant ake a look at what the output from the models we built sound like! Check it out here - https://rad-gan-demo-site.vercel.app/.",
      "This work was done by myself and two of my wingies - Deepan Roy and Jash Karani, along with the kind support of Prof. Sandeep Joshi. Looking back, this work is by far and easily the coolest thing I've managed to do over the course of my 4 years of undergrad.",
      "Deepan and I had a little bit of experience dabbling around with DL frameworks but we had never built anything even remotely from scratch ourselves. Jash is an Electronics and Comms. Engineer that focussed on the Digital Signal Processing aspect of the work. I never thought I'd get to collaborate with someone from a completely different field than mine, that too on a project that is so technically dense.",
      "We have a few more ideas on where to take this work, but for now we hope we can make it to Australia for Interspeech 2026!"
    ],
    links: [{ label: "Read on arXiv", href: "https://arxiv.org/abs/2602.22431" }, {label: "Demo Website", href:"https://rad-gan-demo-site.vercel.app/"}],
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
  "what should I know about chittem?",
  "is this guy employable?",
  "what kind of projects has chittem built?",
  "tell me about chittem's research",
  "what tech stack is chittem familiar with?"
];

export const primarySections = [
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "socials", label: "Socials" },
];
