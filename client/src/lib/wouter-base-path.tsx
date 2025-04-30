import React, { useState, useCallback, useEffect } from 'react';
import { Router, RouterProps, BaseLocationHook } from 'wouter';
import useBasePath from './use-base-path';

/**
 * Кастомный хук для работы с локацией с учетом базового пути
 */
const useBasedLocation: BaseLocationHook = () => {
  // Получаем базовый путь и функцию для создания полных путей
  const { basePath, getPath, isGitHubPages } = useBasePath();
  
  // Инициализация текущего пути
  const [path, setPath] = useState<string>(() => {
    // Получаем текущий путь из location и убираем базовый путь, если он есть
    const currentPath = window.location.pathname;
    return currentPath.startsWith(basePath) 
      ? currentPath.slice(basePath.length - 1) || '/' 
      : currentPath;
  });

  // Следим за изменениями локации
  useEffect(() => {
    const handleLocationChange = () => {
      // Когда URL меняется, обновляем текущий путь
      const newPath = window.location.pathname;
      const normalizedPath = newPath.startsWith(basePath) 
        ? newPath.slice(basePath.length - 1) || '/' 
        : newPath;
      
      setPath(normalizedPath);
    };

    // Слушаем события изменения истории и кастомное событие изменения локации
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('locationchange', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('locationchange', handleLocationChange);
    };
  }, [basePath]);

  // Функция для навигации на новый путь
  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    // Убираем базовый путь, если он уже есть в URL
    let cleanTo = to;
    if (isGitHubPages) {
      cleanTo = to.replace(/^\/myportfolio\//, '/').replace(/^\/myportfolio/, '/');
    }
    
    // Создаем полный путь с учетом базового пути
    const fullPath = getPath(cleanTo);
    
    // Добавляем новую запись в историю браузера
    if (options?.replace) {
      window.history.replaceState(null, '', fullPath);
    } else {
      window.history.pushState(null, '', fullPath);
    }
    
    // Генерируем событие изменения локации для обновления приложения
    window.dispatchEvent(new Event('locationchange'));
    
    // Обновляем внутреннее состояние пути (без базового пути)
    const normalizedPath = cleanTo.startsWith('/') ? cleanTo : `/${cleanTo}`;
    setPath(normalizedPath);
  }, [getPath, isGitHubPages]);

  return [path, navigate];
};

/**
 * Компонент для маршрутизации с учетом базового пути
 */
export const BaseRouter: React.FC<RouterProps> = ({ children, ...props }) => {
  return (
    <Router hook={useBasedLocation} {...props}>
      {children}
    </Router>
  );
};

export default BaseRouter; 