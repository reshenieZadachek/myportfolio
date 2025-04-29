/**
 * Хук для определения базового пути для роутинга
 * Для GitHub Pages нужно учитывать базовый путь
 */
export default function useBasePath() {
  // Определяем, находимся ли мы на GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  // Определяем базовый путь
  // Сначала проверяем тег base, если его нет, то используем значение по умолчанию
  const basePathFromTag = document.querySelector('base')?.getAttribute('href');
  const basePath = basePathFromTag || (isGitHubPages ? '/myportfolio/' : '/');
  
  /**
   * Создаёт корректный путь с учётом базового пути
   * @param path путь относительно корня приложения
   * @returns полный путь с учётом базового пути
   */
  const getPath = (path: string): string => {
    // Если маршрут содержит якорь (/#projects), обрабатываем его особым образом
    if (path.includes('#')) {
      const [urlPart, anchorPart] = path.split('#');
      // Обрабатываем основную часть URL без якоря
      const cleanUrlPart = urlPart === '/' ? '' : (urlPart.startsWith('/') ? urlPart.substring(1) : urlPart);
      // Если базовый путь заканчивается на /, добавляем путь как есть
      const cleanBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
      // Возвращаем полный путь с якорем
      return `${cleanBase}${cleanUrlPart}#${anchorPart}`;
    }
    
    // Стандартная обработка для обычных путей
    // Если путь начинается с /, удаляем его, чтобы избежать дублирования
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    // Если базовый путь заканчивается на /, добавляем путь как есть
    const cleanBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    return `${cleanBase}${cleanPath}`;
  };

  return {
    basePath,
    getPath,
    isGitHubPages
  };
} 