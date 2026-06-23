import { projects } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <section id="work" className="section border-t border-border">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Work"
          title={
            <>
              Featured <span className="serif-italic text-metallic-orange">Work.</span>
            </>
          }
          intro="A few things I've built, and what I learned making them."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
