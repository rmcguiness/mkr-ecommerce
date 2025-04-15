import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import PlausibleProvider from 'next-plausible';

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="https://mkr-ecommerce.vercel.app/">
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </PlausibleProvider>
  );
}

export default MyApp;
