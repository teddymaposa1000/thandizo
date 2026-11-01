import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thandizo — Verified Care. Shared Hope.",
  description:
    "Thandizo connects people who cannot afford medical treatment with donors, companies and communities willing to help. A little help can save a life.",
  keywords: [
    "medical crowdfunding",
    "Zambia healthcare",
    "medical fundraising",
    "patient assistance",
    "healthcare donations",
  ],
  openGraph: {
    title: "Thandizo — Verified Care. Shared Hope.",
    description:
      "A humanitarian technology platform connecting patients in need with those who can help.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
