export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export const APP_NAME = "Alex Moreno";
export const APP_TAGLINE = "Desarrollador Full Stack";
export const APP_EMAIL = "alex@moreno.dev";
export const APP_LOCATION = "Madrid, España";

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Experiencia", href: "#experience" },
  { label: "Contacto", href: "#contact" },
];

export const primaryCTA = {
  label: "Descargar CV",
  href: "/cv-alex-moreno.pdf",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: "Github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
];