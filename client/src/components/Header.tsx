import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import LanguageToggle from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Функция для плавного скролла к секциям
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Дополнительный отступ для хедера
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define navigation items
  const navItems = [
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-sm border-b border-muted" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-foreground">
            <span className="text-primary">DV</span>_Dev
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className="relative text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const sectionId = item.href.replace('#', '');
                  scrollToSection(sectionId);
                }}
              >
                {item.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <div className="flex items-center space-x-4 ml-4">
              <LanguageToggle />
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </nav>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-4 pt-4 pb-6 border-t border-muted mt-4">
                {navItems.map((item) => (
                  <a 
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      const sectionId = item.href.replace('#', '');
                      scrollToSection(sectionId);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex items-center space-x-4 pt-2">
                  <LanguageToggle isMobile={true} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
