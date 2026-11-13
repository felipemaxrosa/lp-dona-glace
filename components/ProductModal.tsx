"use client";

import { useEffect } from "react";
import { productImageUrl } from "@/sanity/lib/image";
import { precoLabel, pedirProduto } from "@/lib/format";
import type { Produto } from "@/lib/types";

export default function ProductModal({
  produto,
  phone,
  onClose,
}: {
  produto: Produto;
  phone: string;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={produto.nome}
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-choco-900/70 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-cream-50 shadow-2xl"
      >
        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-content-center rounded-full bg-white/90 text-xl text-choco-700 shadow transition hover:bg-white"
        >
          ✕
        </button>
        {produto.img ? (
          <div className="relative aspect-square w-full bg-cream-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={productImageUrl(produto.img)}
              alt={produto.img.alt ?? produto.nome}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : null}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl text-choco-700">{produto.nome}</h3>
            <span className="shrink-0 rounded-full bg-pink-600 px-3 py-1 text-sm font-bold text-white">
              {precoLabel(produto)}
            </span>
          </div>
          {produto.unidade ? (
            <p className="mt-0.5 text-xs text-choco-400">{produto.unidade}</p>
          ) : null}
          {produto.descricao ? (
            <p className="mt-2 text-sm text-choco-500/90">{produto.descricao}</p>
          ) : null}
          <a
            href={pedirProduto(phone, produto)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-pink-600 px-6 py-3 font-bold text-white transition hover:bg-pink-700"
          >
            Pedir pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
