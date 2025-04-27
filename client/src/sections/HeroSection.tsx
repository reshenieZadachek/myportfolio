import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAnimation as useScrollAnimation } from "../hooks/use-animation";

// Animated background component
const AnimatedBackground = () => {
  // Структура для отдельного фонового элемента
  interface BlobItem {
    id: number;
    startX: number;
    startY: number; 
    midX1: number;
    midY1: number;
    midX2: number;
    midY2: number;
    endX: number;
    endY: number;
    scale: number;
    duration: number;
    createdAt: number;
  }
  
  const [activeBlobs, setActiveBlobs] = useState<BlobItem[]>([]);
  const [nextId, setNextId] = useState(1);
  const maxBlobs = 15; // Ограничиваем до 5 фоновых элементов одновременно
  
  // Создаем новый фоновый элемент с более интересной траекторией
  const createBlob = useCallback(() => {
    // Проверяем, не превышен ли лимит блобов
    if (activeBlobs.length >= maxBlobs) return;
    
    // Для более интересной траектории, выбираем случайный тип движения
    const movementType = Math.floor(Math.random() * 6);
    
    let startX, startY, midX1, midY1, midX2, midY2, endX, endY;
    
    switch(movementType) {
      case 0: // Волнообразное движение слева направо
        startX = -20;
        startY = 20 + Math.random() * 60;
        midX1 = 25 + Math.random() * 15;
        midY1 = startY - 20 - Math.random() * 10;
        midX2 = 60 + Math.random() * 15;
        midY2 = startY + 20 + Math.random() * 10;
        endX = 120;
        endY = startY;
        break;
        
      case 1: // Полукруг сверху вниз
        startX = 20 + Math.random() * 60;
        startY = -20;
        midX1 = startX + 30 + Math.random() * 20;
        midY1 = 30 + Math.random() * 15;
        midX2 = startX - 30 - Math.random() * 20;
        midY2 = 70 + Math.random() * 15;
        endX = startX;
        endY = 120;
        break;
        
      case 2: // Спиральное движение
        startX = -20;
        startY = 50;
        midX1 = 30;
        midY1 = 20;
        midX2 = 70;
        midY2 = 80;
        endX = 120;
        endY = 50;
        break;
        
      case 3: // Диагональный зигзаг
        startX = -20;
        startY = -20;
        midX1 = 50;
        midY1 = 110;
        midX2 = 70;
        midY2 = -10;
        endX = 120;
        endY = 120;
        break;
        
      case 4: // Плавная дуга через центр экрана
        startX = Math.random() < 0.5 ? -20 : 120;
        startY = Math.random() * 100;
        midX1 = 30;
        midY1 = 40;
        midX2 = 70;
        midY2 = 60;
        endX = startX === -20 ? 120 : -20;
        endY = Math.random() * 100;
        break;
        
      case 5: // Случайное плавное движение
        startX = Math.random() < 0.5 ? -20 : 120;
        startY = Math.random() * 100;
        midX1 = 20 + Math.random() * 30;
        midY1 = Math.random() * 100;
        midX2 = 50 + Math.random() * 30;
        midY2 = Math.random() * 100;
        endX = Math.random() < 0.5 ? -20 : 120;
        endY = Math.random() * 100;
        break;
        
      default:
        startX = -20;
        startY = Math.random() * 100;
        midX1 = 40;
        midY1 = Math.random() * 100;
        midX2 = 80;
        midY2 = Math.random() * 100;
        endX = 120;
        endY = Math.random() * 100;
    }
    
    // Более медленная анимация: от 70 до 100 секунд
    const duration = 70 + Math.random() * 30;
    
    // Случайный размер от 0.5 до 1.5
    const scale = Math.random() * 1 + 0.5;
    
    const newBlob: BlobItem = {
      id: nextId,
      startX,
      startY,
      midX1,
      midY1,
      midX2,
      midY2,
      endX,
      endY,
      scale,
      duration,
      createdAt: Date.now()
    };
    
    // Добавляем новый блоб и увеличиваем счетчик ID
    setActiveBlobs(prev => [...prev, newBlob]);
    setNextId(prev => prev + 1);
  }, [nextId, activeBlobs.length, maxBlobs]);
  
  // Запускаем таймер для добавления новых блобов
  useEffect(() => {
    // Первый элемент появляется сразу
    createBlob();
    
    // Затем с интервалом
    const interval = setInterval(() => {
      // Проверяем перед созданием
      if (activeBlobs.length < maxBlobs) {
        createBlob();
      }
    }, 10000); // Каждые 10 секунд добавляем новый фоновый элемент
    
    return () => clearInterval(interval);
  }, [createBlob, activeBlobs.length, maxBlobs]);
  
  // Удаляем фоновые элементы, которые завершили анимацию
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setActiveBlobs(prev => 
        prev.filter(item => {
          // Удаляем, если блоб существует дольше своей длительности анимации
          return now - item.createdAt < item.duration * 1000;
        })
      );
    }, 5000); // Проверяем каждые 5 секунд
    
    return () => clearInterval(cleanupInterval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {activeBlobs.map((blob) => (
        <motion.div
          key={`blob-${blob.id}`}
          className="absolute w-[150px] h-[150px] rounded-full bg-primary/5"
          initial={{
            x: `${blob.startX}vw`,
            y: `${blob.startY}vh`,
            scale: blob.scale,
            opacity: 0
          }}
          animate={{
            x: [
              `${blob.startX}vw`,
              `${blob.midX1}vw`,
              `${blob.midX2}vw`,
              `${blob.endX}vw`
            ],
            y: [
              `${blob.startY}vh`,
              `${blob.midY1}vh`,
              `${blob.midY2}vh`,
              `${blob.endY}vh`
            ],
            opacity: [0, 0.7, 0.7, 0],
            scale: [blob.scale, blob.scale * 1.2, blob.scale * 0.9, blob.scale]
          }}
          transition={{
            duration: blob.duration,
            times: [0, 0.3, 0.7, 1],
            ease: "linear"
          }}
          style={{
            filter: "blur(50px)"
          }}
        />
      ))}
    </div>
  );
};

