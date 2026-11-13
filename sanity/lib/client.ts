import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn:false é essencial com revalidação por tag: todo fetch passa pelo cache do
  // Next (revalidate 60 + tags), então só batemos na API ao vivo ao revalidar. Com o
  // CDN ligado, o webhook dispara mas o refetch pega dado velho do CDN por até 60s.
  useCdn: false,
});
