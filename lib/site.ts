export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://donaglace.com.br";

// Defaults de SEO / dados estruturais (não editáveis pela Monique por ora).
export const BUSINESS = {
  name: "Dona Glacê",
  description:
    "Bolos, sobremesas e doces artesanais feitos à mão desde 2016, em Caraguatatuba. Peça pelo WhatsApp e adoce o seu dia com a Dona Glacê.",
  owner: "Monique Nery",
  city: "Caraguatatuba",
  state: "SP",
  instagramUrl: "https://instagram.com/donaglace",
  phoneIntl: "5512981046072",
} as const;

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function wa(phoneIntl: string, message: string): string {
  return `https://wa.me/${phoneIntl}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/#encomendar", label: "Como pedir" },
] as const;
