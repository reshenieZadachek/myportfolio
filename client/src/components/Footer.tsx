import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { FaTelegram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Footer navigation items
  const footerNavItems = [
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") }
  ];

  // Social links
  const socialLinks = [
    { icon: <FaTelegram />, href: "https://t.me/username", label: "Telegram" },
    { icon: <FaGithub />, href: "https://github.com/username", label: "GitHub" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com/in/username", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-muted/20 border-t border-muted py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary">DV</span>_Dev
            </Link>
            <p className="text-muted-foreground mt-2">{t("footer.role")}</p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center mb-6 md:mb-0">
            {footerNavItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 text-center">
          <p className="text-muted-foreground">© {currentYear} {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
