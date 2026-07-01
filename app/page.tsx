"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowRight, ExternalLink, Star, CheckCircle, Code, Layout, Terminal, Activity, Sparkles, ArrowUp } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_EMAIL, APP_LOCATION } from "@/lib/data";
import { fadeInUp, fadeIn, fadeInLeft, fadeInRight, staggerContainer, scaleIn, cardHover } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline data ────────────────────────────────────────────────────────────

const skills = [
  { category: "Frontend", icon: "layout", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"] },
  { category: "Backend", icon: "terminal", items: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Redis"] },
  { category: "DevOps", icon: "activity", items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Linux"] },
  { category: "Herramientas", icon: "code", items: ["Git", "Figma", "Postman", "Jest", "Storybook", "Webpack"] },
];

const projects = [
  {
    title: "Finova Dashboard",
    description: "Plataforma de análisis financiero en tiempo real con visualizaciones interactivas, alertas personalizadas y reportes automatizados para equipos de inversión.",
    tags: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    image: "https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/143cef99c5803c2ff4e45e138dbf3d23bbe1cc50/80837a3eec1467ad4166b0acbc61bf20d38b68ec",
    href: "https://github.com",
    live: "https://finova.demo",
    featured: true,
  },
  {
    title: "EcoTrack App",
    description: "Aplicación móvil y web para el seguimiento de huella de carbono personal con gamificación, retos comunitarios y recomendaciones de IA.",
    tags: ["React Native", "Node.js", "MongoDB", "OpenAI"],
    image: "https://play-lh.googleusercontent.com/9isYo684we01-2j_bPTVRhs22cNkaNQQzGYvTXL5afLJCEY1ZhW2q_aw8Tpz1zF6d3FTG3Z3ajoevaoStQNvZg",
    href: "https://github.com",
    live: "https://ecotrack.demo",
    featured: true,
  },
  {
    title: "Shopify Headless",
    description: "Tienda e-commerce headless de alto rendimiento con SSR, búsqueda semántica y checkout optimizado que redujo el abandono un 34%.",
    tags: ["Next.js", "Shopify", "Algolia", "Stripe"],
    image: "https://cdn.shopify.com/app-store/listing_images/2ffa3e5d7e0311e260c10350738dd1f0/icon/CLaZ2pOhr4ADEAE=.png",
    href: "https://github.com",
    live: "https://shop.demo",
    featured: false,
  },
  {
    title: "DevCollab",
    description: "Plataforma colaborativa para equipos de desarrollo con revisión de código en tiempo real, integración con GitHub y métricas de productividad.",
    tags: ["React", "WebSockets", "NestJS", "Redis"],
    image: "https://devcollaborative.com/sites/default/files/images/devcollab-logo.png",
    href: "https://github.com",
    live: "https://devcollab.demo",
    featured: false,
  },
];

const experience = [
  {
    role: "Senior Full Stack Engineer",
    company: "Vercel",
    period: "2022 — Presente",
    description: "Desarrollo de funcionalidades core de la plataforma de despliegue. Lideré la migración de la arquitectura de monolito a microservicios, reduciendo el tiempo de build un 60%.",
    highlights: ["Arquitectura de microservicios", "Optimización de rendimiento", "Mentoring de equipo junior"],
  },
  {
    role: "Full Stack Developer",
    company: "Cabify",
    period: "2020 — 2022",
    description: "Construí y mantuve el panel de gestión de flotas y el sistema de pagos internacionales. Implementé nuevas integraciones con pasarelas de pago en 8 países.",
    highlights: ["Panel de gestión de flotas", "Integración de pagos", "APIs REST y GraphQL"],
  },
  {
    role: "Frontend Developer",
    company: "Typeform",
    period: "2018 — 2020",
    description: "Desarrollé el editor visual de formularios y el sistema de temas dinámicos. Mejoré el rendimiento del editor un 45% mediante optimizaciones de React.",
    highlights: ["Editor visual drag-and-drop", "Sistema de temas", "Optimización React"],
  },
];

const testimonials = [
  {
    name: "Sara Jiménez",
    role: "CTO en Finova",
    avatar: "https://m.media-amazon.com/images/M/MV5BZDM5NDVjMWQtMmQyNy00YjMyLTg3ODAtMmY1OTA1MTEyNGE4XkEyXkFqcGc@._V1_.jpg",
    text: "Alex transformó nuestra visión en un producto real en tiempo récord. Su capacidad técnica y atención al detalle son excepcionales. El dashboard que construyó superó todas nuestras expectativas.",
    stars: 5,
  },
  {
    name: "Carlos Rueda",
    role: "Product Manager en Cabify",
    avatar: "https://cvhealthclinic.com/wp-content/uploads/2024/04/KxakYQ4w-e1714411490530.jpeg",
    text: "Trabajar con Alex fue una experiencia increíble. Siempre propone soluciones elegantes a problemas complejos y entrega código limpio y bien documentado.",
    stars: 5,
  },
  {
    name: "Marta Vidal",
    role: "CEO en EcoTrack",
    avatar: "https://win-advisor-media-library.s3.us-west-1.amazonaws.com/wp-content/uploads/2026/06/17130924/Marta-Vidal-new-president-CAVA-D.O-768x512.jpeg",
    text: "Desde el primer día, Alex entendió perfectamente nuestra misión. Construyó la app con una calidad de producto que normalmente solo ves en empresas mucho más grandes.",
    stars: 5,
  },
];

const stats = [
  { value: "6+", label: "Años de experiencia" },
  { value: "40+", label: "Proyectos entregados" },
  { value: "15+", label: "Clientes satisfechos" },
  { value: "99%", label: "Tasa de satisfacción" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SkillIcon({ type }: { type: string }) {
  const cls = "text-violet-400";
  if (type === "layout") return <Layout size={20} className={cls} />;
  if (type === "terminal") return <Terminal size={20} className={cls} />;
  if (type === "activity") return <Activity size={20} className={cls} />;
  return <Code size={20} className={cls} />;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-[#0f0f0f] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 grid md:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold tracking-wide font-[family-name:var(--font-inter)] mb-2">
                <Sparkles size={12} />
                {t("hero.available")}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance"
            >
              {t("hero.greeting")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                {APP_NAME}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl font-[family-name:var(--font-space-grotesk)] font-medium text-slate-300"
            >
              {APP_TAGLINE}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-base leading-relaxed max-w-md font-[family-name:var(--font-inter)] text-pretty"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_36px_rgba(124,58,237,0.55)] font-[family-name:var(--font-inter)]"
              >
                {t("hero.cta_primary")}
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 font-[family-name:var(--font-inter)]"
              >
                {t("hero.cta_secondary")}
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 pt-1">
              {[
                { icon: <Github size={18} />, href: "https://github.com", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <Twitter size={18} />, href: "https://twitter.com", label: "Twitter" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 text-slate-400 hover:text-violet-400 bg-white/5 hover:bg-violet-500/10 rounded-xl border border-white/5 hover:border-violet-500/20 transition-all duration-200"
                >
                  {s.icon}
                </motion.a>
              ))}
              <span className="text-slate-600 text-sm font-[family-name:var(--font-inter)] ml-1">{APP_LOCATION}</span>
            </motion.div>
          </motion.div>

          {/* Right: avatar + stats */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-8"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/20 blur-2xl scale-110" />
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-violet-500/30 shadow-[0_0_60px_rgba(124,58,237,0.25)]">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQGCX4mBAGcKow/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1683327678972?e=2147483647&v=beta&t=hJTqQAVa0UqW9O4ZCaane1zqnDJ4WEYe5fiH6q5qiN8"
                  alt={`${APP_NAME} — ${APP_TAGLINE}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-[#1a1a2e] border border-violet-500/30 rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white font-[family-name:var(--font-inter)]">{t("hero.open_to_work")}</span>
                </div>
              </motion.div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.04 }}
                  className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center hover:border-violet-500/20 transition-all duration-200"
                >
                  <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-violet-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-[family-name:var(--font-inter)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-violet-500/40" />
          <ArrowUp size={12} className="rotate-180" />
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div {...motionProps(fadeInLeft)} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/10 to-transparent rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_60px_-12px_rgba(0,0,0,0.5)]">
                <img
                  src="https://laraveldaily.com/uploads/2025/07/nativephp-web-join-event.png"
                  alt="Espacio de trabajo de Alex Moreno"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              </div>
              {/* Floating card */}
              <motion.div
                {...motionProps(scaleIn)}
                className="absolute -bottom-6 -right-6 bg-[#161616] border border-white/8 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Code size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white font-[family-name:var(--font-space-grotesk)]">100k+ líneas</div>
                    <div className="text-xs text-slate-500 font-[family-name:var(--font-inter)]">de código en producción</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div {...motionProps(fadeInRight)} className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest font-[family-name:var(--font-inter)]">{t("about.label")}</span>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold tracking-tight mt-2 text-balance">
                  {t("about.title")}
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed font-[family-name:var(--font-inter)]">
                {t("about.p1")}
              </p>
              <p className="text-slate-400 leading-relaxed font-[family-name:var(--font-inter)]">
                {t("about.p2")}
              </p>
              <ul className="grid grid-cols-2 gap-2 pt-2">
                {[
                  t("about.trait1"),
                  t("about.trait2"),
                  t("about.trait3"),
                  t("about.trait4"),
                  t("about.trait5"),
                  t("about.trait6"),
                ].map((trait) => (
                  <li key={trait} className="flex items-center gap-2 text-sm text-slate-300 font-[family-name:var(--font-inter)]">
                    <CheckCircle size={14} className="text-violet-400 shrink-0" />
                    {trait}
                  </li>
                ))}
              </ul>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="self-start inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600/15 hover:bg-violet-600/25 text-violet-400 font-semibold rounded-xl border border-violet-500/20 hover:border-violet-500/40 transition-all duration-200 font-[family-name:var(--font-inter)] text-sm"
              >
                {t("about.cta")}
                <ArrowRight size={14} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-32 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest font-[family-name:var(--font-inter)]">{t("skills.label")}</span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold tracking-tight mt-2 text-balance">
              {t("skills.title")}
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto font-[family-name:var(--font-inter)] leading-relaxed">
              {t("skills.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.category}
                variants={scaleIn}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors duration-200">
                    <SkillIcon type={skill.icon} />
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white">{skill.category}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="px-2.5 py-1 text-xs font-medium text-slate-400 bg-white/5 rounded-lg border border-white/5 font-[family-name:var(--font-inter)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...motionProps(fadeInUp)} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest font-[family-name:var(--font-inter)]">{t("projects.label")}</span>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold tracking-tight mt-2 text-balance">
                {t("projects.title")}
              </h2>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors duration-200 font-[family-name:var(--font-inter)] shrink-0"
            >
              <Github size={16} />
              {t("projects.view_all")}
              <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* Featured projects — large */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 gap-6 mb-6"
          >
            {projects.filter((p) => p.featured).map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/20 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 font-[family-name:var(--font-inter)]">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs font-medium text-violet-400 bg-violet-500/10 rounded-lg border border-violet-500/15 font-[family-name:var(--font-inter)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200 font-[family-name:var(--font-inter)]"
                    >
                      <Github size={14} />
                      {t("projects.code")}
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors duration-200 font-[family-name:var(--font-inter)]"
                    >
                      <ExternalLink size={14} />
                      {t("projects.live")}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Other projects — compact */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {projects.filter((p) => !p.featured).map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="group bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">{project.title}</h3>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-500 hover:text-white transition-colors duration-200">
                      <Github size={16} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live" className="text-slate-500 hover:text-violet-400 transition-colors duration-200">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 font-[family-name:var(--font-inter)]">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs font-medium text-slate-500 bg-white/5 rounded-md font-[family-name:var(--font-inter)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 md:py-32 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest font-[family-name:var(--font-inter)]">{t("experience.label")}</span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold tracking-tight mt-2 text-balance">
              {t("experience.title")}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent md:-translate-x-1/2 hidden md:block" />

            <div className="flex flex-col gap-12">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  {...motionProps(i % 2 === 0 ? fadeInLeft : fadeInRight)}
                  className={`relative md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                >
                  {/* Dot */}
                  <div className={`hidden md:block absolute top-6 w-3 h-3 rounded-full bg-violet-500 border-2 border-[#0f0f0f] shadow-[0_0_12px_rgba(124,58,237,0.6)] ${i % 2 === 0 ? "-right-[calc(2rem+6px)]" : "-left-[calc(2rem+6px)]"}`} />

                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)]">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">{exp.role}</h3>
                        <p className="text-violet-400 font-semibold text-sm font-[family-name:var(--font-inter)]">{exp.company}</p>
                      </div>
                      <span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5 font-[family-name:var(--font-inter)] shrink-0">{exp.period}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 font-[family-name:var(--font-inter)]">{exp.description}</p>
                    <ul className="flex flex-col gap-1.5">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-slate-400 font-[family-name:var(--font-inter)]">
                          <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest font-[family-name:var(--font-inter)]">{t("testimonials.label")}</span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold tracking-tight mt-2 text-balance">
              {t("testimonials.title")}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t_item, i) => (
              <motion.div
                key={t_item.name}
                variants={scaleIn}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300 ${i === 1 ? "md:mt-6" : ""}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t_item.stars }).map((_, si) => (
                    <Star key={si} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-[family-name:var(--font-inter)] italic">
                  &ldquo;{t_item.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                    <img src={t_item.avatar} alt={t_item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white font-[family-name:var(--font-space-grotesk)]">{t_item.name}</div>
                    <div className="text-xs text-slate-500 font-[family-name:var(--font-inter)]">{t_item.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: info */}
            <motion.div {...motionProps(fadeInLeft)} className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest font-[family-name:var(--font-inter)]">{t("contact.label")}</span>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold tracking-tight mt-2 text-balance">
                  {t("contact.title")}
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed font-[family-name:var(--font-inter)]">
                {t("contact.description")}
              </p>

              <div className="flex flex-col gap-4 pt-2">
                <a
                  href={`mailto:${APP_EMAIL}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-violet-400 transition-colors duration-200 font-[family-name:var(--font-inter)] text-sm group"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors duration-200">
                    <Mail size={16} className="text-violet-400" />
                  </div>
                  {APP_EMAIL}
                </a>
                <div className="flex items-center gap-3 text-slate-400 font-[family-name:var(--font-inter)] text-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Activity size={16} className="text-slate-500" />
                  </div>
                  {APP_LOCATION}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: <Github size={18} />, href: "https://github.com", label: "GitHub" },
                  { icon: <Linkedin size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Twitter size={18} />, href: "https://twitter.com", label: "Twitter" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 text-slate-400 hover:text-violet-400 bg-white/5 hover:bg-violet-500/10 rounded-xl border border-white/5 hover:border-violet-500/20 transition-all duration-200"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div {...motionProps(fadeInRight)}>
              {submitted ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/[0.03] border border-violet-500/20 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-violet-400" />
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-2">{t("contact.success_title")}</h3>
                  <p className="text-slate-400 text-sm font-[family-name:var(--font-inter)]">{t("contact.success_msg")}</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide font-[family-name:var(--font-inter)]">{t("contact.name")}</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      placeholder={t("contact.name_placeholder")}
                      className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all duration-200 font-[family-name:var(--font-inter)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide font-[family-name:var(--font-inter)]">{t("contact.email")}</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      placeholder={t("contact.email_placeholder")}
                      className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all duration-200 font-[family-name:var(--font-inter)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide font-[family-name:var(--font-inter)]">{t("contact.message")}</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      placeholder={t("contact.message_placeholder")}
                      className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all duration-200 resize-none font-[family-name:var(--font-inter)]"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(124,58,237,0.3)] hover:shadow-[0_0_36px_rgba(124,58,237,0.5)] font-[family-name:var(--font-inter)] flex items-center justify-center gap-2"
                  >
                    {t("contact.send")}
                    <ArrowRight size={16} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}