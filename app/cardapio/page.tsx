import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, BUSINESS, wa } from "@/lib/site";
import { CARDAPIO } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Cardápio completo",
  description:
    "Bolos, sobremesas na travessa, chocotones trufados, mini chocotones e mimos da Dona Glacê, com preços de referência. Faça sua encomenda pelo WhatsApp em Caraguatatuba.",
  alternates: { canonical: "/cardapio" },
  openGraph: {
    title: "Cardápio completo | Dona Glacê",
    description:
      "Todos os sabores e preços da Dona Glacê. Encomende pelo WhatsApp em Caraguatatuba.",
    url: `${SITE_URL}/cardapio`,
  },
};

const menuLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Cardápio Dona Glacê",
  hasMenuSection: CARDAPIO.map((g) => ({
    "@type": "MenuSection",
    name: g.title,
    hasMenuItem: g.items.map((it) => ({
      "@type": "MenuItem",
      name: it.name,
      description: it.desc,
    })),
  })),
};

export default function CardapioPage() {
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
          <span className="mt-3 block font-script text-3xl text-pink-400">
            o cardápio
          </span>
          <h1 className="mt-1 font-display text-4xl text-choco-700 sm:text-5xl">
            Cardápio completo
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-choco-500/90">
            Todos os sabores da Dona Glacê, feitos à mão. Escolha o seu e faça a
            encomenda pelo WhatsApp — a Monique responde rapidinho.
          </p>
          <p className="mx-auto mt-3 max-w-xl rounded-2xl border border-gold-400/40 bg-cream-50/70 px-4 py-2 text-xs text-choco-400">
            💡 Preços de referência — confirme sabores e disponibilidade da semana no
            WhatsApp.
          </p>
        </div>
      </section>

      {/* Grupos do cardápio */}
      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-16 px-4 sm:px-6">
          {CARDAPIO.map((group) => (
            <div key={group.id} id={group.id} className="reveal">
              <div className="mb-6 text-center">
                <h2 className="font-display text-3xl text-choco-700">
                  {group.title}
                </h2>
                {group.note ? (
                  <p className="mt-1 text-sm text-choco-400">{group.note}</p>
                ) : null}
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {group.items.map((it) => (
                  <li
                    key={it.name}
                    className="card-lift flex flex-col rounded-3xl border border-gold-400/30 bg-white p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl text-choco-700">
                        {it.name}
                      </h3>
                      <span className="shrink-0 rounded-full bg-pink-400 px-3 py-1 text-sm font-bold text-white">
                        {it.price}
                      </span>
                    </div>
                    {it.desc ? (
                      <p className="mt-2 text-sm text-choco-500/90">{it.desc}</p>
                    ) : null}
                    <a
                      href={wa(`Olá Dona Glacê! Quero encomendar: ${it.name} 🍰`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 self-start text-sm font-bold text-choco-400 transition hover:text-pink-400"
                    >
                      Pedir pelo WhatsApp →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Como encomendar / CTA */}
      <section className="bg-teal-500 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl sm:text-4xl">
            Pronto para encomendar?
          </h2>
          <p className="mt-3 text-cream-100/90">
            Agendamos com 50% de sinal (Pix, cartão ou dinheiro). Retirada no{" "}
            {BUSINESS.neighborhood}, {BUSINESS.reference}, em {BUSINESS.city}.
            Atendimento de {BUSINESS.hours}.
          </p>
          <a
            href={wa("Olá Dona Glacê! Vi o cardápio e quero fazer uma encomenda 🍰")}
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