// Text with typewriter effect
interface TypewriterTextProps {
  text: string;
  delay?: number;
}

const TypewriterText = ({ text, delay = 2 }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedText("");
      setCurrentIndex(0);
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [delay, displayedText]);
  
  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

// Floating technology icons
const FloatingTechs = () => {
  const technologies = [
    "React", "Node.js", "TypeScript", "MongoDB",
    "PostgreSQL", "Express", "CSS", "HTML",
    "Redux", "Git", "Docker", "AWS"
  ];
  
  // Структура для отдельной технологии
  interface TechItem {
    id: number;
    name: string;
    startX: number;
    startY: number;
    midX1: number;
    midY1: number;
    midX2: number;
    midY2: number;
    endX: number;
    endY: number;
    rotate: number;
    duration: number;
    createdAt: number;
  }
  
  const [activeItems, setActiveItems] = useState<TechItem[]>([]);
  const [nextId, setNextId] = useState(1);
  const maxTechs = 5; // Ограничиваем до 5 технологий одновременно
  
  // Создаем новую технологию с более интересной траекторией
  const createTech = useCallback(() => {
    // Проверяем, не превышен ли лимит технологий
    if (activeItems.length >= maxTechs) return;
    
    // Выбираем случайную технологию из списка
    const randomIndex = Math.floor(Math.random() * technologies.length);
    const techName = technologies[randomIndex];
    
    // Для более интересной траектории, выбираем случайный тип движения
    const movementType = Math.floor(Math.random() * 5);
    
    let startX, startY, midX1, midY1, midX2, midY2, endX, endY;
    
    switch(movementType) {
      case 0: // Слева направо с изгибом
        startX = -10;
        startY = 30 + Math.random() * 40; // Посередине экрана
        midX1 = 30 + Math.random() * 20; // Первая точка изгиба
        midY1 = 10 + Math.random() * 30; // Ближе к верху
        midX2 = 60 + Math.random() * 20; // Вторая точка изгиба
        midY2 = 50 + Math.random() * 40; // Ближе к низу
        endX = 110;
        endY = 30 + Math.random() * 40; // Посередине экрана
        break;
      
      case 1: // Справа налево с изгибом
        startX = 110;
        startY = 30 + Math.random() * 40;
        midX1 = 70 - Math.random() * 20;
        midY1 = 60 + Math.random() * 30;
        midX2 = 40 - Math.random() * 20;
        midY2 = 10 + Math.random() * 30;
        endX = -10;
        endY = 30 + Math.random() * 40;
        break;
      
      case 2: // Сверху вниз по диагонали
        startX = 10 + Math.random() * 30;
        startY = -10;
        midX1 = 30 + Math.random() * 20;
        midY1 = 30 + Math.random() * 20;
        midX2 = 60 + Math.random() * 20;
        midY2 = 60 + Math.random() * 20;
        endX = 80 + Math.random() * 30;
        endY = 110;
        break;
      
      case 3: // Снизу вверх по диагонали
        startX = 80 + Math.random() * 30;
        startY = 110;
        midX1 = 60 - Math.random() * 20;
        midY1 = 60 - Math.random() * 20;
        midX2 = 30 - Math.random() * 20;
        midY2 = 30 - Math.random() * 20;
        endX = 10 - Math.random() * 30;
        endY = -10;
        break;
        
      case 4: // Случайное движение по экрану
        startX = Math.random() * 100;
        startY = Math.random() < 0.5 ? -10 : 110;
        midX1 = 20 + Math.random() * 60;
        midY1 = 20 + Math.random() * 60;
        midX2 = 20 + Math.random() * 60;
        midY2 = 20 + Math.random() * 60;
        endX = Math.random() * 100;
        endY = Math.random() < 0.5 ? -10 : 110;
        break;
      
      default: // Стандартное движение (слева направо)
        startX = -10;
        startY = 30 + Math.random() * 40;
        midX1 = 30 + Math.random() * 20;
        midY1 = startY + (Math.random() * 20 - 10);
        midX2 = 60 + Math.random() * 20;
        midY2 = startY + (Math.random() * 20 - 10);
        endX = 110;
        endY = startY + (Math.random() * 20 - 10);
    }
    
    // Случайный поворот текста с возможностью изменения в пути
    const rotate = Math.random() * 10 - 5; // от -5 до +5 градусов
    
    // Более медленная анимация: 30-50 секунд
    const duration = 30 + Math.random() * 20;
    
    const newTech: TechItem = {
      id: nextId,
      name: techName,
      startX,
      startY,
      midX1,
      midY1,
      midX2,
      midY2,
      endX,
      endY,
      rotate,
      duration,
      createdAt: Date.now()
    };
    
    // Добавляем новую технологию к активным
    setActiveItems(prev => [...prev, newTech]);
    setNextId(prev => prev + 1);
  }, [nextId, technologies, activeItems.length, maxTechs]);
  
  // Запускаем таймер для добавления новых технологий
  useEffect(() => {
    // Первая технология появляется сразу
    createTech();
    
    // Остальные с интервалом
    const interval = setInterval(() => {
      // Проверяем перед созданием
      if (activeItems.length < maxTechs) {
        createTech();
      }
    }, 7000); // Интервал 7 секунд
    
    return () => clearInterval(interval);
  }, [createTech, activeItems.length, maxTechs]);
  
  // Удаляем технологии, которые завершили свою анимацию
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setActiveItems(prev => 
        prev.filter(item => {
          // Удаляем, если технология существует дольше своей длительности анимации
          return now - item.createdAt < item.duration * 1000;
        })
      );
    }, 2000);
    
    return () => clearInterval(cleanupInterval);
  }, []);
  
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 pointer-events-none overflow-hidden">
      {activeItems.map((tech) => (
        <motion.div
          key={`tech-${tech.id}`}
          className="absolute text-xs md:text-sm font-mono bg-muted/30 backdrop-blur-sm text-primary px-2 py-1 rounded"
          initial={{ 
            x: `${tech.startX}vw`, 
            y: `${tech.startY}vh`,
            opacity: 0,
            rotate: tech.rotate - 5
          }}
          animate={{ 
            x: [
              `${tech.startX}vw`,
              `${tech.midX1}vw`,
              `${tech.midX2}vw`,
              `${tech.endX}vw`
            ],
            y: [
              `${tech.startY}vh`,
              `${tech.midY1}vh`,
              `${tech.midY2}vh`,
              `${tech.endY}vh`
            ],
            opacity: [0, 0.8, 0.8, 0],
            rotate: [tech.rotate - 5, tech.rotate, tech.rotate + 5, tech.rotate]
          }}
          transition={{
            duration: tech.duration,
            times: [0, 0.3, 0.7, 1], // Более равномерное распределение ключевых кадров
            ease: "linear"
          }}
        >
          {tech.name}
        </motion.div>
      ))}
    </div>
  );
};

