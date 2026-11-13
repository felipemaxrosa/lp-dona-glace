import type { Preco } from "./types";
import { wa } from "./site";

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

/** Link de WhatsApp para pedir um produto (usa a mensagem do produto ou gera uma). */
export function pedirProduto(phone: string, p: { nome: string; msg?: string }): string {
  const msg = p.msg?.trim()
    ? `Olá Dona Glacê! ${p.msg}`
    : `Olá Dona Glacê! Quero encomendar: ${p.nome} 🍰`;
  return wa(phone, msg);
}
