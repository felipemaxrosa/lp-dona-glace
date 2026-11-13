import { defineType, defineField } from "sanity";

export const comoEncomendar = defineType({
  name: "comoEncomendar",
  title: "Como Encomendar & FAQ",
  type: "document",
  fields: [
    defineField({
      name: "tituloSecao",
      title: "Título da seção",
      type: "string",
      initialValue: "Encomendar é simples assim",
    }),
    defineField({
      name: "passos",
      title: "Passos",
      type: "array",
      of: [
        defineType({
          name: "passo",
          type: "object",
          fields: [
            defineField({ name: "titulo", title: "Título", type: "string", validation: (r) => r.required() }),
            defineField({ name: "descricao", title: "Descrição", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "titulo", subtitle: "descricao" } },
        }),
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "faq",
      title: "Perguntas frequentes",
      type: "array",
      of: [
        defineType({
          name: "faqItem",
          type: "object",
          fields: [
            defineField({ name: "pergunta", title: "Pergunta", type: "string", validation: (r) => r.required() }),
            defineField({ name: "resposta", title: "Resposta", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "pergunta" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Como Encomendar & FAQ" }) },
});
