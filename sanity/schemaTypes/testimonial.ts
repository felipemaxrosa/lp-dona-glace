import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({ name: "autor", title: "Autor", type: "string", validation: (r) => r.required() }),
    defineField({ name: "local", title: "Bairro/cidade", type: "string" }),
    defineField({ name: "texto", title: "Depoimento", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "destaque",
      title: "Citação em destaque",
      type: "boolean",
      description: "Marque UM depoimento para virar a citação grande no topo da seção.",
      initialValue: false,
    }),
    defineField({ name: "ordem", title: "Ordem", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Ordem", name: "ordemAsc", by: [{ field: "ordem", direction: "asc" }] }],
  preview: {
    select: { title: "autor", subtitle: "texto", destaque: "destaque" },
    prepare({ title, subtitle, destaque }) {
      return { title: `${destaque ? "★ " : ""}${title}`, subtitle };
    },
  },
});
