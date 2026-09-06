import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getGtmId() {
  if (process.env.GTM_ID && process.env.GTM_ID.trim()) {
    return process.env.GTM_ID.trim();
  }
  const configPaths = [
    path.resolve(__dirname, 'config.js'),
    path.resolve(__dirname, 'public/config.js')
  ];
  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      try {
        const content = fs.readFileSync(configPath, 'utf-8');
        const match = content.match(/(?:window\.)?(?:\[['"]GTM_ID['"]\]|GTM_ID)\s*[:=]\s*['"`]([^'"`]+)['"`]/i);
        if (match && match[1] && match[1].trim()) {
          return match[1].trim();
        }
      } catch (e) {
        console.warn('Failed to read config file:', configPath, e);
      }
    }
  }
  return null;
}

function googleAnalyticsPlugin() {
  return {
    name: 'vite-plugin-google-analytics',
    transformIndexHtml(html) {
      const gtmId = getGtmId();
      if (!gtmId) return html;

      if (gtmId.startsWith('GTM-')) {
        return [
          {
            tag: 'script',
            children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            injectTo: 'head-prepend'
          },
          {
            tag: 'noscript',
            children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            injectTo: 'body-prepend'
          }
        ];
      }

      return [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${gtmId}`
          },
          injectTo: 'head-prepend'
        },
        {
          tag: 'script',
          children: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${gtmId}');`,
          injectTo: 'head-prepend'
        }
      ];
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [googleAnalyticsPlugin()]
});

