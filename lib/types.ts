import type { SanityImageSource } from "@sanity/image-url";

export type SImage = SanityImageSource & { alt?: string };

export type Preco = {
  precoTipo: "fixo" | "tamanhos" | "sobEncomenda";
  preco?: number;
  precoP?: number;
  precoG?: number;
  precoNota?: string;
};

export type SiteSettings = {
  nome: string;
  telefoneIntl: string;
  telefoneDisplay: string;
  instagram: string;
  horario: string;
  bairro: string;
  referencia: string;
  cidade: string;
  uf: string;
  textoPagamento: string;
};

export type Hero = {
  eyebrow?: string;
  titulo: string;
  destaque: string;
  descricao: string;
  precoBadge?: string;
  notaBadge?: string;
  img?: SImage;
};

export type Stat = { valor: string; label: string };

export type Sobre = {
  subtitulo: string;
  titulo: string;
  paragrafos: string[];
  tagNome?: string;
  tagCargo?: string;
  badge?: string;
  stats?: Stat[];
  img?: SImage;
};

export type Passo = { titulo: string; descricao: string };
export type FaqItem = { pergunta: string; resposta: string };
export type ComoEncomendarData = {
  tituloSecao?: string;
  passos: Passo[];
  faq: FaqItem[];
};

export type Categoria = {
  nome: string;
  slug: string;
  descricao?: string;
  badge?: string;
  img?: SImage;
};

export type Produto = Preco & {
  nome: string;
  slug?: string;
  top5?: number;
  descricao?: string;
  unidade?: string;
  msg?: string;
  img?: SImage;
};

export type Depoimento = {
  autor: string;
  local?: string;
  texto: string;
  destaque?: boolean;
};

export type HomeData = {
  hero: Hero;
  sobre: Sobre;
  comoEncomendar: ComoEncomendarData;
  categorias: Categoria[];
  top5: Produto[];
  depoimentos: Depoimento[];
};

export type CardapioCategoria = {
  nome: string;
  slug: string;
  nota?: string;
  badge?: string;
  produtos: Produto[];
};
