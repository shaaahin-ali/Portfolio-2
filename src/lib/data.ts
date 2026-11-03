export const PROFILE = {
  name: "Shahin Ali",
  email: "shahinali.mec@gmail.com",
  phone: "+91 8547270067",
  location: "Kochi, Kerala",
  timezone: "Asia/Kolkata",
  github: "https://github.com/shaaahin-ali",
  linkedin: "https://www.linkedin.com/in/shahin-ali-tp/",
};

export interface ProjectImage {
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  role: string;
  teamSize?: number;
  duration: string;
  status: "Ongoing" | "Completed";
  technologies: string[];
  overview: string;
  challenge: string;
  problemSolving: string[];
  highlights: string[];
  images: ProjectImage[];
  github?: string;
  live?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "cinerag",
    title: "CinePhile",
    tagline: "AI-powered RAG platform for Mollywood screenplays",
    category: "AI · RAG",
    role: "Solo Developer",
    duration: "Ongoing",
    status: "Ongoing",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "FastAPI",
      "Python 3.11+",
      "Supabase",
      "Pinecone",
      "Claude Sonnet 4",
      "OpenAI Embeddings",
      "Cohere Reranking",
      "PyMuPDF",
      "Indic-NLP",
      "SSE Streaming",
      "Vercel",
      "Render",
    ],
    overview:
      "An AI-powered RAG (Retrieval-Augmented Generation) platform designed specifically for Mollywood film crews. Users upload screenplays and query them in natural language — Malayalam or English — receiving real-time streaming answers with precise scene citations, cultural intelligence, and role-based insights tailored for directors, actors, and producers.",
    challenge:
      "Mollywood pre-production crews waste hours manually sifting through 100+ page screenplays to extract emotional arcs, find scenes, and derive role-specific insights — with no native Malayalam-language AI tools available.",
    problemSolving: [
      "Built a scene-aware PDF chunking pipeline using PyMuPDF that preserves screenplay structure (scene headers, character cues, dialogue blocks) rather than splitting on arbitrary page boundaries",
      "Solved bilingual query handling with langdetect + Indic-NLP Malayalam query expansion, enabling semantic retrieval for both English and Malayalam prompts against the same Pinecone vector index",
      "Implemented zero-latency UX using Server-Sent Events (SSE) to stream Claude Sonnet 4's response tokens in real time — eliminating the 'waiting for AI' experience",
      "Built a role-aware prompt system that dynamically tailors AI responses based on the user's production role (Director, Actor, Cinematographer, Producer, Editor, Music Director)",
      "Achieved hallucination-free responses by grounding every answer with exact Scene Number, Page Number, and Character citations from the uploaded screenplay",
    ],
    highlights: [
      "Bilingual RAG pipeline — queries in English or Malayalam (കേരളം)",
      "Real-time streaming responses via SSE (Claude Sonnet 4)",
      "Scene-aware PDF chunking with PyMuPDF",
      "3072-dimensional Pinecone vector search + Cohere reranking",
      "AI Video Generation from screenplay scenes (Vertex AI Veo 3.1)",
      "Character relationship graph visualization",
      "Multi-role access: Director, Actor, Cinematographer, Producer, Editor, Music Director",
      "Query history, bookmarks & project workspace dashboard",
    ],
    images: [
      { src: "/projects/cinerag/landing.png", caption: "Landing Page" },
      { src: "/projects/cinerag/dashboard.png", caption: "Project Dashboard" },
      { src: "/projects/cinerag/query-history.png", caption: "Role Selection & Query History" },
      { src: "/projects/cinerag/character-graph.png", caption: "Character Relationship Graph" },
      { src: "/projects/cinerag/video-gen.png", caption: "AI Scene Video Generation" },
    ],
    github: "https://github.com/shaaahin-ali",
  },
  {
    id: "seekright",
    title: "SeekRight",
    tagline: "AI-powered lecture intelligence",
    category: "AI · Retrieval",
    role: "Team Lead",
    teamSize: 3,
    duration: "Ongoing",
    status: "Ongoing",
    technologies: [
      "FastAPI",
      "Python",
      "Whisper",
      "FAISS",
      "SentenceTransformers",
      "SQLite / SQLAlchemy",
      "yt-dlp",
      "FFmpeg",
      "Chrome Extension (MV3)",
      "Next.js",
      "TypeScript",
    ],
    overview:
      "A transcript-grounded semantic retrieval system that transcribes YouTube lecture videos, chunks and encodes them into a FAISS vector store, and answers natural-language questions with grounded, hallucination-free responses. A companion Chrome extension lets students query any lecture without leaving their browser.",
    challenge:
      "Students waste hours rewatching lectures to find specific explanations. Existing search is keyword-based and useless for conceptual queries like 'explain the difference between TCP and UDP'.",
    problemSolving: [
      "Designed a multi-stage ingestion pipeline (audio → transcript → chunks → embeddings) to handle hour-long lectures without memory overflow",
      "Solved hallucination by enforcing strict transcript grounding — the model can only cite what was actually said",
      "Built a chunking strategy that preserves semantic context across sentence boundaries for accurate retrieval",
      "Overcame Chrome Extension MV3 service worker limitations for persistent background processing",
    ],
    highlights: [
      "Multi-stage ingestion pipeline — audio → transcript → embeddings → FAISS index",
      "RAG-based Q&A with source attribution and timestamps",
      "Multi-session dashboard with full query history",
      "Chrome Extension (Manifest V3) for in-browser Q&A",
      "Zero-hallucination constraint via strict transcript grounding",
    ],
    images: [
      { src: "/projects/seekright/login.jpeg", caption: "Login & Auth" },
      { src: "/projects/seekright/home.jpeg", caption: "Home Page" },
      { src: "/projects/seekright/dashboard.jpeg", caption: "Session Dashboard" },
      { src: "/projects/seekright/queries.jpeg", caption: "Past Queries" },
      { src: "/projects/seekright/landing.jpeg", caption: "Landing Page" },
    ],
    github: "https://github.com/shaaahin-ali",
  },
  {
    id: "tenderlens",
    title: "TenderLens",
    tagline: "Automated RFP compliance validator",
    category: "AI · Document Intelligence",
    role: "Solo Developer",
    duration: "3 Months",
    status: "Completed",
    technologies: [
      "Python",
      "FastAPI",
      "Hugging Face Inference API",
      "RAG",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Render",
      "Vercel",
    ],
    overview:
      "Automates the tedious process of RFP compliance review. Parses uploaded tender documents, runs clause-by-clause analysis against compliance rules using a RAG pipeline backed by Hugging Face models, and produces structured pass/fail reports — cutting review time from hours to seconds.",
    challenge:
      "Government tender reviews take 4-8 hours per document. Manual clause matching is error-prone and costs organizations thousands in missed compliance issues.",
    problemSolving: [
      "Built a PDF parsing pipeline that handles inconsistent formatting, tables, and multi-column layouts in government documents",
      "Designed vector-based rule matching that maps extracted clauses to compliance criteria with semantic similarity, not keyword matching",
      "Solved the cold-start latency problem on free-tier Hugging Face by implementing request queuing and retry logic",
      "Created a scoring algorithm that distinguishes between full, partial, and non-compliance with explainable verdicts",
    ],
    highlights: [
      "PDF parsing and clause extraction pipeline",
      "RAG pipeline with vector-based rule matching",
      "Clause-level pass / fail / partial verdicts",
      "Structured compliance report export",
      "Full-stack deployment: FastAPI on Render + Next.js on Vercel",
    ],
    images: [
      { src: "/projects/tenderlens/page3.png", caption: "Landing Page" },
      { src: "/projects/tenderlens/page1.png", caption: "RFP & Proposal Upload" },
      { src: "/projects/tenderlens/page2.png", caption: "Compliance Scores" },
      { src: "/projects/tenderlens/page4.png", caption: "Full Scores View" },
      { src: "/projects/tenderlens/feature.png", caption: "Features Overview" },
    ],
    github: "https://github.com/shaaahin-ali",
    live: "https://tender-lens.vercel.app/",
  },
  {
    id: "sahay-kerala",
    title: "Sahay Kerala",
    tagline: "Disaster response coordination platform",
    category: "Full-Stack · Civic Tech",
    role: "Full-Stack Developer",
    duration: "4 Months",
    status: "Completed",
    technologies: [
      "FastAPI",
      "Python",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "SQLite",
      "JWT Auth",
      "Docker",
      "SMTP",
    ],
    overview:
      "A real-time disaster response platform connecting citizens who need help with trained volunteers. Supports multi-role dashboards (admin / volunteer / public), geo-based matching to dispatch the nearest available responder, and automated email notifications.",
    challenge:
      "During Kerala floods, coordination between volunteers and victims was chaotic — no centralized system existed to match responders by proximity, skill, and availability in real time.",
    problemSolving: [
      "Implemented a geo-aware matching algorithm using Haversine distance to dispatch the nearest qualified volunteer within seconds",
      "Designed a role-based access control system with JWT that cleanly separates admin, volunteer, and public citizen permissions",
      "Solved real-time status tracking across distributed volunteers with optimistic UI updates and background sync",
      "Containerized the full stack with Docker Compose for one-command deployment across dev, staging, and production",
    ],
    highlights: [
      "Role-based access: Admin, Volunteer, Public citizen",
      "Real-time emergency request board with status tracking",
      "Location-aware volunteer matching algorithm",
      "Automated email notifications via SMTP integration",
      "Containerized with Docker; deployed end-to-end",
    ],
    images: [
      { src: "/projects/sahay-kerala/landing.png", caption: "Landing Page" },
      { src: "/projects/sahay-kerala/dashboard.png", caption: "Admin Dashboard" },
      { src: "/projects/sahay-kerala/dashboard2.png", caption: "Dashboard – Detail" },
      { src: "/projects/sahay-kerala/request.png", caption: "Emergency Requests" },
      { src: "/projects/sahay-kerala/resource.png", caption: "Resource Management" },
      { src: "/projects/sahay-kerala/profile.png", caption: "User Profile" },
      { src: "/projects/sahay-kerala/about.png", caption: "About Page" },
    ],
    live: "https://disaster-relief-lake.vercel.app/",
    github: "https://github.com/shaaahin-ali",
  },
  {
    id: "extension",
    title: "Deepfake Detection",
    tagline: "Real-time AI media verification",
    category: "Browser Extension · ML",
    role: "Solo Developer",
    duration: "4 Months",
    status: "Completed",
    technologies: [
      "JavaScript",
      "Chrome Extension API",
      "Manifest V3",
      "Cloudflare Workers",
      "Hugging Face Inference API",
    ],
    overview:
      "A Chrome extension that passively monitors media on any webpage and flags AI-generated or manipulated images in real time. Frames are routed through a Cloudflare Worker proxy to a Hugging Face deepfake classification model, and confidence-scored verdicts are displayed inline.",
    challenge:
      "Deepfake images spread virally on social media with no way for average users to verify authenticity without technical ML knowledge.",
    problemSolving: [
      "Solved CORS and API key exposure by routing inference through a Cloudflare Worker edge proxy",
      "Optimized image capture in content scripts to handle dynamic DOM mutations without performance degradation",
      "Designed a zero-storage, privacy-first architecture — no images are persisted, all analysis is ephemeral",
    ],
    highlights: [
      "Inline image capture via content script (Manifest V3)",
      "Cloudflare Worker edge proxy for secure model calls",
      "Hugging Face deepfake classification model",
      "Confidence score badge overlaid on flagged images",
      "Zero persistent storage — privacy-first design",
    ],
    images: [
      { src: "/projects/extension/ext1.png", caption: "Extension UI" },
      { src: "/projects/extension/ext2.png", caption: "Detection in Action" },
      { src: "/projects/extension/ext3.png", caption: "Results & Confidence" },
    ],
    github: "https://github.com/shaaahin-ali",
  },
];

