import type { Preco } from "./types";

function brl(n?: number): string {
  if (n == null) return "";
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

/** Rótulo de preço a partir dos campos estruturados do produto. */
export function precoLabel(p: Preco): string {
  if (p.precoTipo === "fixo") return p.preco != null ? `R$ ${brl(p.preco)}` : "Sob consulta";
  if (p.precoTipo === "tamanhos") return `P R$ ${brl(p.precoP)} · G R$ ${brl(p.precoG)}`;
  return p.precoNota?.trim() || "Sob encomenda";
}
