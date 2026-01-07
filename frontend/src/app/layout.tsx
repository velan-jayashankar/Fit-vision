import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileLayout from "@/components/layout/MobileLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit-vision",
  description: "AI Powered Fitness Tracker",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileLayout>{children}</MobileLayout>
      </body>
    </html>
  );
}
