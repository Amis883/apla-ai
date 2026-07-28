export interface GenerationResult {
  resumePreview: string;
  coverLetterPreview: string;
  atsScore: number;
  missingKeywords: string[];
}

const COMMON_KEYWORDS = [
  "leadership",
  "stakeholder management",
  "cross-functional",
  "agile",
  "data-driven",
  "strategic planning",
  "mentoring",
  "roadmap",
  "KPIs",
  "scalability",
] as const;

function extractRoleHint(jobDescription: string): string {
  const lines = jobDescription.trim().split("\n").filter(Boolean);
  const firstLine = lines[0]?.slice(0, 80) ?? "this role";
  return firstLine.replace(/^(job title|position|role):\s*/i, "").trim();
}

function pickMissingKeywords(jobDescription: string, count = 4): string[] {
  const lower = jobDescription.toLowerCase();
  const fromJd = COMMON_KEYWORDS.filter((kw) => !lower.includes(kw.split(" ")[0]!));
  const shuffled = [...fromJd].sort(() => (Math.random() > 0.5 ? 1 : -1));
  return shuffled.slice(0, count);
}

function scoreFromDescription(jobDescription: string): number {
  const words = jobDescription.trim().split(/\s+/).length;
  const base = 62 + Math.min(words / 12, 28);
  const jitter = Math.floor(Math.random() * 6);
  return Math.min(96, Math.round(base + jitter));
}

export function generateMockResults(
  jobDescription: string,
  file: File | null
): GenerationResult {
  const role = extractRoleHint(jobDescription);
  const fileLabel = file?.name.replace(/\.[^.]+$/, "") ?? "your background";

  const resumePreview = `SUMMARY
Results-oriented professional aligned with ${role}. Materials derived from ${fileLabel} emphasize measurable outcomes and role-specific strengths.

EXPERIENCE
• Led initiatives that improved team delivery and cross-team alignment
• Partnered with stakeholders to define priorities and ship on schedule
• Mentored colleagues and contributed to a culture of clear communication

SKILLS
Product strategy · Collaboration · Problem solving · Written communication`;

  const coverLetterPreview = `Dear Hiring Manager,

I am writing to express my interest in ${role}. After reviewing the role requirements, I am confident my experience reflects the impact you are looking for.

In recent roles, I have focused on delivering outcomes that matter to both users and the business—translating goals into clear plans, collaborating across teams, and maintaining high standards for quality. I would welcome the opportunity to bring that same approach to your organization.

Thank you for your consideration. I look forward to discussing how I can contribute.

Best regards,
[Your name]`;

  return {
    resumePreview,
    coverLetterPreview,
    atsScore: scoreFromDescription(jobDescription),
    missingKeywords: pickMissingKeywords(jobDescription),
  };
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
