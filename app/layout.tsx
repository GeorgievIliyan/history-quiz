import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"] as any, 
  weight: ["400", "500", "600", "700", "900"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin", "cyrillic"] as any,
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Строителите на България",
  description: "Тествайте вашите знания с 15 случайни въпроса!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bg"
      className={`${playfairDisplay.variable} ${crimsonPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}