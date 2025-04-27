import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

type LanguageToggleProps = {
  isMobile?: boolean;
};

const LanguageToggle = ({ isMobile = false }: LanguageToggleProps) => {
  const { language, changeLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "ru" : "en");
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center text-sm text-muted-foreground border border-muted rounded-md px-3 py-1 transition-colors"
    >
      <span className={language === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
      <span className="mx-1">/</span>
      <span className={language === "ru" ? "text-foreground" : "text-muted-foreground"}>RU</span>
    </motion.button>
  );
};

export default LanguageToggle;
