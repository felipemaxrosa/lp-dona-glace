import { heroSettings } from "./heroSettings";
import { sobreSettings } from "./sobreSettings";
import { siteSettings } from "./siteSettings";
import { comoEncomendar } from "./comoEncomendar";
import { category } from "./category";
import { product } from "./product";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  // Singletons
  heroSettings,
  sobreSettings,
  siteSettings,
  comoEncomendar,
  // Coleções
  category,
  product,
  testimonial,
];
