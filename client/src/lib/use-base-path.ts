/**
 * Хук для определения базового пути для роутинга
 * Для GitHub Pages нужно учитывать базовый путь
 */
export default function useBasePath() {
  // Определяем базовый путь из метатега base, который устанавливает Vite
  const basePath = document.querySelector('base')?.getAttribute('href') || '/';
  
  /**
   * Создаёт корректный путь с учётом базового пути
   * @param path путь относительно корня приложения
   * @returns полный путь с учётом базового пути
   */
  const getPath = (path: string): string => {
    // Если путь начинается с /, удаляем его, чтобы избежать дублирования
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    // Если базовый путь заканчивается на /, добавляем путь как есть
    const cleanBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    return `${cleanBase}${cleanPath}`;
  };

  return {
    basePath,
    getPath
  };
} 