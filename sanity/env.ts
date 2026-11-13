// Valores vêm das variáveis de ambiente (.env.local / Vercel).
// O "placeholder" só existe para o build não quebrar antes do projeto Sanity ser criado.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
