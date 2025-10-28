'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function MixpanelAnalytics() {
  const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

  useEffect(() => {
    if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
      // @ts-ignore
      if (window.mixpanel) {
        // @ts-ignore
        window.mixpanel.init(MIXPANEL_TOKEN);
        
        // Track page view
        // @ts-ignore
        window.mixpanel.track('Page View', {
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }, [MIXPANEL_TOKEN]);

  if (!MIXPANEL_TOKEN) {
    return null;
  }

  return (
    <Script
      id="mixpanel-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(e,b){if(!b.__SV){var a,f,i,g;b.mixpanel={};if(!b._i){function b(){return new Function("return this")()}}var d=b[e];if(!d){var c=0,a=function(a){if(a.indexOf(".")>=0){var b=a.split(".");a=1;for(var c=0;c<b.length;c++){a=a[b[c]]}return a}return null};while(true){try{if(/^(document|location)$/.test(e)||a(e)){f=b._i[e];break}}catch(h){e=b.__SV=(b.__SV||[]).concat([[e,0]])}c++;if(c>100){f=true;break}}f&&(i=d.prototype.emit=d.prototype.emit||d,i.constructor=b.mixpanel,i.emit.apply(i,b.__SV),b.__SV=[]),b._i={}}a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=document.getElementsByTagName("script")[0];g.parentNode.insertBefore(a,g)}})("document",(window.mixpanel=window.mixpanel||[]));
        `,
      }}
    />
  );
}

