import { projects } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <section id="work" className="section">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="Selected Work"
          title={
            <>
              Things I&rsquo;ve designed,
              <br />
              built, and <span className="serif-italic text-accent">shipped</span>.
            </>
          }
          intro="A few projects that show how I think about product, performance, and the details in between."
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
