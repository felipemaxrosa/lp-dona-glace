import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Gera URL de imagem do Sanity com recorte/hotspot. Ex.: urlFor(img).width(1200).height(1500).url() */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("crop");
}

/**
 * URL única (700×700) usada no card do produto E no modal — a mesma string em ambos
 * faz o modal reaproveitar a imagem já baixada pelo card (cache do navegador → abre
 * instantâneo). Usada no cardápio e no Top 5 da home.
 */
export function productImageUrl(source: SanityImageSource) {
  return urlFor(source).width(700).height(700).url();
}
