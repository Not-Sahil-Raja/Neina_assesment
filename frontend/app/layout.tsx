import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const halenoir = localFont({
  src: [
    {
      path: "./font/HalenoirCompact-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/HalenoirCompact-Medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./font/Halenoir-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-halenoir",
});

export const metadata: Metadata = {
  title: "Hot Plate | Restaurant",
  description: "Sizzling flavors and unforgettable moments at Hot Plate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${halenoir.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
