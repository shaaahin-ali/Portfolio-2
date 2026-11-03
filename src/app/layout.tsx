import type { Metadata } from "next";
import { Fira_Code, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Shahin Ali — Aspiring AI Engineer & Full-Stack Developer",
  description:
    "Shahin Ali — B.Tech CSE student at Govt. Model Engineering College, Kochi. Aspiring AI engineer and full-stack developer building RAG pipelines, LLM agents and products people enjoy using.",
  keywords: [
    "Shahin Ali",
    "Portfolio",
    "AI Engineer",
    "Full Stack Developer",
    "RAG",
    "LLM",
    "Next.js",
    "FastAPI",
    "Python",
    "Kerala",
  ],
  authors: [{ name: "Shahin Ali" }],
  openGraph: {
    title: "Shahin Ali — Aspiring AI Engineer & Full-Stack Developer",
    description:
      "A CS student building intelligent systems with RAG pipelines, LLM agents and full-stack web development.",
    type: "website",
  },
};

// Applies the saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${firaCode.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
