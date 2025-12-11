const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const staticfilesPath = path.join(__dirname, '..', 'staticfiles');
const viteIndexPath = path.join(distPath, 'index.html');
const djangoTemplatePath = path.join(__dirname, '..', 'templates', 'index.html');

if (fs.existsSync(distPath)) {
  if (!fs.existsSync(staticfilesPath)) {
    fs.mkdirSync(staticfilesPath, { recursive: true });
  }
  
  const assetsPath = path.join(distPath, 'assets');
  const staticAssetsPath = path.join(staticfilesPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    if (fs.existsSync(staticAssetsPath)) {
      fs.rmSync(staticAssetsPath, { recursive: true, force: true });
    }
    fs.cpSync(assetsPath, staticAssetsPath, { recursive: true });
  }
  
  if (fs.existsSync(viteIndexPath)) {
    let content = fs.readFileSync(viteIndexPath, 'utf8');
    const cssMatch = content.match(/href="\/assets\/([^"]+\.css)"/);
    const jsMatch = content.match(/src="\/assets\/([^"]+\.js)"/);
    
    let djangoContent = '{% load static %}\n';
    djangoContent += '<!doctype html>\n';
    djangoContent += '<html lang="en">\n';
    djangoContent += '  <head>\n';
    djangoContent += '    <meta charset="UTF-8" />\n';
    djangoContent += '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n';
    djangoContent += '    <title>ATS Platform - Applicant Tracking System</title>\n';
    if (cssMatch) {
      djangoContent += `    <link rel="stylesheet" href="{% static 'assets/${cssMatch[1]}' %}" />\n`;
    }
    djangoContent += '  </head>\n';
    djangoContent += '  <body>\n';
    djangoContent += '    <div id="root"></div>\n';
    if (jsMatch) {
      djangoContent += `    <script type="module" src="{% static 'assets/${jsMatch[1]}' %}"></script>\n`;
    }
    djangoContent += '  </body>\n';
    djangoContent += '</html>\n';
    
    fs.writeFileSync(djangoTemplatePath, djangoContent);
    console.log('✓ Build complete');
  }
} else {
  console.error('Vite build output not found');
  process.exit(1);
}
