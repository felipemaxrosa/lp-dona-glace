import type { StructureResolver } from "sanity/structure";

// Singletons: documento único, fixado (editado como "página de configuração")
const singletons = [
  ["heroSettings", "Hero"],
  ["sobreSettings", "Sobre a Monique"],
  ["siteSettings", "Contato & Informações"],
  ["comoEncomendar", "Como Encomendar & FAQ"],
] as const;

const singletonIds = singletons.map(([type]) => type);

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      ...singletons.map(([type, title]) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.documentTypeListItem("category").title("Categorias"),
      S.documentTypeListItem("product").title("Produtos"),
      S.documentTypeListItem("testimonial").title("Depoimentos"),
    ]);

// usado para esconder os singletons do botão global "criar novo"
export const singletonTypes = new Set<string>(singletonIds);
