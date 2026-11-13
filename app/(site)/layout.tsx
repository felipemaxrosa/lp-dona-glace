import { SITE_URL, BUSINESS } from "@/lib/site";
import type { SiteSettings } from "@/lib/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappFab from "@/components/WhatsappFab";
import RevealInit from "@/components/RevealInit";

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

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ["sanity", "siteSettings"],
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.classList.add('js')",
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header phone={site.telefoneIntl} />
      <main>{children}</main>
      <Footer site={site} />
      <WhatsappFab phone={site.telefoneIntl} />
      <RevealInit />
    </>
  );
}
