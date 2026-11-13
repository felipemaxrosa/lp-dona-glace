import Link from "next/link";
import SanityImage from "@/components/SanityImage";
import type { Categoria, Produto } from "@/lib/types";
import Top5 from "./Top5";

export default function CardapioHome({
  categorias,
  top5,
  phone,
}: {
  categorias: Categoria[];
  top5: Produto[];
  phone: string;
}) {
  return (
    <section id="cardapio" className="bg-teal-100/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="font-script text-3xl text-pink-400">nosso cardápio</span>
          <h2 className="mt-1 font-display text-3xl text-choco-700 sm:text-4xl">
            Tem um doce certo para cada momento
          </h2>
          <p className="mt-4 text-choco-500/90">
            Comece pelos campeões de pedido — ou escolha por categoria.
          </p>
        </div>

        {/* 5 mais pedidos (cliente — imagem clicável abre o lightbox) */}
        <Top5 top5={top5} phone={phone} />

        {/* Categorias */}
        {categorias.length ? (
          <div className="reveal mt-14">
            <h3 className="mb-6 text-center font-display text-2xl text-choco-700">
              Explore por categoria
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categorias.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cardapio#${c.slug}`}
                  className="card-lift group block overflow-hidden rounded-3xl border border-gold-400/30 bg-cream-50 shadow-sm"
                >
                  <div className="gal relative h-44 overflow-hidden bg-cream-100">
                    {c.img ? (
                      <SanityImage
                        img={c.img}
                        alt={c.img.alt ?? c.nome}
                        aspect={3 / 4}
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
                      />
                    ) : null}
                    {c.badge ? (
                      <span className="absolute right-3 top-3 rounded-full bg-teal-300 px-3 py-1 text-xs font-bold text-choco-900">
                        {c.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-xl text-choco-700">{c.nome}</h4>
                    {c.descricao ? (
                      <p className="mt-1.5 text-sm text-choco-500/90">{c.descricao}</p>
                    ) : null}
                    <span className="mt-3 inline-block text-sm font-bold text-pink-400 transition group-hover:text-pink-500">
                      Ver no cardápio →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="reveal mt-12 text-center">
          <Link
            href="/cardapio"
            className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-pink-400/30 transition hover:bg-pink-700"
          >
            Ver cardápio completo
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="mt-3 text-xs text-choco-400/80">
            todos os sabores e preços na página do cardápio
          </p>
        </div>
      </div>
    </section>
  );
}
