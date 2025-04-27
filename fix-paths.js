import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к итоговому HTML файлу
const htmlFilePath = path.join(__dirname, 'dist', 'public', 'index.html');

// Чтение HTML файла
console.log('Reading file:', htmlFilePath);
let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// Исправление путей к ресурсам
console.log('Fixing asset paths...');
htmlContent = htmlContent.replace(/src="\/assets\//g, 'src="/myportfolio/assets/');
htmlContent = htmlContent.replace(/href="\/assets\//g, 'href="/myportfolio/assets/');

// Добавление тега <base> для корректной работы роутера
console.log('Adding base tag...');
htmlContent = htmlContent.replace(
  '<meta charset="UTF-8" />',
  '<meta charset="UTF-8" />\n    <base href="/myportfolio/" />'
);

// Запись обновленного HTML файла
console.log('Writing updated file...');
fs.writeFileSync(htmlFilePath, htmlContent);

console.log('HTML file paths fixed successfully!'); 