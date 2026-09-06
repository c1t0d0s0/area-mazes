/**
 * Google Analytics (gtag.js / GTM) loader
 * If the tag was already embedded into HTML at build time, this does nothing.
 * Otherwise, it reads window.GTM_ID (or dynamically loads config.js) and embeds the tag.
 */

export function loadAnalyticsTag(id) {
  if (!id || typeof id !== 'string') return;
  const trimmedId = id.trim();
  if (!trimmedId) return;

  // Prevent duplicate insertion if already present
  if (document.querySelector(`script[src*="googletagmanager.com"]`) || window.gtag) {
    return;
  }

  if (trimmedId.startsWith('GTM-')) {
    // Google Tag Manager
    const gtmScript = document.createElement('script');
    gtmScript.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${trimmedId}');`;
    document.head.prepend(gtmScript);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${trimmedId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.prepend(noscript);
  } else {
    // Google Analytics 4 / Google tag (gtag.js)
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trimmedId}`;
    document.head.prepend(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', trimmedId);
  }
}

export function initGoogleAnalytics() {
  if (typeof window === 'undefined') return;

  // If already loaded in HTML by Vite transform, do nothing
  if (document.querySelector('script[src*="googletagmanager.com"]') || window.gtag) {
    return;
  }

  // If window.GTM_ID is already set
  if (window.GTM_ID) {
    loadAnalyticsTag(window.GTM_ID);
    return;
  }

  // Attempt to load config.js if present in the runtime environment
  const configScript = document.createElement('script');
  configScript.src = './config.js';
  configScript.onload = () => {
    if (window.GTM_ID) {
      loadAnalyticsTag(window.GTM_ID);
    }
  };
  configScript.onerror = () => {
    // config.js not found in runtime, ignore silently
  };
  document.head.appendChild(configScript);
}
