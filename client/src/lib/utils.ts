import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Функция для плавного скролла к блокам
export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
  }
}
