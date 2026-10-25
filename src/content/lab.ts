import type { LabItem } from "./types";

/* "AI Lab" — live things visitors can open and play with.
   Only list tools that are really online. */
export const lab: LabItem[] = [
  {
    title: "LangGraph Playground",
    body: "Build and step through agent graphs right in the browser.",
    href: "https://atulswain.github.io/LangGraph/playground/",
    icon: "graph",
    cta: "Try it",
  },
  {
    title: "Agent Patterns, animated",
    body: "Watch 12 multi-agent architectures run step by step in 3D.",
    href: "https://atulswain.github.io/LangGraph/patterns/supervisor/",
    icon: "chat",
    cta: "Explore",
  },
  {
    title: "InvestIQ Terminal",
    body: "Research Indian and US stocks with sourced, explainable numbers.",
    href: "https://atulswain.github.io/InvestIQ-AI/",
    icon: "chart",
    cta: "Open",
  },
];
