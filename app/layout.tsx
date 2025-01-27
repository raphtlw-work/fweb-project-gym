import "./globals.css";

import type { Metadata } from "next";
import { Darker_Grotesque, Inter_Tight } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
});
const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-logo",
});

export const metadata: Metadata = {
  title: "FastGym Workspace",
  description:
    "Digital gym management dashboard for Sports Club in Temasek Poly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${darkerGrotesque.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
