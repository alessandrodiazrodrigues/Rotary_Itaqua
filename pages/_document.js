// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* DNS Prefetch para otimização */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//script.google.com" />
        
        {/* Preload crítico */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
        />
      </Head>
      <body className="bg-gray-50 font-sans antialiased">
        <Main />
        <NextScript />
        
        {/* Script de inicialização */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevenir zoom em inputs no iOS
              if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                const viewport = document.querySelector('meta[name=viewport]');
                viewport.setAttribute('content', viewport.getAttribute('content') + ', user-scalable=no');
              }
              
              // Service Worker para PWA
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </Html>
  )
}
