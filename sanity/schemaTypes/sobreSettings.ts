import { defineType, defineField } from "sanity";

export const sobreSettings = defineType({
  name: "sobreSettings",
  title: "Sobre a Monique",
  type: "document",
  fields: [
    defineField({
      name: "subtitulo",
      title: "Subtítulo (texto em marrom/script)",
      type: "string",
      description: "Linha de abertura em script. Ex.: “Prazer, eu sou a Monique”.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      description: "Ex.: “Doce de verdade, feito com o coração”.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "paragrafos",
      title: "Texto (parágrafos)",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Um item por parágrafo. Pode adicionar/remover quantos quiser.",
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "imagem",
      title: "Foto da Monique",
      type: "image",
      description: "Paisagem (horizontal). Proporção ideal 3:2, mínimo 1600×1066px.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagNome",
      title: "Etiqueta — nome",
      type: "string",
      description: "Nome exibido na etiqueta sobre a foto. Ex.: “Monique Nery”.",
      initialValue: "Monique Nery",
    }),
    defineField({
      name: "tagCargo",
      title: "Etiqueta — cargo",
      type: "string",
      initialValue: "confeiteira & fundadora",
    }),
    defineField({
      name: "badge",
      title: "Selo circular",
      type: "string",
      description: "Ex.: “desde 2016”.",
      initialValue: "desde 2016",
    }),
    defineField({
      name: "stats",
      title: "Números em destaque",
      type: "array",
      description: "Os 3 quadradinhos (valor + descrição).",
      of: [
        defineType({
          name: "stat",
          type: "object",
          fields: [
            defineField({ name: "valor", title: "Valor", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Descrição", type: "string", validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: "valor", subtitle: "label" },
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Sobre a Monique" }) },
});
