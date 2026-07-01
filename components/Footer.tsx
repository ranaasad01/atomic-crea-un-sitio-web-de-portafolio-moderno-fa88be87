"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, Heart } from 'lucide-react';
import { navLinks, APP_NAME, APP_EMAIL, APP_LOCATION, socialLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={18} />,
  Linkedin: <Linkedin size={18} />,
  Twitter: <Twitter size={18} />,
};

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <Link
              href="/"
              className="inline-block font-[family-name:var(--font-space-grotesk)] font-bold text-xl tracking-tight text-white mb-3"
            >
              <span className="text-violet-400">{"{"}</span>
              {APP_NAME}
              <span className="text-violet-400">{"}"}</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 font-[family-name:var(--font-inter)]">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  className="p-2 text-slate-500 hover:text-violet-400 bg-white/5 hover:bg-violet-500/10 rounded-lg border border-white/5 hover:border-violet-500/20 transition-all duration-200"
                >
                  {iconMap[social.icon]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5 font-[family-name:var(--font-inter)]">
              {t("footer.nav_title")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-[family-name:var(--font-inter)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5 font-[family-name:var(--font-inter)]">
              {t("footer.contact_title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${APP_EMAIL}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors duration-200 font-[family-name:var(--font-inter)]"
                >
                  <Mail size={14} />
                  {APP_EMAIL}
                </a>
              </li>
              <li className="text-sm text-slate-500 font-[family-name:var(--font-inter)]">
                {APP_LOCATION}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-600 font-[family-name:var(--font-inter)]">
            {t("footer.copyright", { year: "2024", name: APP_NAME })}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-600 font-[family-name:var(--font-inter)]">
            {t("footer.made_with")}
            <Heart size={11} className="text-violet-500 fill-violet-500" />
            {t("footer.made_with_end")}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}