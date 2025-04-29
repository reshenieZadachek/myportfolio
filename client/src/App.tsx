import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "./context/LanguageContext";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "@/pages/not-found";
import useBasePath from "./lib/use-base-path";

// Тип для хука местоположения wouter
type LocationHook = () => [
  string,
  (to: string, options?: { replace?: boolean }) => void
];

function Router() {
  const { basePath } = useBasePath();
  
  // Создаем кастомную реализацию маршрутизации для Wouter
  // с учетом базового пути для GitHub Pages
  const useBasedLocation: LocationHook = () => {
    const [location, setLocation] = useState(window.location.pathname);
    
    useEffect(() => {
      // Обработка изменения пути
      const handleLocationChange = () => {
        let path = window.location.pathname;
        
        // Проверяем, есть ли у нас базовый путь и находимся ли мы на GitHub Pages
        const isGitHubPages = window.location.hostname.includes('github.io');
        const effectiveBasePath = isGitHubPages ? '/myportfolio' : '';
        
        // Если путь содержит базовый путь, удаляем его для внутреннего роутера
        if (effectiveBasePath && path.startsWith(effectiveBasePath)) {
          path = path.substring(effectiveBasePath.length) || '/';
        }
        
        console.log('Current path:', path); // Для отладки
        setLocation(path);
      };
      
      // Первичная установка
      handleLocationChange();
      
      // Слушаем изменения
      window.addEventListener('popstate', handleLocationChange);
      window.addEventListener('locationchange', handleLocationChange);
      
      return () => {
        window.removeEventListener('popstate', handleLocationChange);
        window.removeEventListener('locationchange', handleLocationChange);
      };
    }, []);
    
    // Функция для перехода на новый путь
    const navigate = (to: string, options?: { replace?: boolean }) => {
      const isGitHubPages = window.location.hostname.includes('github.io');
      const effectiveBasePath = isGitHubPages ? '/myportfolio' : '';
      
      // Для навигации добавляем базовый путь
      const newPath = effectiveBasePath 
        ? `${effectiveBasePath}${to === '/' ? '' : to}` 
        : to;
      
      if (options?.replace) {
        window.history.replaceState(null, '', newPath);
      } else {
        window.history.pushState(null, '', newPath);
      }
      
      // Уведомляем о смене маршрута через кастомное событие
      window.dispatchEvent(new Event('locationchange'));
      
      setLocation(to); // Для внутреннего состояния используем оригинальный путь
    };
    
    return [location, navigate];
  };
  
  return (
    <WouterRouter hook={useBasedLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/project/:id" component={ProjectDetail} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {loading ? (
          <Preloader />
        ) : (
          <>
            <CustomCursor />
            <Header />
            <Router />
            <Footer />
          </>
        )}
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
