import type { CaseStudy, DataStep } from "./types";

export const dataIntro =
  "How I approach a data problem: start with a question someone actually has, get the data honest, and finish with something a person can act on.";

export const dataProcess: DataStep[] = [
  { title: "Question", body: "Define the decision the analysis should inform — before touching any data." },
  { title: "Data", body: "Collect, clean and document where every number comes from." },
  { title: "Explore & model", body: "Visualise patterns, test assumptions, then build and validate models." },
  { title: "Communicate", body: "Turn results into a clear story, a chart, or a tool someone uses." },
];

/* Add your data science projects here. The first one is shown large.
   For a full write-up, also add it to projects.ts (category "Data")
   and set `project` to its slug. */
export const caseStudies: CaseStudy[] = [
  {
    title: "Featured data science project",
    status: "Write-up coming soon",
    summary:
      "A full case study of my latest data science project — the question, the dataset, the method and what it found.",
    question: "—",
    data: "—",
    methods: "—",
    result: "—",
  },
  {
    title: "Financial data in InvestIQ",
    status: "Applied",
    summary:
      "Pulling market data, computing ~45 metrics per company, screening across markets and modelling fair value with reverse DCF and scenarios — with the source and period of every figure tracked end to end.",
    question: "Is this stock fairly priced, and why did it move?",
    data: "NSE, BSE & US prices and fundamentals via yfinance",
    methods: "pandas, NumPy, reverse DCF, scenario analysis",
    result: "A research terminal with cited, explainable numbers",
    project: "investiq",
  },
];
