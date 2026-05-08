import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Imran Sabir — including Typing Test, Expense Tracker, Active User dashboard, and a Mini Project sandbox.",
};

export default function ProjectsPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-32 pt-40">
      <SectionHeading
        eyebrow="Projects"
        title="Recently shipped, still polishing."
        description="Hand-picked work that shows how I think, design, and build."
      />

      <div className="mt-16 space-y-12">
        {projects.map((p, i) => (
          <ProjectShowcase key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
