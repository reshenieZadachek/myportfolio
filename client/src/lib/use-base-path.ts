/**
 * Хук для получения базового пути для маршрутизации
 * Если приложение запущено на GitHub Pages, базовый путь - '/myportfolio/'
 * В противном случае - '/'
 */
function useBasePath() {
  // Проверяем, запущено ли приложение на GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  // Устанавливаем базовый путь
  const basePath = isGitHubPages ? '/myportfolio/' : '/';
  
  /**
   * Функция для получения полного пути с учетом базового пути
   * @param path - Путь, относительный к базовому пути
   * @returns Полный путь с учетом базового пути
   */
  const getPath = (path: string): string => {
    // Очищаем входящий путь от дублирования базового пути
    let cleanPath = path;
    
    if (isGitHubPages) {
      // Удаляем все варианты базового пути из входящего пути
      cleanPath = path.replace(/^\/myportfolio\//, '/').replace(/^\/myportfolio/, '/');
    }
    
    // Обработка путей с якорями (#)
    if (cleanPath.includes('#')) {
      const [pathPart, anchor] = cleanPath.split('#');
      if (pathPart === '' || pathPart === '/') {
        // Если путь пустой или корневой, возвращаем базовый путь с якорем
        return `${basePath}#${anchor}`;
      }
      // Иначе формируем путь с якорем
      return `${basePath}${pathPart.replace(/^\//, '')}#${anchor}`;
    }
    
    // Нормализация пути: убираем начальный слеш и соединяем с базовым путем
    if (cleanPath === '/') {
      return basePath;
    }
    
    return `${basePath}${cleanPath.replace(/^\//, '')}`;
  };
  
  return { basePath, getPath, isGitHubPages };
}

export default useBasePath; 