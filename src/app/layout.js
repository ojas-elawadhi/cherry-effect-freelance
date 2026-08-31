import { Press_Start_2P, Space_Grotesk } from "next/font/google";
import MusicPlayer from "@/components/music-player";
import "./globals.css";

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const pixelFont = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

const SITE_URL = "https://thecherryeffect.com";

const SITE_KEYWORDS = [
  "The Cherry Effect",
  "Cherry Effect",
  "digital marketing agency Delhi NCR",
  "digital marketing in Delhi NCR",
  "marketing agency Delhi NCR",
  "marketing in Delhi NCR",
  "performance marketing",
  "digital marketing services",
  "social media marketing in Delhi NCR",
  "influencer marketing",
  "affiliate marketing",
  "SEO",
  "website development",
  "international marketing",
  "enter Indian market easily",
  "international companies entering Indian market",
  "growth management",
  "business consultancy firm",
  "business consultant",
  "business solution",
  "business expert",
  "Charvi Madan",
  "Tapan Awasthy",
];

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "The Cherry Effect | Digital Marketing Agency in Delhi NCR",
    template: "%s | The Cherry Effect",
  },
  description:
    "The Cherry Effect is a psychology-led digital marketing agency in Delhi NCR offering performance marketing, social media marketing, SEO, influencer & affiliate marketing, website development, and business consultancy — helping Indian and international brands grow with sharp positioning and measurable results.",
  applicationName: "The Cherry Effect",
  keywords: SITE_KEYWORDS,
  authors: [{ name: "The Cherry Effect" }],
  creator: "The Cherry Effect",
  publisher: "The Cherry Effect",
  category: "Marketing",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "The Cherry Effect",
    title: "The Cherry Effect | Digital Marketing Agency in Delhi NCR",
    description:
      "Psychology-led digital marketing agency in Delhi NCR. Performance marketing, social media, SEO, influencer & affiliate marketing, website development, and growth consultancy for Indian and international brands.",
    // og:image tags are generated automatically by app/opengraph-image.js
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cherry Effect | Digital Marketing Agency in Delhi NCR",
    description:
      "Psychology-led digital marketing agency in Delhi NCR. Performance marketing, social, SEO, influencer & affiliate marketing, web development, and growth consultancy.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Replace with the real token from Google Search Console once verified.
  // verification: { google: "your-google-site-verification-token" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "The Cherry Effect",
  alternateName: ["Cherry Effect", "TCE Marketing"],
  url: SITE_URL,
  description:
    "Psychology-led digital marketing and business consultancy agency in Delhi NCR serving Indian and international brands.",
  slogan: "Influence. Growth. Precision.",
  areaServed: [
    { "@type": "City", name: "Delhi NCR" },
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "International" },
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Delhi NCR",
    addressCountry: "IN",
  },
  founder: [
    { "@type": "Person", name: "Charvi Madan" },
    { "@type": "Person", name: "Tapan Awasthy" },
  ],
  knowsAbout: [
    "Digital Marketing",
    "Performance Marketing",
    "Social Media Marketing",
    "Search Engine Optimization",
    "Influencer Marketing",
    "Affiliate Marketing",
    "Website Development",
    "Business Consultancy",
    "Brand Strategy",
    "International Marketing",
  ],
  makesOffer: [
    "Digital Marketing Services",
    "Performance Marketing",
    "Social Media Marketing in Delhi NCR",
    "SEO",
    "Influencer Marketing",
    "Affiliate Marketing",
    "Website Development",
    "Business Consultancy",
    "Growth Management",
  ].map((service) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: service },
  })),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "The Cherry Effect",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${bodyFont.variable} ${pixelFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}

