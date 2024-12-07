import RegularLayout from "@/components/regular/regular-layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exam Application",
  description: "Exam aplication use test to student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <RegularLayout>{children}</RegularLayout>
        </body>
      </html>
    </StoreProvider>
  );
}
