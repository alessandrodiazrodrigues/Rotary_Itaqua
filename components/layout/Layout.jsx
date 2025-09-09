// components/layout/Layout.jsx
import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children, title = "Sistema de Convites", showNavigation = true, user = null }) => {
  return (
    <>
      <Head>
        <title>{title} - Rotary Club Itaquaquecetuba</title>
        <meta name="description" content="Sistema de Gestão de Convites - Rotary Club Itaquaquecetuba" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          rel="stylesheet" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        {showNavigation && <Navigation />}
        
        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
