import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const Boomster = localFont({
  src: "../public/Fonts/BOOMSTER.otf",
  variable: "--font-boomster",
  display: "swap",
  weight: "400 900",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "URBLIFT - Elevamiento Urbano",
  description:
    "Tienda oficial de URBLIFT - Ropa urbana y accesorios de alta calidad.",
  icons: {
    icon: "/Logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Boomster.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
