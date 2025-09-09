// pages/_app.js
import '../styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Configurar NProgress
NProgress.configure({ showSpinner: false })

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
      NProgress.start()
    }
    
    const handleStop = () => {
      setLoading(false)
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Sistema de Convites - Rotary Club Itaquaquecetuba</title>
        <meta name="description" content="Sistema de Gestão de Convites para eventos do Rotary Club Itaquaquecetuba" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#17458f" />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Font Awesome */}
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          rel="stylesheet" 
        />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="Rotary Convites" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rotary Convites" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#17458f" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sistema de Convites - Rotary Club Itaquaquecetuba" />
        <meta property="og:description" content="Sistema de Gestão de Convites para eventos do Rotary Club Itaquaquecetuba" />
        <meta property="og:site_name" content="Rotary Club Itaquaquecetuba" />
        <meta property="og:url" content="https://convites.rotaryitaqua.org.br" />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      {/* Loading Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 z-50">
          <div className="h-full bg-yellow-500 animate-pulse"></div>
        </div>
      )}

      <Component {...pageProps} />
    </>
  )
}
