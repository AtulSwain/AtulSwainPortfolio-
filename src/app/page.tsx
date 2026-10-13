import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { Work } from "@/components/sections/work";
import { DataScience } from "@/components/sections/data-science";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { profile } from "@/content/profile";
import { existing } from "@/lib/assets";

export default function Home() {
  const photo = existing(profile.photo);
  const aboutPhoto = existing(profile.aboutPhoto) ?? photo;

  return (
    <>
      <Hero photo={photo} />
      <Marquee />
      <About photo={aboutPhoto} />
      <Journey />
      <Work />
      <DataScience />
      <Education />
      <Contact />
    </>
  );
}
