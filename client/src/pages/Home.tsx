import { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { language } = useLanguage();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Update document title based on language
    document.title = i18n.t("meta.title");
    
    // Smooth scroll to hash on initial load if present
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [language, i18n]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </motion.main>
  );
};

export default Home;
