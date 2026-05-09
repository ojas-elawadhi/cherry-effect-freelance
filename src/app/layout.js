import { IBM_Plex_Mono, Press_Start_2P, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const displayFont = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const pixelFont = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata = {
  title: "The Cherry Effect | Influence. Growth. Precision.",
  description:
    "Psychology-led brand, marketing, and growth systems for businesses that want sharper positioning and better decisions.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${displayFont.variable} ${bodyFont.variable} ${pixelFont.variable} ${monoFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

