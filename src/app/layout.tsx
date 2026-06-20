import React from "react";
import Navigation from "../Components/Navigate/Navigate"; 
import type { Metadata } from "next";
import Footer from "../Components/Footer/Footer";
import Providers from "./providers";
import "./../index.css";

export const metadata: Metadata = {
  title: "Art App",
  description: "Art App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <header className="header">
            <Navigation />
          </header>
          <main className="main">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
