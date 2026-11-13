import { defineType, defineField } from "sanity";

export const heroSettings = defineType({
  name: "heroSettings",
  title: "Hero (topo da home)",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Selo (acima do título)",
      type: "string",
      description: "Ex.: “Confeitaria artesanal · desde 2016”.",
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      description: "A primeira linha do título. Ex.: “O doce que vai ser o”.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "destaque",
      title: "Destaque (texto em rosa)",
      type: "string",
      description: "Trecho em destaque, exibido em rosa/script. Ex.: “astro da sua festa”.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imagem",
      title: "Foto principal",
      type: "image",
      description: "Retrato (vertical). Envie em alta — proporção ideal 4:5, mínimo 1200×1500px.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo (acessibilidade/SEO)",
          type: "string",
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "precoBadge",
      title: "Selo de preço",
      type: "string",
      description: "Ex.: “sobremesas a partir de R$ 70”. Deixe vazio para ocultar.",
    }),
    defineField({
      name: "notaBadge",
      title: "Selo de nota",
      type: "string",
      description: "Ex.: “Nota 5,0”. Deixe vazio para ocultar.",
    }),
  ],
  preview: { prepare: () => ({ title: "Hero — topo da home" }) },
});