// 3D Tilt Effect Card
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  
  // Автоматическое вращение с периодической паузой для мыши
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);
  
  // Это для медленного вращения, когда мышь не взаимодействует
  useEffect(() => {
    if (!autoRotateEnabled) return;
    
    const autoRotate = () => {
      if (!autoRotateEnabled) return;
      
      const time = Date.now() / 1000;
      const newX = Math.sin(time * 0.3) * 15;
      const newY = Math.cos(time * 0.2) * 10;
      
      x.set(newX);
      y.set(newY);
      
      if (autoRotateEnabled) {
        requestAnimationFrame(autoRotate);
      }
    };
    
    const animationId = requestAnimationFrame(autoRotate);
    
    return () => cancelAnimationFrame(animationId);
  }, [x, y, autoRotateEnabled]);
  
  // Глобальное отслеживание мыши для эффекта слежения
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (!cardRef.current || !document.hasFocus()) return;
      
      // Проверяем, находится ли мышь в области видимости карточки
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      
      // Расстояние от курсора до центра карточки
      const distX = mouseX - cardCenterX;
      const distY = mouseY - cardCenterY;
      
      // Дистанция от мыши до центра карточки
      const distance = Math.sqrt(distX * distX + distY * distY);
      
      // Если мышь достаточно близко к карточке (в пределах 400px)
      if (distance < 400) {
        setAutoRotateEnabled(false);
        
        // Рассчитываем угол наклона на основе положения мыши относительно карточки
        const xValue = distX / 10; // Мягкий коэффициент
        const yValue = distY / 10;
        
        x.set(xValue);
        y.set(yValue);
      } else {
        // За пределами зоны влияния
        setAutoRotateEnabled(true);
      }
    };
    
    window.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [x, y]);
  
  function handleMouse(event: React.MouseEvent) {
    if (!cardRef.current) return;
    
    setAutoRotateEnabled(false);
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Усиленный эффект при наведении
    x.set((event.clientX - centerX) / 7);
    y.set((event.clientY - centerY) / 7);
  }
  
  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouse}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="relative w-full h-full"
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const { t } = useTranslation();
  const { ref, controls } = useScrollAnimation();
  const mainControls = useAnimation();
  
  useEffect(() => {
    mainControls.start("visible");
  }, [mainControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };

  // Технологии для циклического показа
  const techSkills = ["React", "Node.js", "TypeScript", "PostgreSQL", "Express"];
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % techSkills.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="pt-24 pb-20 min-h-screen flex items-center relative overflow-hidden">
      <AnimatedBackground />
      <FloatingTechs />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={mainControls}
          className="flex flex-col md:flex-row md:items-center"
        >
          <motion.div className="md:w-3/5 mb-12 md:mb-0" variants={itemVariants}>
            <motion.div 
              variants={itemVariants}
              className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-semibold mb-6"
            >
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t("hero.greeting")}
              </motion.div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-3"
            >
              {t("hero.title.first")} <span className="text-primary">{t("hero.title.highlight")}</span>
            </motion.h1>
            
            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl font-semibold mb-6 h-10 text-primary/80"
            >
              <TypewriterText text={techSkills[currentTechIndex]} delay={2} />
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10"
            >
              {t("hero.description")}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button 
                asChild 
                size="lg"
                className="relative overflow-hidden group"
              >
                <a href="#projects">
                  <motion.span
                    className="absolute inset-0 bg-primary/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  {t("hero.cta.primary")}
                </a>
              </Button>
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.15 }
                }}
              >
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-muted hover:border-primary transition-colors"
                >
                  <a href="#contact">{t("hero.cta.secondary")}</a>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex items-center mt-12 overflow-hidden"
            >
              <div className="flex space-x-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.2 }}
                    className="w-10 h-10 rounded-full bg-primary/20 border border-background flex items-center justify-center text-xs font-bold"
                  >
                    {["JS", "TS", "DB", "API"][i]}
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 }}
                className="ml-4 text-sm text-muted-foreground"
              >
                <span className="font-semibold text-primary">+20</span> технологий
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="md:w-2/5 flex justify-center md:justify-end"
          >
            <TiltCard>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="relative"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/20 shadow-2xl flex items-center justify-center">
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1], 
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-dashed border-primary/20"></div>
                    </motion.div>
                    
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ 
                        rotate: [360, 0],
                      }}
                      transition={{ 
                        duration: 30, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-2 border-dashed border-primary/30"></div>
                    </motion.div>
                    
                    <svg 
                      className="w-32 h-32 md:w-40 md:h-40 text-primary"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path 
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.12C6.25 17.8 6 17.3 6 16.75C6 14.99 7.34 13.5 9 13.5H15C16.66 13.5 18 14.99 18 16.75C18 17.3 17.75 17.8 17.34 18.12C15.9 19.33 14.03 20 12 20Z" 
                        fill="currentColor" 
                        fillOpacity="0.5"
                        animate={{ 
                          fillOpacity: [0.3, 0.7, 0.3] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </svg>
                    
                    {/* Floating code elements */}
                    {[
                      { symbol: "</>", x: -60, y: -50 },
                      { symbol: "{}", x: 60, y: -40 },
                      { symbol: "[]", x: -50, y: 60 },
                      { symbol: "=>", x: 50, y: 55 }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-xs font-mono bg-background/80 backdrop-blur-sm text-primary px-2 py-1 rounded z-20"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          x: [item.x - 5, item.x + 5, item.x - 5],
                          y: [item.y - 5, item.y + 5, item.y - 5], 
                        }}
                        transition={{ 
                          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                          x: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
                          y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{
                          left: "50%",
                          top: "50%",
                          marginLeft: `${item.x}px`,
                          marginTop: `${item.y}px`,
                        }}
                      >
                        {item.symbol}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                  className="absolute -bottom-6 -right-6 bg-background rounded-full p-4 shadow-lg border border-primary/20 z-20"
                >
                  <motion.div 
                    className="w-16 h-16 flex items-center justify-center bg-primary/20 rounded-full"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(139, 92, 246, 0.3)", transition: { duration: 0.2 } }}
                  >
                    <motion.svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                      animate={{ 
                        rotate: [0, 10, 0, -10, 0],
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path d="M16 18 22 12 16 6" />
                      <path d="M8 6 2 12 8 18" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
