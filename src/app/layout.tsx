import { ReactNode } from "react";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
