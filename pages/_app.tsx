import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Analytics } from '@vercel/analytics/react';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import { Toaster } from 'react-hot-toast';
// import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
      <Toaster />
    </UserContext.Provider>
  );
}
