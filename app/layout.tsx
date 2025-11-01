import type { Metadata } from "next";
import { WalletProvider } from "@/context/WalletContext";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import Analytics from "./analytics";
import MixpanelAnalytics from "./analytics-mixpanel";

export const metadata: Metadata = {
  title: "TokenCasa - Invista em imóveis a partir de R$ 100",
  description: "Da poupança para o patrimônio imobiliário em 5 minutos",
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Analytics />
        <MixpanelAnalytics />
      </head>
      <body className="antialiased bg-gray-50">
        <ErrorBoundary>
          <WalletProvider>
            {children}
          </WalletProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
