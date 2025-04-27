// Project types
export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  goals: string[];
  challenges: string;
  solution: string;
  timeline: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Language context types
export interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}
