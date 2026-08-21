import React from "react";
import Footer from "../../Components/Footer/Footer";
import Script from "next/script";
import Navigation from "../../Components/Navigate/Navigate";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "./../../index.css";
import Providers from "../providers";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem("app_theme") || "dark"; 
                  document.documentElement.setAttribute("data-theme", theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <header className="header">
              <Navigation />
            </header>
            <main className="main">{children}</main>
            <footer>
              <Footer locale={locale} />
            </footer>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
