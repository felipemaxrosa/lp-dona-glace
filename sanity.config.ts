import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemaTypes";
import { deskStructure, singletonTypes } from "@/sanity/structure";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export default defineConfig({
  name: "dona-glace",
  title: "Dona Glacê",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure: deskStructure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // singletons não aparecem no botão global de "criar novo"
    templates: (prev) => prev.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    // esconde "duplicar"/"excluir" nos singletons
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => action && !["duplicate", "delete", "unpublish"].includes(action))
        : prev,
  },
});
