'use client';

import { ReactNode, Suspense } from 'react';
import Loading from './components/Loading';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <head>
        <title>My Blog</title>
        <meta name="description" content="A simple blog built with Next.js" />
      </head>
      <body>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
