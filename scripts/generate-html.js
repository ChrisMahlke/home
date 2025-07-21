import fs from 'fs';
import path from 'path';

// Read the strings.json file
const stringsPath = path.join(process.cwd(), 'src', 'strings.json');
const strings = JSON.parse(fs.readFileSync(stringsPath, 'utf8'));

// Generate HTML content
const htmlContent = `<!doctype html>
<html lang="${strings.html.lang}" dir="${strings.html.dir}">
  <head>
    <meta charset="${strings.html.charset}" />
    <link rel="icon" type="image/svg+xml" href="${strings.icons.favicon}" />
    <link rel="manifest" href="${strings.icons.manifest}" />
    <meta name="viewport" content="${strings.html.viewport}" />
    <meta name="description" content="${strings.app.description}" />
    <meta name="keywords" content="${strings.html.keywords}" />
    <meta name="author" content="${strings.html.author}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${strings.meta.og.type}" />
    <meta property="og:url" content="${strings.meta.og.url}" />
    <meta property="og:title" content="${strings.meta.og.title}" />
    <meta property="og:description" content="${strings.meta.og.description}" />
    <meta property="og:image" content="${strings.meta.og.image}" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="${strings.meta.twitter.card}" />
    <meta property="twitter:url" content="${strings.meta.twitter.url}" />
    <meta property="twitter:title" content="${strings.meta.twitter.title}" />
    <meta property="twitter:description" content="${strings.meta.twitter.description}" />
    <meta property="twitter:image" content="${strings.meta.twitter.image}" />
    
    <meta name="theme-color" content="${strings.html.themeColor}" />
    <meta name="apple-mobile-web-app-capable" content="${strings.html.appleMobileWebAppCapable}" />
    <meta name="apple-mobile-web-app-status-bar-style" content="${strings.html.appleMobileWebAppStatusBarStyle}" />
    <meta name="apple-mobile-web-app-title" content="${strings.html.appleMobileWebAppTitle}" />
    <meta http-equiv="X-Content-Type-Options" content="${strings.html.xContentTypeOptions}" />
    <meta http-equiv="Referrer-Policy" content="${strings.html.referrerPolicy}" />
    <title>${strings.app.title}</title>
  </head>
  <body>
    <div id="root" role="${strings.app.role}" aria-label="${strings.app.ariaLabel}"></div>
    <script type="module" src="${strings.scripts.main}"></script>
  </body>
</html>`;

// Write the index.html file
const htmlPath = path.join(process.cwd(), 'index.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ index.html generated from strings.json'); 