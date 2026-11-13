import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, wa } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { cardapioQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { CardapioCategoria, SiteSettings } from "@/lib/types";
import CardapioGroups from "@/components/CardapioGroups";

export const metadata: Metadata = {
  title: "Cardápio completo",
  description:
    "Bolos, sobremesas na travessa, chocotones trufados, mini chocotones e mimos da Dona Glacê, com preços. Faça sua encomenda pelo WhatsApp em Caraguatatuba.",
  alternates: { canonical: "/cardapio" },
  openGraph: {
    title: "Cardápio completo | Dona Glacê",
    description:
      "Todos os sabores e preços da Dona Glacê. Encomende pelo WhatsApp em Caraguatatuba.",
    url: `${SITE_URL}/cardapio`,
  },
};

export default async function CardapioPage() {
  const [cats, site] = await Promise.all([
    sanityFetch<CardapioCategoria[]>({
      query: cardapioQuery,
      tags: ["sanity", "category", "product"],
    }),
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ["sanity", "siteSettings"],
    }),
  ]);
  const phone = site.telefoneIntl;

  const menuLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Cardápio Dona Glacê",
    hasMenuSection: cats.map((g) => ({
      "@type": "MenuSection",
      name: g.nome,
      hasMenuItem: g.produtos.map((it) => ({
        "@type": "MenuItem",
        name: it.nome,
        description: it.descricao,
      })),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuLd) }}
      />

      {/* Cabeçalho */}
      <section className="relative overflow-hidden bg-teal-100/70 py-16 sm:py-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(#d8b25766 1.3px, transparent 1.3px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Link
            href="/"
            className="text-sm font-bold text-choco-400 transition hover:text-pink-400"
          >
            ← Voltar para a home
          </Link>
          <span className="mt-3 block font-script text-3xl text-pink-400">o cardápio</span>
          <h1 className="mt-1 font-display text-4xl text-choco-700 sm:text-5xl">
            Cardápio completo
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-choco-500/90">
            Todos os sabores da Dona Glacê, feitos à mão. Escolha o seu e faça a encomenda
            pelo WhatsApp — a Monique responde rapidinho.
          </p>
          <p className="mx-auto mt-3 max-w-xl rounded-2xl border border-gold-400/40 bg-cream-50/70 px-4 py-2 text-xs text-choco-400">
            💡 Toque na foto para ampliar · Preços de referência — confirme a disponibilidade no WhatsApp.
          </p>
        </div>
      </section>

      {/* Grupos do cardápio (grade + modal interativo) */}
      <section className="bg-cream-50 py-16 sm:py-20">
        <CardapioGroups cats={cats} phone={phone} />
      </section>

      {/* CTA */}
      <section className="bg-teal-500 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl sm:text-4xl">Pronto para encomendar?</h2>
          <p className="mt-3 text-cream-100/90">
            Agendamos com 50% de sinal (Pix, cartão ou dinheiro). Retirada no {site.bairro},
            {" "}
            {site.referencia}, em {site.cidade}. Atendimento de {site.horario}.
          </p>
          <a
            href={wa(phone, "Olá Dona Glacê! Vi o cardápio e quero fazer uma encomenda 🍰")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-full bg-white px-8 py-4 font-extrabold text-teal-700 shadow-xl transition hover:bg-cream-50"
          >
            Fazer meu pedido no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
