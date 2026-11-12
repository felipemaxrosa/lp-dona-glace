export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://donaglace.com.br";

export const BUSINESS = {
  name: "Dona Glacê",
  legalName: "Dona Glacê Confeitaria",
  tagline: "Confeitaria · Bolos e Doces",
  description:
    "Bolos, sobremesas e doces artesanais feitos à mão desde 2016, em Caraguatatuba. Peça pelo WhatsApp e adoce o seu dia com a Dona Glacê.",
  since: 2016,
  owner: "Monique Nery",
  city: "Caraguatatuba",
  state: "SP",
  region: "Litoral Norte de São Paulo",
  neighborhood: "Bairro Caputera",
  reference: "próximo ao mercado Assaí",
  phoneDisplay: "(12) 98104-6072",
  phoneIntl: "5512981046072",
  instagram: "donaglace",
  instagramUrl: "https://instagram.com/donaglace",
  hours: "Terça a Sábado",
} as const;

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function wa(message: string): string {
  return `https://wa.me/${BUSINESS.phoneIntl}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT = wa(
  "Olá Dona Glacê! Vim pelo site e quero fazer um pedido 🍰",
);

export const NAV = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#cardapio", label: "Cardápio" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/#encomendar", label: "Como pedir" },
] as const;
