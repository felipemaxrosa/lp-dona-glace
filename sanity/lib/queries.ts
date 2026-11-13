import { groq } from "next-sanity";

const imageFields = `"img": imagem{..., "alt": coalesce(alt, "")}`;
const precoFields = `precoTipo, preco, precoP, precoG, precoNota`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  nome, telefoneIntl, telefoneDisplay, instagram, horario,
  bairro, referencia, cidade, uf, textoPagamento
}`;

export const homeQuery = groq`{
  "hero": *[_type == "heroSettings"][0]{
    eyebrow, titulo, destaque, descricao, precoBadge, notaBadge, ${imageFields}
  },
  "sobre": *[_type == "sobreSettings"][0]{
    subtitulo, titulo, paragrafos, tagNome, tagCargo, badge, stats, ${imageFields}
  },
  "comoEncomendar": *[_type == "comoEncomendar"][0]{
    tituloSecao, passos, faq
  },
  "categorias": *[_type == "category" && destaqueNaHome == true] | order(ordem asc){
    nome, "slug": slug.current, descricao, badge, ${imageFields}
  },
  "top5": *[_type == "product" && defined(top5) && ativo == true] | order(top5 asc)[0...5]{
    nome, "slug": slug.current, top5, descricao, unidade, ${precoFields},
    "msg": mensagemWhatsapp, ${imageFields}
  },
  "depoimentos": *[_type == "testimonial"] | order(ordem asc){
    autor, local, texto, destaque
  }
}`;

export const cardapioQuery = groq`*[_type == "category"] | order(ordem asc){
  nome, "slug": slug.current, nota, badge,
  "produtos": *[_type == "product" && references(^._id) && ativo == true] | order(ordem asc){
    nome, descricao, unidade, ${precoFields}, "msg": mensagemWhatsapp, ${imageFields}
  }
}[count(produtos) > 0]`;
