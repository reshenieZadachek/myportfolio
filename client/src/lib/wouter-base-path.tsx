import React, { useState, useCallback, useEffect } from 'react';
import { Router, RouterProps, BaseLocationHook } from 'wouter';
import useBasePath from './use-base-path';

/**
 * Кастомный хук для работы с локацией с учетом базового пути
 */
const useBasedLocation: BaseLocationHook = () => {
  // Получаем базовый путь и функцию для создания полных путей
  const { basePath, getPath } = useBasePath();
  
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

    // Слушаем событие изменения истории
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [basePath]);

  // Функция для навигации на новый путь
  const navigate = useCallback((to: string) => {
    // Создаем полный путь с учетом базового пути
    const fullPath = getPath(to);
    
    // Добавляем новую запись в историю браузера
    window.history.pushState(null, '', fullPath);
    
    // Обновляем внутреннее состояние пути
    // Убираем базовый путь из URL для внутреннего состояния
    const normalizedPath = to.startsWith('/') ? to : `/${to}`;
    setPath(normalizedPath);
  }, [getPath]);

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