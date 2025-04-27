import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation as useFramerAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Code, Terminal, Database, Globe, Users, Layers } from "lucide-react";
import { useAnimation } from "../hooks/use-animation";

// Animated pulse component
const AnimatedPulse = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0.3 }}
      animate={{ 
        scale: [0.8, 1.2, 0.8],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay
      }}
      className="absolute w-full h-full rounded-full bg-primary/20"
    />
  );
};

// Experience timeline component
const ExperienceTimeline = () => {
  const experiences = [
    { 
      year: "2023-2025", 
      position: "Старший Frontend Разработчик", 
      company: "NovaJs" 
    },
    { 
      year: "2020-2023", 
      position: "Fullstack Разработчик", 
      company: "ДиджиталПродакшн" 
    },
    { 
      year: "2018-2020", 
      position: "Веб-разработчик", 
      company: "СайтМастер" 
    }
  ];
  
  return (
    <div className="relative pl-8 my-8">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20"></div>
      
      {/* Timeline points */}
      {experiences.map((exp, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="mb-6 relative"
        >
          {/* Timeline dot */}
          <div className="absolute left-[-8px] top-2 w-4 h-4 bg-background border-2 border-primary rounded-full">
            <AnimatedPulse delay={index * 0.5} />
          </div>
          
          <div className="bg-muted/20 p-4 rounded-lg border border-muted">
            <div className="text-primary font-semibold">{exp.year}</div>
            <div className="font-bold text-lg">{exp.position}</div>
            <div className="text-muted-foreground">{exp.company}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Skill chip component
interface SkillChipProps {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  index?: number;
}

const SkillChip = ({ icon: Icon, label, index = 0 }: SkillChipProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      viewport={{ once: true }}
      className="flex items-center space-x-2 bg-muted/30 rounded-full px-4 py-2 text-sm"
    >
      {Icon && <Icon className="h-4 w-4 text-primary" />}
      <span>{label}</span>
    </motion.div>
  );
};

// Professional card with 3D effect
interface ProfessionalCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  index?: number;
}

const ProfessionalCard = ({ title, description, icon: Icon, index = 0 }: ProfessionalCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.2)", transition: { duration: 0.2 } }}
      className="bg-background border border-muted rounded-lg p-5 shadow-lg transition-all"
    >
      <div className="mb-4 rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

// Counter animation
interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const Counter = ({ end, duration = 2, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const nextCount = Math.floor(progress * end);
      
      setCount(nextCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
    
    return () => {
      startTimestamp = null;
    };
  }, [end, duration]);
  
  return (
    <span>
      {count}{suffix}
    </span>
  );
};

const AboutSection = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimation();


  // Professional skills
  const professionalSkills = [
    { 
      icon: Code, 
      title: "Фронтенд Разработка", 
      description: "Создание отзывчивых, быстрых и современных пользовательских интерфейсов с использованием React и TypeScript."
    },
    { 
      icon: Database, 
      title: "Бэкенд Разработка", 
      description: "Разработка масштабируемых серверных приложений с использованием Node.js и современных баз данных."
    },
    { 
      icon: Terminal, 
      title: "DevOps и Автоматизация", 
      description: "Настройка CI/CD пайплайнов, автоматизация процессов развертывания и оптимизация инфраструктуры."
    },
    { 
      icon: Users, 
      title: "Командное Сотрудничество", 
      description: "Работа в Agile-командах, код-ревью, пар-программирование и эффективная коммуникация."
    },
    { 
      icon: Globe, 
      title: "Веб-оптимизация", 
      description: "Улучшение производительности, SEO-оптимизация и оптимизация пользовательского опыта."
    },
    { 
      icon: Layers, 
      title: "Архитектурный Дизайн", 
      description: "Проектирование масштабируемой архитектуры приложений, учитывающей будущий рост и изменения требований."
    }
  ];

  // Statistics
  const stats = [
    { value: 50, suffix: "+", label: t("about.stats.projects") },
    { value: 30, suffix: "+", label: t("about.stats.clients") },
    { value: 5, suffix: "+", label: t("about.stats.experience") }
  ];

  return (
    <section ref={ref} id="about" className="py-20 bg-muted/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("about.title.first")} <span className="text-primary">{t("about.title.highlight")}</span>
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-2/5"
          >
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-primary/20 to-muted/20 p-6 border border-primary/10">
                {/* Developer image/avatar */}
                <div className="relative aspect-square w-full max-w-sm mx-auto bg-muted/20 rounded-xl flex items-center justify-center overflow-hidden">
                  <motion.div
                    className="absolute inset-0 z-0"
                    animate={{ 
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "linear"
                    }}
                    style={{
                      background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(30,30,30,0) 70%)",
                      backgroundSize: "150% 150%"
                    }}
                  />
                  
                  <svg 
                    className="w-32 h-32 md:w-40 md:h-40 text-primary z-10"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path 
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.12C6.25 17.8 6 17.3 6 16.75C6 14.99 7.34 13.5 9 13.5H15C16.66 13.5 18 14.99 18 16.75C18 17.3 17.75 17.8 17.34 18.12C15.9 19.33 14.03 20 12 20Z" 
                      fill="currentColor" 
                      fillOpacity="0.3"
                    />
                  </svg>
                  
                  {/* Animated circles */}
                  <motion.div
                    className="absolute w-56 h-56 rounded-full border-2 border-dashed border-primary/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-40 h-40 rounded-full border border-primary/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                {/* Floating skill tags */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {["React", "Node.js", "TypeScript", "UX/UI", "SQL"].map((skill, i) => (
                    <SkillChip key={i} label={skill} index={i} />
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="absolute top-0 right-0 bg-primary p-4 rounded-lg shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              >
                <p className="font-bold text-primary-foreground text-lg">
                  <Counter end={5} duration={2} suffix="+" /> {t("about.yearsExp")}
                </p>
              </motion.div>
            </div>
            
            {/* Experience timeline */}
            <ExperienceTimeline />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:w-3/5"
          >
            <motion.h3 
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t("about.subtitle")}
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t("about.paragraphs.first")}
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {t("about.paragraphs.second")}
            </motion.p>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex flex-col p-4 rounded-lg bg-muted/10 border border-muted"
                  whileHover={{ y: -5, backgroundColor: "rgba(139, 92, 246, 0.05)", transition: { duration: 0.2 } }}
                >
                  <span className="text-primary text-4xl font-bold">
                    <Counter end={stat.value} duration={1.5 + index * 0.5} suffix={stat.suffix} />
                  </span>
                  <span className="text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Professional skills grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 1 }}
              className="mb-8"
            >
              <h4 className="text-xl font-semibold mb-4">Профессиональные навыки</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {professionalSkills.slice(0, 4).map((skill, i) => (
                  <ProfessionalCard 
                    key={i} 
                    icon={skill.icon} 
                    title={skill.title} 
                    description={skill.description}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Call to action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                asChild
                className="relative overflow-hidden group"
              >
                <a href="#contact">
                  <motion.span
                    className="absolute inset-0 bg-primary/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  {t("about.cta.hire")}
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
