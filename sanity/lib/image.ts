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

/**
 * URL única (sem srcset) servida DIRETO do cdn.sanity.io em avif/webp (auto=format),
 * respeitando hotspot/crop. Usada em <img> simples (sem next/image), para o elemento
 * LCP pintar sem depender de JS/hidratação e tirar o runtime do next/image do bundle.
 *
 * `w`      = largura pedida (o Sanity entrega nesse tamanho, já otimizado).
 * `aspect` = altura/largura do recorte (ex.: 4:5 → 1.25, 3:2 → 2/3, 4:3 → 3/4).
 */
export function sanityImg(source: SanityImageSource, w: number, aspect?: number) {
  let b = urlFor(source).width(w).quality(70);
  if (aspect) b = b.height(Math.round(w * aspect));
  return b.url();
}
