import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fizz & Co | Taste the Spark",
  description: "A vibrant explosion of real fruit and crisp carbonation. No sugar, no junk, just pure effervescent energy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body-md overflow-x-hidden">
        <CartProvider>
          {children}
          <FloatingHomeButton />
        </CartProvider>
      </body>
    </html>
  );
}
