import { client } from "./client";

/**
 * Busca dados no Sanity com cache do Next (ISR + tags).
 * A tag "sanity" (e a tag do tipo) permite revalidar na hora via webhook.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = ["sanity"],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60, tags },
  });
}
