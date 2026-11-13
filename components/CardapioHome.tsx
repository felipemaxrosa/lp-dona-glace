import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { wa } from "@/lib/site";
import { precoLabel } from "@/lib/format";
import type { Categoria, Produto } from "@/lib/types";

function pedirLink(phone: string, p: Produto) {
  const msg = p.msg?.trim()
    ? `Olá Dona Glacê! ${p.msg}`
    : `Olá Dona Glacê! Quero ${p.nome} 🍰`;
  return wa(phone, msg);
}

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

        {/* 5 MAIS PEDIDOS */}
        {top5.length ? (
          <div className="reveal mt-12">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold-400/60" />
              <h3 className="font-display text-2xl text-choco-700">⭐ Os 5 mais pedidos</h3>
              <span className="h-px w-10 bg-gold-400/60" />
            </div>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {top5.map((p) => (
                <li
                  key={p.slug ?? p.nome}
                  className="card-lift relative overflow-hidden rounded-3xl border border-gold-400/30 bg-cream-50 shadow-sm"
                >
                  <span className="absolute left-2 top-2 z-10 grid h-7 w-7 place-content-center rounded-full bg-pink-600 text-sm font-bold text-white shadow">
                    {p.top5}
                  </span>
                  {p.top5 === 1 ? (
                    <span className="absolute right-2 top-2 z-10 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold text-choco-900 shadow">
                      mais pedido
                    </span>
                  ) : null}
                  <div className="gal relative h-36 overflow-hidden bg-cream-100">
                    {p.img ? (
                      <Image
                        src={urlFor(p.img).width(600).height(600).url()}
                        alt={p.img.alt ?? p.nome}
                        fill
                        sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 210px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-3">
                    <h4 className="font-display text-base leading-tight text-choco-700">
                      {p.nome}
                    </h4>
                    <p className="mt-0.5 text-sm font-bold text-pink-400">{precoLabel(p)}</p>
                    <a
                      href={pedirLink(phone, p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-choco-400 transition hover:text-pink-400"
                    >
                      Pedir →
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-center text-xs text-choco-400/70">
              definido no painel pela Monique
            </p>
          </div>
        ) : null}

        {/* CATEGORIAS */}
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
                      <Image
                        src={urlFor(c.img).width(800).height(600).url()}
                        alt={c.img.alt ?? c.nome}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
                        className="object-cover"
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
