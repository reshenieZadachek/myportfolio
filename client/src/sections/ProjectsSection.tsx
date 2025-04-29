import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAnimation } from "../hooks/use-animation";
import { 
  ExternalLink, Github, Code, Box, Calendar, 
  ArrowRight, ArrowLeft, ChevronRight, Tags, 
  PanelTopClose, LayoutList, ArrowUpRight
} from "lucide-react";
import useBasePath from "../lib/use-base-path";

// Custom animated tab interface
interface ProjectFilterProps {
  categories: string[];
  activeFilter: string;
  setActiveFilter: (category: string) => void;
}

const ProjectFilter = ({ categories, activeFilter, setActiveFilter }: ProjectFilterProps) => {
  return (
    <motion.div 
      className="flex justify-center flex-wrap gap-2 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={index}
          onClick={() => setActiveFilter(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === category 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted/20 text-muted-foreground hover:bg-muted/40"
          }`}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

// Project indicator dots for carousel
interface IndicatorProps {
  length: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const Indicators = ({ length, currentIndex, setCurrentIndex }: IndicatorProps) => {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full ${
            currentIndex === index ? "bg-primary" : "bg-muted/50"
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: currentIndex === index ? 1.2 : 1,
            backgroundColor: currentIndex === index 
              ? "rgba(139, 92, 246, 1)" 
              : "rgba(139, 92, 246, 0.2)"
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
};

// Tech badge component with animation
interface TechBadgeProps {
  name: string;
  index: number;
}

const TechBadge = ({ name, index }: TechBadgeProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      whileHover={{ 
        y: -2, 
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        color: "white"
      }}
      className="text-xs bg-muted/30 border border-muted/50 text-muted-foreground px-3 py-1 rounded-full transition-all"
    >
      {name}
    </motion.span>
  );
};

// Featured project card with showcase effect
interface FeaturedProjectProps {
  project: any;
  index: number;
}

const FeaturedProject = ({ project, index }: FeaturedProjectProps) => {
  const { t } = useTranslation();
  const { getPath } = useBasePath();
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-gradient-to-br from-muted/5 to-muted/20 rounded-2xl p-6 md:p-8 border border-muted/30 shadow-lg mb-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {/* Project image/preview */}
      <motion.div 
        className="md:col-span-2 h-64 md:h-auto rounded-xl overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-0"></div>
        <div className="w-full h-full relative z-10 flex items-center justify-center">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('image-fallback');
            }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center image-fallback-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary/30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="4" fill="currentColor" />
              <path
                d="M6 12h12M12 6v12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        
        {/* Project status tag */}
        <div className="absolute top-4 left-4 bg-primary/80 text-white text-xs py-1 px-3 rounded-full">
          Featured
        </div>
      </motion.div>
      
      {/* Project details */}
      <div className="md:col-span-3 flex flex-col justify-between">
        <div>
          <motion.div 
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Box className="text-primary" size={16} />
            <span className="text-muted-foreground text-sm">
              {project.technologies.slice(0, 2).join(" • ")}
            </span>
          </motion.div>
          
          <motion.h3 
            className="text-2xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {project.description.substring(0, 180)}...
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-1" />
              {project.timeline}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech: string, techIndex: number) => (
                <TechBadge key={techIndex} name={tech} index={techIndex} />
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Button asChild className="group">
            <Link href={getPath(`/project/${project.id}`)}>
              {t("projects.details")}
              <ChevronRight className="ml-1 transition-transform group-hover:translate-x-1" size={16} />
            </Link>
          </Button>
          
          {project.liveUrl && (
            <Button asChild variant="outline">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="group"
              >
                {t("projects.liveDemo")}
                <ArrowUpRight className="ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
              </a>
            </Button>
          )}
          
          {project.githubUrl && (
            <Button asChild variant="ghost" className="w-10 h-10 p-0 rounded-full">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                title={t("projects.viewSource")}
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main project card component
interface ProjectCardProps {
  project: any;
  index: number;
  controls?: any;
}

const ProjectCard = ({ project, index, controls }: ProjectCardProps) => {
  const { t } = useTranslation();
  const { getPath } = useBasePath();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={controls || { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="project-card bg-background rounded-xl overflow-hidden shadow-lg border border-muted hover:border-primary transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-52">
        <motion.div 
          className="w-full h-full bg-gradient-to-br from-primary/10 to-muted/10 flex items-center justify-center"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? "brightness(0.7)" : "brightness(1)"
          }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('image-fallback');
            }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center image-fallback-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary/30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="4" fill="currentColor" />
              <path
                d="M6 12h12M12 6v12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 bg-primary/80 flex flex-col justify-center items-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h4 
            className="text-xl font-bold mb-2 text-primary-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.title}
          </motion.h4>
          <motion.p 
            className="text-primary-foreground text-center mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {project.shortDescription}
          </motion.p>
          <motion.div 
            className="flex space-x-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button asChild size="sm" variant="secondary">
              <Link href={getPath(`/project/${project.id}`)}>
                {t("projects.viewDetails")}
              </Link>
            </Button>
            {project.liveUrl && (
              <Button asChild size="sm" variant="outline">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="border-white text-white"
                >
                  {t("projects.liveDemo")}
                </a>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="p-6"
        animate={{ 
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.03)" : "transparent" 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-bold">{project.title}</h4>
          <div className="flex -space-x-1">
            {project.liveUrl && (
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Button asChild size="sm" variant="ghost" className="w-8 h-8 p-0">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    title={t("projects.liveDemo")}
                  >
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </a>
                </Button>
              </motion.div>
            )}
            {project.githubUrl && (
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Button asChild size="sm" variant="ghost" className="w-8 h-8 p-0">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    title={t("projects.viewSource")}
                  >
                    <Github className="h-4 w-4 text-primary" />
                  </a>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">{project.shortDescription}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
            <motion.span 
              key={techIndex}
              className="text-xs bg-muted/30 text-muted-foreground px-2 py-1 rounded-full border border-transparent"
              whileHover={{ 
                y: -2, 
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                color: "white",
                borderColor: "rgba(139, 92, 246, 0.2)"
              }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs bg-muted/10 text-muted-foreground px-2 py-1 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <Button 
          asChild 
          size="sm" 
          variant="ghost" 
          className="px-2.5 py-1 h-auto text-sm group"
        >
          <Link href={getPath(`/project/${project.id}`)} className="flex items-center">
            {t("projects.details")}
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </motion.span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

// Project carousel for featured projects
const ProjectCarousel = ({ projects }: { projects: any[] }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = projects.length - 1;
  
  const nextProject = () => {
    setCurrentIndex(prev => prev === maxIndex ? 0 : prev + 1);
  };
  
  const prevProject = () => {
    setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1);
  };
  
  return (
    <div className="relative mb-20">
      <motion.div 
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold flex items-center">
          <PanelTopClose className="text-primary mr-2" size={20} />
          {t("projects.featured")}
        </h3>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full w-10 h-10"
            onClick={prevProject}
          >
            <ArrowLeft size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full w-10 h-10"
            onClick={nextProject}
          >
            <ArrowRight size={16} />
          </Button>
        </div>
      </motion.div>
      
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <FeaturedProject 
              project={projects[currentIndex]} 
              index={currentIndex} 
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <Indicators 
        length={projects.length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimation();
  
  // Get projects based on current language
  const allProjects = t("projects.items", { returnObjects: true }) as any[];
  
  // Extract unique categories from projects
  const extractCategories = () => {
    const categories = new Set<string>();
    categories.add("All"); // Default category
    
    allProjects.forEach(project => {
      if (project.technologies && project.technologies.length) {
        project.technologies.forEach((tech: string) => {
          if (tech) categories.add(tech);
        });
      }
    });
    
    // Return only the first 6 categories to avoid clutter
    return Array.from(categories).slice(0, 6);
  };
  
  const [categories] = useState<string[]>(extractCategories);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState<any[]>(allProjects);
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  
  // Filter projects when activeFilter changes
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(
        allProjects.filter(project => 
          project.technologies && project.technologies.includes(activeFilter)
        )
      );
    }
    // Мы исключаем allProjects из зависимостей, так как это константа
  }, [activeFilter]);

  return (
    <section ref={ref} id="projects" className="py-20 bg-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-40 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-0 w-1/4 h-1/4 bg-primary/5 rounded-full filter blur-3xl opacity-50" />
      
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
            {t("projects.title.first")} <span className="text-primary">{t("projects.title.highlight")}</span>
          </motion.h2>
          
          <motion.div 
            className="h-1 w-20 bg-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          
          <motion.p 
            className="text-muted-foreground mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t("projects.description")}
          </motion.p>
        </motion.div>
        
        {/* Featured project carousel */}
        {allProjects.length > 0 && (
          <ProjectCarousel projects={allProjects.slice(0, 3)} />
        )}
        
        {/* Filter and view controls */}
        <motion.div 
          className="flex justify-between items-center flex-wrap gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tags className="text-primary" size={18} />
            <h3 className="text-xl font-bold">{t("projects.allProjects")}</h3>
          </motion.div>
          
          <motion.div 
            className="flex space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              variant={displayMode === "grid" ? "secondary" : "outline"} 
              size="sm" 
              onClick={() => setDisplayMode("grid")}
              className="flex items-center"
            >
              <PanelTopClose size={16} className="mr-1" />
              Grid
            </Button>
            <Button 
              variant={displayMode === "list" ? "secondary" : "outline"} 
              size="sm" 
              onClick={() => setDisplayMode("list")}
              className="flex items-center"
            >
              <LayoutList size={16} className="mr-1" />
              List
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Project filters */}
        <ProjectFilter 
          categories={categories} 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
        />
        
        {/* Projects grid */}
        <motion.div 
          className={`grid ${
            displayMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "grid-cols-1 gap-6"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence mode="sync">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Code className="text-primary w-16 h-16 mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground">
                  Try changing your filter selection
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveFilter("All")}
                  className="mt-4"
                >
                  Show all projects
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button 
            variant="outline"
            className="group"
          >
            {t("projects.viewAll")}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.6, 1]
              }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
