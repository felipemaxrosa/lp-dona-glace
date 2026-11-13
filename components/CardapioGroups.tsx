"use client";

import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import { wa } from "@/lib/site";
import { precoLabel } from "@/lib/format";
import type { CardapioCategoria, Produto, SImage } from "@/lib/types";

function pedir(phone: string, it: Produto) {
  const msg = it.msg?.trim()
    ? `Olá Dona Glacê! ${it.msg}`
    : `Olá Dona Glacê! Quero encomendar: ${it.nome} 🍰`;
  return wa(phone, msg);
}

// URL única (mesma no card e no modal) → o modal reaproveita a imagem já baixada
// pelo card (cache do navegador) e abre instantaneamente. 700px serve bem aos dois usos.
function imgUrl(img: SImage) {
  return urlFor(img).width(700).height(700).url();
}

export default function CardapioGroups({
  cats,
  phone,
}: {
  cats: CardapioCategoria[];
  phone: string;
}) {
  const [aberto, setAberto] = useState<Produto | null>(null);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [aberto]);

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
                        src={imgUrl(it.img)}
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
                      href={pedir(phone, it)}
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

      {/* Modal / lightbox — reutiliza a MESMA imagem do card (abre instantâneo) */}
      {aberto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={aberto.nome}
          onClick={() => setAberto(null)}
          className="fixed inset-0 z-[60] grid place-items-center bg-choco-900/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-cream-50 shadow-2xl"
          >
            <button
              type="button"
              autoFocus
              onClick={() => setAberto(null)}
              aria-label="Fechar"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-content-center rounded-full bg-white/90 text-xl text-choco-700 shadow transition hover:bg-white"
            >
              ✕
            </button>
            {aberto.img ? (
              <div className="relative aspect-square w-full bg-cream-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl(aberto.img)}
                  alt={aberto.img.alt ?? aberto.nome}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ) : null}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl text-choco-700">{aberto.nome}</h3>
                <span className="shrink-0 rounded-full bg-pink-600 px-3 py-1 text-sm font-bold text-white">
                  {precoLabel(aberto)}
                </span>
              </div>
              {aberto.unidade ? (
                <p className="mt-0.5 text-xs text-choco-400">{aberto.unidade}</p>
              ) : null}
              {aberto.descricao ? (
                <p className="mt-2 text-sm text-choco-500/90">{aberto.descricao}</p>
              ) : null}
              <a
                href={pedir(phone, aberto)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-pink-600 px-6 py-3 font-bold text-white transition hover:bg-pink-700"
              >
                Pedir pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
