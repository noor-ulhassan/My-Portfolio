import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
