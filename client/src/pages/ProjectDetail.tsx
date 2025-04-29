import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import useBasePath from "../lib/use-base-path";

const ProjectDetail = () => {
  const [_, params] = useRoute("/project/:id");
  const { t, i18n } = useTranslation();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { getPath } = useBasePath();

  useEffect(() => {
    window.scrollTo(0, 0); // Всегда наверх при открытии страницы
    // Find project by id
    if (params?.id) {
      // В реальном приложении мы бы получили данные из API
      // Теперь используем t() для получения проектов из текущей локализации
      const projects = t("projects.items", { returnObjects: true }) as any[];
      const projectData = projects.find(p => p.id.toString() === params.id);
      setProject(projectData);
      
      // Update page title
      if (projectData) {
        document.title = `${projectData.title} | ${t("meta.titleSuffix")}`;
      }
    }
    
    setLoading(false);
  }, [params?.id, t, i18n.language]); // Добавляем зависимость от языка
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">{t("projects.notFound")}</h1>
        <p className="text-muted-foreground mb-8">{t("projects.invalidId")}</p>
        <Button asChild>
          <Link href="/#projects">{t("projects.backToProjects")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen"
    >
      <div className="container mx-auto px-6">
        <Button asChild variant="ghost" className="mb-8 group">
          <Link href={getPath("/#projects")}>
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t("projects.backToProjects")}
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
              <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
              
              <div className="aspect-video overflow-hidden rounded-lg mb-8 bg-muted relative">
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
              
              <div className="prose prose-invert max-w-none mb-8">
                <h2>{t("projects.overview")}</h2>
                <p>{project.description}</p>
                
                <h2>{t("projects.goals")}</h2>
                <ul>
                  {project.goals.map((goal: string, index: number) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
                
                <h2>{t("projects.challenges")}</h2>
                <p>{project.challenges}</p>
                
                <h2>{t("projects.solution")}</h2>
                <p>{project.solution}</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:border-l lg:border-muted lg:pl-8"
          >
            <div className="sticky top-32">
              <h3 className="text-xl font-bold mb-6">{t("projects.projectDetails")}</h3>
              
              <div className="mb-8">
                <h4 className="text-sm uppercase text-muted-foreground mb-2">{t("projects.technologies")}</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <span 
                      key={index}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-sm uppercase text-muted-foreground mb-2">{t("projects.timeline")}</h4>
                <p>{project.timeline}</p>
              </div>
              
              <div className="space-y-4">
                {project.liveUrl && (
                  <Button asChild className="w-full justify-start">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("projects.liveDemo")}
                    </a>
                  </Button>
                )}
                
                {project.githubUrl && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {t("projects.viewSource")}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
