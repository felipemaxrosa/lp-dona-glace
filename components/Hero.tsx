import Link from "next/link";
import { sanityImg } from "@/sanity/lib/image";
import { wa } from "@/lib/site";
import type { Hero as HeroData } from "@/lib/types";

export default function Hero({ data, phone }: { data: HeroData; phone: string }) {
  // Elemento LCP: <img> simples (sem next/image), servido direto do Sanity e
  // pré-carregado com prioridade alta — pinta no 1º render, sem depender de JS.
  const heroSrc = data.img ? sanityImg(data.img, 1080, 1.25) : null;

  return (
    <section id="top" className="relative overflow-hidden">
      {heroSrc ? (
        // eslint-disable-next-line @next/next/no-head-element
        <link rel="preload" as="image" href={heroSrc} fetchPriority="high" />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1000px 600px at 12% -5%, #E9F5F4 0%, transparent 60%), radial-gradient(760px 520px at 100% 15%, #F2A9CC3d 0%, transparent 55%), linear-gradient(180deg, #D7EEEC 0%, #C7E8E4 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: "radial-gradient(#D8B25766 1.3px, transparent 1.3px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          {data.eyebrow ? (
            <span className="hero-rise inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-cream-50 px-4 py-1.5 text-xs font-bold text-choco-400">
              <span className="text-gold-500">★★★★★</span> {data.eyebrow}
            </span>
          ) : null}
          <h1 className="hero-rise d1 mt-5 font-display text-[2.5rem] leading-[1.04] text-choco-700 sm:text-6xl">
            {data.titulo}
            <br />
            <span className="font-script text-[3.2rem] text-pink-400 sm:text-7xl">
              {data.destaque}
            </span>
          </h1>
          <p className="hero-rise d2 mx-auto mt-5 max-w-md text-lg text-choco-500/90 lg:mx-0">
            {data.descricao}
          </p>
          <div className="hero-rise d3 mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href={wa(phone, "Olá Dona Glacê! Quero fazer meu pedido 🍰")}
              target="_blank"
              rel="noopener noreferrer"
              className="pulse rounded-full bg-pink-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-pink-400/30 transition hover:bg-pink-700"
            >
              Fazer meu pedido
            </a>
            <Link
              href="/cardapio"
              className="rounded-full border border-choco-400/25 bg-white/70 px-6 py-3 text-base font-bold text-choco-700 transition hover:bg-white"
            >
              Ver cardápio
            </Link>
          </div>
          <div className="hero-rise d4 mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-choco-400 lg:justify-start">
            <span>⚡ Resposta rápida</span>
            <span>🤍 Feito à mão</span>
            <span>🎁 Caixa personalizada</span>
          </div>
        </div>

        <div className="hero-rise d2 relative">
          <div className="floaty relative mx-auto w-[86%] max-w-sm">
            <div className="oval-frame lace relative aspect-[4/5] overflow-hidden bg-cream-100">
              {heroSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroSrc}
                  alt={data.img?.alt ?? "Bolo da Dona Glacê"}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
            </div>
            {data.notaBadge ? (
              <div className="absolute -top-3 -right-1 rotate-6 rounded-2xl bg-gold-500 px-4 py-2 text-sm font-bold text-choco-900 shadow-xl">
                ⭐ {data.notaBadge}
              </div>
            ) : null}
            {data.precoBadge ? (
              <div className="absolute -bottom-4 -left-2 -rotate-3 rounded-2xl bg-white px-4 py-2.5 shadow-xl">
                <p className="max-w-[9rem] text-sm font-bold leading-tight text-pink-400">
                  {data.precoBadge}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
