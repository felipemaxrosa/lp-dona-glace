import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  fields: [
    defineField({ name: "nome", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (endereço da seção)",
      type: "slug",
      description: "Gerado a partir do nome. Vira a âncora no cardápio (ex.: /cardapio#bolos-decorados).",
      options: { source: "nome", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "descricao", title: "Descrição", type: "text", rows: 2 }),
    defineField({
      name: "imagem",
      title: "Foto da categoria",
      type: "image",
      description: "Aparece no card da home. Paisagem 4:3, mínimo 1200×900px.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
    }),
    defineField({
      name: "badge",
      title: "Selo (opcional)",
      type: "string",
      description: "Ex.: “sazonal”, “R$ 70+”.",
    }),
    defineField({
      name: "nota",
      title: "Observação da seção (opcional)",
      type: "string",
      description: "Aparece abaixo do título no cardápio. Ex.: “Aprox. 1kg · acompanha caixa, laço e tag”.",
    }),
    defineField({
      name: "destaqueNaHome",
      title: "Mostrar na home (em “Explore por categoria”)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "ordem",
      title: "Ordem",
      type: "number",
      description: "Menor aparece primeiro (na home e no cardápio).",
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: "Ordem", name: "ordemAsc", by: [{ field: "ordem", direction: "asc" }] },
  ],
  preview: {
    select: { title: "nome", subtitle: "descricao", media: "imagem" },
  },
});
