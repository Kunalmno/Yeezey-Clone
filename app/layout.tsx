import CartProvider from "@/providers/cart-context";
import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";

const dmmono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yeezey Clone",
  description: "Fake yeezey website. This is just for learning purpose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmmono.className}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
