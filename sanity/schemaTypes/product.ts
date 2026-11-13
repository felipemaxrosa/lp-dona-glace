import { defineType, defineField } from "sanity";

const TIPOS = [
  { title: "Preço fixo", value: "fixo" },
  { title: "Tamanhos (P e G)", value: "tamanhos" },
  { title: "Sob encomenda / orçamento", value: "sobEncomenda" },
];

export const product = defineType({
  name: "product",
  title: "Produto",
  type: "document",
  fields: [
    defineField({ name: "nome", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nome", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "descricao", title: "Descrição", type: "text", rows: 3 }),
    defineField({
      name: "imagem",
      title: "Foto do produto",
      type: "image",
      description: "Aparece no cardápio e no Top 5. Quadrada 1:1, mínimo 1200×1200px.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
    }),
    defineField({
      name: "unidade",
      title: "Unidade/porção (opcional)",
      type: "string",
      description: "Ex.: “≈ 1kg”, “serve 6 a 10 porções”.",
    }),
    defineField({
      name: "precoTipo",
      title: "Tipo de preço",
      type: "string",
      options: { list: TIPOS, layout: "radio" },
      initialValue: "fixo",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "preco",
      title: "Preço (R$)",
      type: "number",
      hidden: ({ parent }) => parent?.precoTipo !== "fixo",
      validation: (r) =>
        r.custom((val, ctx) => {
          const p = ctx.parent as { precoTipo?: string } | undefined;
          return p?.precoTipo === "fixo" && typeof val !== "number" ? "Informe o preço" : true;
        }),
    }),
    defineField({
      name: "precoP",
      title: "Preço P (R$)",
      type: "number",
      hidden: ({ parent }) => parent?.precoTipo !== "tamanhos",
    }),
    defineField({
      name: "precoG",
      title: "Preço G (R$)",
      type: "number",
      hidden: ({ parent }) => parent?.precoTipo !== "tamanhos",
    }),
    defineField({
      name: "precoNota",
      title: "Rótulo do preço (opcional)",
      type: "string",
      description: "Para “sob encomenda”: deixe vazio para mostrar “Sob encomenda”, ou escreva “Orçamento”.",
      hidden: ({ parent }) => parent?.precoTipo !== "sobEncomenda",
    }),
    defineField({
      name: "top5",
      title: "Top 5 (mais pedidos)",
      type: "number",
      description: "Posição na seção “Os 5 mais pedidos” da home. Use cada posição uma única vez. Deixe vazio se não for destaque.",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (r) => r.min(1).max(5),
    }),
    defineField({ name: "ativo", title: "Ativo (aparece no site)", type: "boolean", initialValue: true }),
    defineField({ name: "sazonal", title: "Sazonal", type: "boolean", initialValue: false }),
    defineField({
      name: "ordem",
      title: "Ordem na categoria",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "mensagemWhatsapp",
      title: "Mensagem de WhatsApp (opcional)",
      type: "string",
      description: "Se vazio, geramos automaticamente a partir do nome.",
    }),
  ],
  orderings: [
    { title: "Ordem", name: "ordemAsc", by: [{ field: "ordem", direction: "asc" }] },
    { title: "Top 5", name: "top5Asc", by: [{ field: "top5", direction: "asc" }] },
  ],
  preview: {
    select: { title: "nome", media: "imagem", cat: "categoria.nome", tipo: "precoTipo", preco: "preco", top5: "top5" },
    prepare({ title, media, cat, tipo, preco, top5 }) {
      const precoLabel =
        tipo === "fixo" ? (preco ? `R$ ${preco}` : "—") : tipo === "tamanhos" ? "P/G" : "Sob encomenda";
      const star = top5 ? `★${top5} · ` : "";
      return { title, subtitle: `${star}${cat ?? "sem categoria"} · ${precoLabel}`, media };
    },
  },
});
