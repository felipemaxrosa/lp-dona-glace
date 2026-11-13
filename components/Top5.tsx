"use client";

import { useState } from "react";
import { productImageUrl } from "@/sanity/lib/image";
import { precoLabel, pedirProduto } from "@/lib/format";
import type { Produto } from "@/lib/types";
import ProductModal from "./ProductModal";

export default function Top5({ top5, phone }: { top5: Produto[]; phone: string }) {
  const [aberto, setAberto] = useState<Produto | null>(null);
  if (!top5.length) return null;

  return (
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
            {p.img ? (
              <button
                type="button"
                onClick={() => setAberto(p)}
                aria-label={`Ampliar foto de ${p.nome}`}
                className="group relative block h-36 w-full cursor-zoom-in overflow-hidden bg-cream-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={productImageUrl(p.img)}
                  alt={p.img.alt ?? p.nome}
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
            <div className="p-3">
              <h4 className="font-display text-base leading-tight text-choco-700">{p.nome}</h4>
              <p className="mt-0.5 text-sm font-bold text-pink-400">{precoLabel(p)}</p>
              <a
                href={pedirProduto(phone, p)}
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
      <p className="mt-3 text-center text-xs text-choco-400/70">definido no painel pela Monique</p>

      {aberto ? (
        <ProductModal produto={aberto} phone={phone} onClose={() => setAberto(null)} />
      ) : null}
    </div>
  );
}
