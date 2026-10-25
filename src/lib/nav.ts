/** Sections of the home page. `primary` ones appear in the top navigation. */
export const sections = [
  { id: "top", label: "Home", href: "/#top", primary: true },
  { id: "projects", label: "Projects", href: "/#projects", primary: true },
  { id: "lab", label: "AI Lab", href: "/#lab", primary: true },
  { id: "skills", label: "Skills", href: "/#skills", primary: true },
  { id: "about", label: "About", href: "/#about", primary: true },
  { id: "journey", label: "Journey", href: "/#journey", primary: false },
  { id: "data", label: "Data science", href: "/#data", primary: false },
  { id: "education", label: "Education", href: "/#education", primary: false },
  { id: "contact", label: "Contact", href: "/#contact", primary: true },
] as const;
