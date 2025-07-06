const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../src/config.json');
const indexPath = path.join(__dirname, '../public/index.html');

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const lang = config.languages?.default || 'en';
const meta = config.meta?.[lang] || {};

let indexHtml = fs.readFileSync(indexPath, 'utf8');

indexHtml = indexHtml
  .replace('<!--TITLE-->', meta.title || '')
  .replace('<!--DESCRIPTION-->', meta.description || '')
  .replace('<!--CANONICAL-->', meta.canonical || '');

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Meta tags replaced in public/index.html for language:', lang); 