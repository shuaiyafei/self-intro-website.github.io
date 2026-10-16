import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "ai-agent",
    title: "AI Agent for a Dynamic UI Platform",
    category: "AI & Developer Experience",
    dates: "2025 — Present",
    summary:
      "Turning platform knowledge into grounded answers, design-to-DSL generation, and reusable agent skills.",
    lead: "A retrieval-augmented agent that answers platform questions, turns design structures into reusable DSL, and packages expert workflows as discoverable skills.",
    image: "/images/project-ai.webp",
    imageAlt:
      "Concept diagram connecting platform knowledge, retrieval, and generated interface structures",
    artCaption: "KNOWLEDGE → INTELLIGENCE → CREATION",
    tags: ["RAG", "DSL generation", "Agent skills"],
    role: "Full-Stack / AI Agent Engineer",
    focus: "RAG, DSL Generation, Agent Skills",
    scale: "100+ Business Teams",
    metrics: [
      { value: "80%", label: "fewer support requests" },
      { value: "200+", label: "technical documents indexed" },
      { value: "Hours → Minutes", label: "component integration time" },
    ],
    challenge: {
      title: "Platform knowledge was powerful, but difficult to access.",
      body: "The dynamic UI platform served more than 100 business teams. Its capabilities were distributed across component APIs, bridge specifications, framework documentation, and team knowledge. Developers needed expert support to find the right APIs and write valid DSL, creating repeated support work and slow integration cycles.",
    },
    system: {
      title: "One agent, two specialized workflows.",
      features: [
        {
          title: "Retrieval-augmented Q&A",
          body: "Indexed more than 200 platform documents and used intent parsing, entity extraction, and targeted retrieval to produce grounded answers across multi-turn conversations.",
        },
        {
          title: "Design-to-DSL generation",
          body: "Converted parsed design structures into platform component trees, mapped them to DSL conventions, and added syntax checks for events, parameters, and tag closure.",
        },
        {
          title: "Reusable agent skills",
          body: "Packaged platform onboarding, component guidance, troubleshooting, and unit conversion as standard skills available through the company AI assistant.",
        },
        {
          title: "Shared core, distinct outputs",
          body: "Reused intent and knowledge retrieval infrastructure while keeping natural language support and structured code generation as separate, optimized paths.",
        },
      ],
    },
    flow: {
      title: "System map",
      steps: [
        { label: "Inputs", value: "Questions · Designs · Context" },
        { label: "Shared intelligence", value: "Intent · Retrieval · Knowledge" },
        { label: "Specialized outputs", value: "Answers · DSL · Skills" },
      ],
    },
    outcome: {
      title: "Expert knowledge became a scalable product capability.",
      body: "The agent reduced support volume by 80% and shortened component integration from hours to minutes. It transformed platform expertise from a person-dependent service into a reusable capability that teams could access directly in their normal workflow.",
    },
  },
  {
    slug: "cross-platform",
    title: "Unified Cross-Platform Runtime",
    category: "Cross-Platform Infrastructure",
    dates: "2023 — 2025",
    summary:
      "One component model across iOS, Android, and HarmonyOS, supported by tooling and quality gates.",
    lead: "A shared component model, runtime, and engineering system for delivering consistent experiences across iOS, Android, and HarmonyOS.",
    image: "/images/project-runtime.webp",
    imageAlt: "Concept diagram of a shared runtime across multiple platforms",
    artCaption: "ONE MODEL. MANY POSSIBILITIES.",
    tags: ["Runtime", "Developer tooling", "Quality"],
    role: "Platform Engineer",
    focus: "DSL, Runtime, Tooling, Quality",
    scale: "10 Apps · 100+ Bundles",
    metrics: [
      { value: "50%", label: "lower integration cost" },
      { value: "40%+", label: "fewer consistency defects" },
      { value: "60%", label: "reduction in JS crashes" },
      { value: "15%", label: "smaller bundle size" },
    ],
    challenge: {
      title: "Multiple platforms had accumulated multiple ways of building the same thing.",
      body: "Product teams maintained duplicated implementations, private APIs, and platform-specific workarounds. This raised migration cost, introduced behavioral inconsistencies, and made foundational upgrades increasingly risky across independent apps and more than 100 bundles.",
    },
    system: {
      title: "Standardize the model, then reinforce it through the delivery lifecycle.",
      features: [
        {
          title: "Unified DSL",
          body: "Helped define a React Hooks-based component model and explicit mappings between logic and rendering layers for consistent behavior across platforms.",
        },
        {
          title: "Developer tooling",
          body: "Built CLI capabilities for view-tree inspection, performance benchmarks, package analysis, and on-demand dependency packaging.",
        },
        {
          title: "Static and runtime controls",
          body: "Added AST-based CI scanning and runtime reporting to prevent private API usage from returning after teams completed standardization.",
        },
        {
          title: "Progressive delivery",
          body: "Connected staged rollout, error and blank-screen monitoring, automated alerts, and emergency rollback into one operational feedback loop.",
        },
      ],
    },
    flow: {
      title: "Delivery model",
      steps: [
        { label: "Author once", value: "Shared DSL & Components" },
        { label: "Build with confidence", value: "CLI · AST Gates · Benchmarks" },
        { label: "Run everywhere", value: "iOS · Android · HarmonyOS" },
      ],
    },
    outcome: {
      title: "A migration program became a durable engineering system.",
      body: "The platform reached 95% standardization, prevented new non-standard API usage through CI/CD gates, reduced JavaScript crashes by about 60%, and cut bundle size by roughly 15%. The unified card model also reduced integration effort by around 50% and supported on-time HarmonyOS delivery.",
    },
  },
  {
    slug: "governance-platform",
    title: "Engineering Governance Platform",
    category: "Engineering Systems",
    dates: "2023 — 2024",
    summary:
      "A full lifecycle platform connecting AST analysis, approval workflows, CI/CD, and operational visibility.",
    lead: "A lifecycle platform for discovering, approving, monitoring, and governing native bridge capabilities across a large cross-platform application ecosystem.",
    image: "/images/project-governance.webp",
    imageAlt: "Concept diagram of automated engineering analysis and delivery",
    artCaption: "CLARITY THROUGH THE LIFECYCLE.",
    tags: ["Node.js", "AST", "CI/CD"],
    role: "Full-Stack Engineer",
    focus: "Node.js, MySQL, AST, CI/CD",
    scale: "10 Apps · 120+ Bundles",
    metrics: [
      { value: "60%", label: "less manual coordination" },
      { value: "120+", label: "bundles governed" },
      { value: "3 days", label: "from prototype to integration" },
    ],
    challenge: {
      title: "Critical capability usage was tracked through spreadsheets and manual coordination.",
      body: "As privacy and compliance requirements increased, teams needed a reliable view of which native bridge capabilities were used by every bundle. Registration, approval, change review, deprecation, and migration progress were fragmented across people and spreadsheets.",
    },
    system: {
      title: "Make the full lifecycle visible, configurable, and enforceable.",
      features: [
        {
          title: "Data model and APIs",
          body: "Designed MySQL schemas for historical and incremental usage records, then built Node.js APIs for querying by bundle, application, version, and capability.",
        },
        {
          title: "Configurable approvals",
          body: "Replaced spreadsheet-based coordination with online requests, platform approval, allowlist configuration, and automated distribution.",
        },
        {
          title: "Build-time analysis",
          body: "Integrated static scanning into CI/CD to detect non-standard bridge usage and locate exact source positions before release.",
        },
        {
          title: "Operational visibility",
          body: "Combined runtime and compilation data in dashboards that tracked migration progress across 10 applications and 120 priority bundles.",
        },
      ],
    },
    flow: {
      title: "Governance loop",
      steps: [
        { label: "Discover", value: "Static Scan · Runtime Reports" },
        { label: "Govern", value: "Request · Review · Configure" },
        { label: "Improve", value: "Dashboard · Migration · Removal" },
      ],
    },
    outcome: {
      title: "Governance became part of the engineering workflow.",
      body: "The platform reduced manual coordination by about 60%, provided full lifecycle visibility across 10 apps and more than 120 bundles, and established a consistent compliance control model across build-time and runtime signals.",
    },
  },
];
