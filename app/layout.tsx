import type { Metadata, Viewport } from "next";
import { Playfair_Display, Parisienne, Nunito } from "next/font/google";
import "./globals.css";
import { SITE_URL, BUSINESS } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappFab from "@/components/WhatsappFab";
import RevealInit from "@/components/RevealInit";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const TITLE = "Dona Glacê | Confeitaria · Bolos e Doces em Caraguatatuba";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Dona Glacê" },
  description: BUSINESS.description,
  applicationName: "Dona Glacê",
  authors: [{ name: "Dona Glacê" }],
  creator: "Dona Glacê",
  publisher: "Dona Glacê",
  category: "food",
  keywords: [
    "confeitaria Caraguatatuba",
    "bolos em Caraguatatuba",
    "bolo de aniversário Caraguatatuba",
    "bolo decorado",
    "doces artesanais",
    "chocotone trufado",
    "sobremesas na travessa",
    "brigadeiro gourmet",
    "Dona Glacê",
    "Monique Nery",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Dona Glacê",
    title: TITLE,
    description: BUSINESS.description,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: BUSINESS.description,
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
};

export const viewport: Viewport = {
  themeColor: "#5fb0ad",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": SITE_URL,
  name: "Dona Glacê",
  alternateName: "Dona Glacê Confeitaria",
  description: BUSINESS.description,
  url: SITE_URL,
  image: `${SITE_URL}/images/ig-fruitcake.jpg`,
  logo: `${SITE_URL}/images/logo.jpg`,
  telephone: `+${BUSINESS.phoneIntl}`,
  priceRange: "$$",
  servesCuisine: "Confeitaria, Bolos e Doces",
  foundingDate: "2016",
  founder: { "@type": "Person", name: BUSINESS.owner },
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.state,
    addressCountry: "BR",
  },
  areaServed: { "@type": "City", name: BUSINESS.city },
  sameAs: [BUSINESS.instagramUrl],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${playfair.variable} ${parisienne.variable} ${nunito.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsappFab />
        <RevealInit />
      </body>
    </html>
  );
}
