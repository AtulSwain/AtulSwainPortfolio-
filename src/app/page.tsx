import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Work } from "@/components/home/work";
import { Journey } from "@/components/home/journey";
import { DataScience } from "@/components/home/data-science";
import { Skills } from "@/components/home/skills";
import { Education } from "@/components/home/education";
import { Contact } from "@/components/home/contact";
import { profile } from "@/content/profile";
import { existing } from "@/lib/assets";

export default function Home() {
  return (
    <>
      <Hero photo={existing(profile.photo)} />
      <About />
      <Work />
      <Journey />
      <DataScience />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
