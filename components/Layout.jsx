import React from 'react';
import Head from 'next/head';

import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <script
          defer
          data-domain="mkr-ecommerce.vercel.app"
          src="https://plausible.io/js/script.js"
        ></script>
        <title>MKR Store</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
