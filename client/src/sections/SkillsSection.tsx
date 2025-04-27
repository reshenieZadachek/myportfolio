import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../hooks/use-animation";
import { 
  Code, Database, ServerIcon, Drill, Bot, Layout, 
  Shield, Rocket, BarChart3, Plug2, Braces, Globe, 
  Laptop, Terminal, Layers, Cpu, ChevronDown, ChevronRight, 
  Star, Github
} from "lucide-react";

// Skill card with progress bar
interface SkillCardProps {
  name: string;
  level: number;
  icon: JSX.Element;
  index: number;
}

const SkillCard = ({ name, level, icon, index }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        border: "1px solid rgba(139, 92, 246, 0.5)" 
      }}
      className="p-4 rounded-lg bg-background border border-muted shadow"
    >
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h4 className="font-medium">{name}</h4>
      </div>
      
      <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden mt-3">
        <motion.div 
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
      
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">Начальный</span>
        <span className="text-xs text-muted-foreground">Продвинутый</span>
      </div>
    </motion.div>
  );
};

// Accordion component for skills categories
interface SkillAccordionProps {
  title: string;
  icon: JSX.Element;
  children: React.ReactNode;
  index: number;
}

const SkillAccordion = ({ title, icon, children, index }: SkillAccordionProps) => {
  const [isOpen, setIsOpen] = useState(index === 0); // First one is open by default
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden border border-muted bg-background shadow"
    >
      <motion.div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary"
        >
          <ChevronDown />
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Tech badge component with animation
interface TechBadgeProps {
  name: string;
  icon?: JSX.Element;
  index: number;
}

const TechBadge = ({ name, icon, index }: TechBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5, 
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        color: "#fff"
      }}
      className="px-4 py-2 rounded-full bg-muted/20 text-sm flex items-center gap-2 border border-transparent hover:border-primary/30 transition-all"
    >
      {icon}
      {name}
    </motion.div>
  );
};

// Skill level indicator component
interface SkillLevelProps {
  level: number;
  name: string;
}

const SkillLevel = ({ level, name }: SkillLevelProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={14}
            className={`${star <= level ? "text-primary" : "text-muted/30"}`}
            fill={star <= level ? "currentColor" : "none"}
          />
        ))}
      </div>
      <span className="text-sm">{name}</span>
    </div>
  );
};

const SkillsSection = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimation();

  // Technical skills with level
  const technicalSkills = [
    { name: "JavaScript/TypeScript", level: 90, icon: <Braces className="text-primary" /> },
    { name: "React/React Native", level: 85, icon: <Code className="text-primary" /> },
    { name: "Node.js/Express", level: 80, icon: <ServerIcon className="text-primary" /> },
    { name: "HTML/CSS/Tailwind", level: 95, icon: <Layout className="text-primary" /> },
    { name: "PostgreSQL/MongoDB", level: 75, icon: <Database className="text-primary" /> },
    { name: "Git/GitHub", level: 85, icon: <Github className="text-primary" /> },
    { name: "Docker/Kubernetes", level: 70, icon: <Layers className="text-primary" /> },
    { name: "REST API/GraphQL", level: 85, icon: <Globe className="text-primary" /> }
  ];

  // Language proficiency
  const languages = [
    { name: "JavaScript", level: 5 },
    { name: "TypeScript", level: 4 },
    { name: "HTML/CSS", level: 5 },
    { name: "SQL", level: 4 },
    { name: "Python", level: 3 },
    { name: "Bash", level: 3 }
  ];

  // Skill categories with their respective icons and skills
  const skillCategories = [
    {
      title: t("skills.categories.frontend.title"),
      icon: <Laptop className="text-primary text-xl" />,
      skills: t("skills.categories.frontend.skills", { returnObjects: true }) as string[]
    },
    {
      title: t("skills.categories.state.title"),
      icon: <Database className="text-primary text-xl" />,
      skills: t("skills.categories.state.skills", { returnObjects: true }) as string[]
    },
    {
      title: t("skills.categories.backend.title"),
      icon: <ServerIcon className="text-primary text-xl" />,
      skills: t("skills.categories.backend.skills", { returnObjects: true }) as string[]
    },
    {
      title: t("skills.categories.devops.title"),
      icon: <Drill className="text-primary text-xl" />,
      skills: t("skills.categories.devops.skills", { returnObjects: true }) as string[]
    }
  ];

  const additionalExpertise = [
    { title: t("skills.additional.telegram"), icon: <Bot className="text-primary" /> },
    { title: t("skills.additional.crm"), icon: <BarChart3 className="text-primary" /> },
    { title: t("skills.additional.admin"), icon: <Layout className="text-primary" /> },
    { title: t("skills.additional.api"), icon: <Shield className="text-primary" /> },
    { title: t("skills.additional.deployment"), icon: <Rocket className="text-primary" /> },
    { title: t("skills.additional.websocket"), icon: <Plug2 className="text-primary" /> }
  ];

  return (
    <section ref={ref} id="skills" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full filter blur-3xl opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t("skills.title.first")} <span className="text-primary">{t("skills.title.highlight")}</span>
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-primary mx-auto rounded-full"
          ></motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto"
          >
            {t("skills.description")}
          </motion.p>
        </motion.div>
        
        {/* Technical skills with progress bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold mb-6 flex items-center"
          >
            <Cpu className="text-primary mr-2" /> Технические навыки
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {technicalSkills.map((skill, index) => (
              <SkillCard
                key={index}
                name={skill.name}
                level={skill.level}
                icon={skill.icon}
                index={index}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Languages proficiency */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16 p-6 bg-muted/10 rounded-xl border border-muted"
        >
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xl font-bold mb-6 flex items-center"
          >
            <Terminal className="text-primary mr-2" /> Языки программирования
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((lang, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={controls}
                transition={{ duration: 0.3, delay: 0.6 + 0.1 * index }}
              >
                <SkillLevel level={lang.level} name={lang.name} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Skill categories as accordions */}
        <div className="space-y-4 mb-16">
          {skillCategories.map((category, index) => (
            <SkillAccordion
              key={index}
              title={category.title}
              icon={category.icon}
              index={index}
            >
              <div className="flex flex-wrap gap-3 pt-4">
                {category.skills.map((skill, skillIndex) => (
                  <TechBadge
                    key={skillIndex}
                    name={skill}
                    index={skillIndex}
                  />
                ))}
              </div>
            </SkillAccordion>
          ))}
        </div>
        
        {/* Additional expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gradient-to-br from-primary/10 to-muted/10 rounded-xl p-8 shadow-lg border border-primary/20"
        >
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-xl font-bold mb-6 flex items-center"
          >
            <ChevronRight className="text-primary mr-2" /> {t("skills.additional.title")}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
            {additionalExpertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={controls}
                transition={{ duration: 0.3, delay: 1 + 0.1 * index }}
                whileHover={{ x: 5 }}
                className="flex items-center group"
              >
                <div className="w-10 h-10 bg-background/80 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                  {item.icon}
                </div>
                <span className="group-hover:text-primary transition-colors">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