export interface Logo {
  src: string;
  /** Tile colour behind the logo, matching the artwork's own background. */
  bg: string;
  fit: "contain" | "cover";
}

const EXCEL_LOGO: Logo = { src: "/logos/excel-mec.png", bg: "#0a0a0c", fit: "cover" };
const IEDC_LOGO: Logo = { src: "/logos/iedc-mec.png", bg: "#ffffff", fit: "contain" };

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  place?: string;
  summary?: string;
  detail?: string;
  tags?: string[];
  logo?: Logo;
}

export const JOURNEY: Record<string, TimelineEntry[]> = {
  Experience: [
    {
      period: "3 Months",
      title: "Software Developer Intern",
      org: "QuanHack Solutions",
      place: "Remote",
      summary:
        "Building RAG-based LLM agent pipelines for autonomous multi-step enterprise workflows.",
      detail:
        "Working on backend development for scalable AI-driven enterprise applications — designing and integrating LLM agent pipelines that handle multi-step autonomous decision-making. Gained hands-on experience with API integration, vector database management (ChromaDB, FAISS), and Docker-based deployment pipelines relevant to cloud networking and system scaling.",
      tags: ["React", "TypeScript", "Next.js", "FastAPI", "RAG", "LLMs", "Docker", "ChromaDB", "FAISS", "PostgreSQL"],
    },
    {
      period: "2 Months",
      title: "Game Developer Intern",
      org: "Groop Games",
      summary:
        "Built a Minimax (Alpha-Beta Pruning) solver and core gameplay systems for a trick-taking puzzle game.",
      detail:
        "Developed a hybrid DDS and Minimax (Alpha-Beta Pruning) solver to generate mathematically optimal solutions for a trick-taking puzzle game, achieving consistent near-perfect play. Designed and implemented 300+ puzzles across 6 difficulty tiers with difficulty scaling logic, optimized solver performance for low-latency gameplay, and integrated core game state management.",
      tags: ["Flutter", "Dart", "C++", "SQLite"],
    },
  ],
  Leadership: [
    {
      period: "2026",
      title: "Ambience Manager",
      org: "Excel MEC",
      logo: EXCEL_LOGO,
      summary:
        "Directed visual aesthetics and environmental design for the annual techno-cultural festival of Model Engineering College.",
    },
    {
      period: "2025",
      title: "Chief Publicity Officer",
      org: "IEDC MEC",
      logo: IEDC_LOGO,
      summary:
        "Led publicity strategy for start-up events at the Innovation & Entrepreneurship Development Centre — campaigns, branding, and outreach.",
    },
    {
      period: "2025",
      title: "Events Head",
      org: "Excel MEC",
      logo: EXCEL_LOGO,
      summary:
        "Spearheaded operations and event coordination for the national-level techno-managerial fest of Model Engineering College.",
    },
  ],
  Education: [
    {
      period: "2023 – 2027",
      title: "B.Tech, Computer Science & Engineering",
      org: "Govt. Model Engineering College",
      place: "Kochi · KTU",
      summary: "CGPA 9.2 — pursuing an Honours degree in CSE alongside the B.Tech.",
    },
    {
      period: "2022",
      title: "Higher Secondary (12th)",
      org: "I U Higher Secondary School",
      place: "Kerala · State Board",
      summary: "Scored 99%.",
    },
    {
      period: "2020",
      title: "Secondary (10th)",
      org: "Sacred Heart Senior Secondary School",
      place: "Kerala · CBSE",
      summary: "Scored 92.6%.",
    },
  ],
  Recognition: [
    {
      period: "Hackathon",
      title: "Top 10, IEEE MAGIC 3.0",
      org: "IEEE",
      summary: "Built a library management system within 24 hours in a team of 4.",
    },
    {
      period: "Certificate",
      title: "Fundamentals of Building AI Agents",
      org: "IBM · Coursera",
    },
    {
      period: "Certificate",
      title: "Cloud Computing",
      org: "NPTEL — IIT Kharagpur",
    },
    {
      period: "Certificate",
      title: "Python Programming",
      org: "Kaggle",
    },
    {
      period: "Workshop",
      title: "3-day NLP Workshop",
      org: "ICFOSS",
    },
  ],
};

export const TOOLBOX: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "C / C++", "Java", "Dart", "SQL"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "HTML / CSS", "Flutter"] },
  { group: "Backend", items: ["FastAPI", "SQLAlchemy", "PostgreSQL", "MySQL", "SQLite", "Supabase"] },
  {
    group: "AI / ML",
    items: ["RAG", "LLM Agents", "FAISS", "Pinecone", "ChromaDB", "SentenceTransformers", "Whisper", "Hugging Face"],
  },
  { group: "Infra", items: ["Docker", "Git", "Vercel", "Render", "Cloudflare Workers"] },
];

export const STATS = [
  { value: 5, suffix: "", label: "Projects built" },
  { value: 30, suffix: "+", label: "Tools in the kit" },
  { value: 9.2, suffix: "", label: "CGPA at MEC", decimals: 1 },
  { value: 2, suffix: "", label: "Internships" },
];
