"use client";

import { useState } from "react";
import { productImageUrl } from "@/sanity/lib/image";
import { precoLabel, pedirProduto } from "@/lib/format";
import type { CardapioCategoria, Produto } from "@/lib/types";
import ProductModal from "./ProductModal";

export default function CardapioGroups({
  cats,
  phone,
}: {
  cats: CardapioCategoria[];
  phone: string;
}) {
  const [aberto, setAberto] = useState<Produto | null>(null);

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-16 px-4 sm:px-6">
        {cats.map((group) => (
          <div key={group.slug} id={group.slug} className="reveal scroll-mt-24">
            <div className="mb-6 text-center">
              <h2 className="font-display text-3xl text-choco-700">{group.nome}</h2>
              {group.nota ? (
                <p className="mt-1 text-sm text-choco-400">{group.nota}</p>
              ) : null}
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {group.produtos.map((it) => (
                <li
                  key={it.nome}
                  className="card-lift flex gap-4 rounded-3xl border border-gold-400/30 bg-white p-4"
                >
                  {it.img ? (
                    <button
                      type="button"
                      onClick={() => setAberto(it)}
                      aria-label={`Ampliar foto de ${it.nome}`}
                      className="group relative h-24 w-24 shrink-0 cursor-zoom-in overflow-hidden rounded-2xl bg-cream-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={productImageUrl(it.img)}
                        alt={it.img.alt ?? it.nome}
                        width={700}
                        height={700}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <span className="pointer-events-none absolute inset-0 grid place-items-center bg-choco-900/0 text-lg text-transparent transition group-hover:bg-choco-900/25 group-hover:text-white">
                        🔍
                      </span>
                    </button>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg leading-tight text-choco-700">
                        {it.nome}
                      </h3>
                      <span className="shrink-0 rounded-full bg-pink-600 px-3 py-1 text-sm font-bold text-white">
                        {precoLabel(it)}
                      </span>
                    </div>
                    {it.unidade ? (
                      <p className="mt-0.5 text-xs text-choco-400">{it.unidade}</p>
                    ) : null}
                    {it.descricao ? (
                      <p className="mt-1.5 text-sm text-choco-500/90">{it.descricao}</p>
                    ) : null}
                    <a
                      href={pedirProduto(phone, it)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-bold text-choco-400 transition hover:text-pink-400"
                    >
                      Pedir pelo WhatsApp →
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {aberto ? (
        <ProductModal produto={aberto} phone={phone} onClose={() => setAberto(null)} />
      ) : null}
    </>
  );
}
