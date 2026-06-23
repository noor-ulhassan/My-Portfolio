import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { ResumeCta } from "@/components/sections/resume-cta";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <ResumeCta />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
