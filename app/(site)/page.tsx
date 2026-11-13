import { sanityFetch } from "@/sanity/lib/fetch";
import { homeQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { HomeData, SiteSettings } from "@/lib/types";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import CardapioHome from "@/components/CardapioHome";
import Depoimentos from "@/components/Depoimentos";
import ComoEncomendar from "@/components/ComoEncomendar";
import CtaFinal from "@/components/CtaFinal";

export default async function Home() {
  const [data, site] = await Promise.all([
    sanityFetch<HomeData>({ query: homeQuery }),
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ["sanity", "siteSettings"],
    }),
  ]);
  const phone = site.telefoneIntl;

  return (
    <>
      <Hero data={data.hero} phone={phone} />
      <Sobre data={data.sobre} />
      <CardapioHome categorias={data.categorias} top5={data.top5} phone={phone} />
      <Depoimentos data={data.depoimentos} />
      <ComoEncomendar data={data.comoEncomendar} />
      <CtaFinal phone={phone} />
    </>
  );
}
