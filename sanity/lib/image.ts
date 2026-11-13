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
 * Loader para o next/image servir a imagem DIRETO do cdn.sanity.io, sem passar pelo
 * otimizador da Vercel (/_next/image) — que, em cache frio, re-busca e re-encoda a
 * imagem e atrasa o LCP. O Sanity já entrega avif/webp sob demanda (auto=format).
 *
 * `img`    = objeto de imagem do Sanity (respeita hotspot/crop).
 * `aspect` = altura/largura desejada (ex.: 4:5 → 1.25). O next/image chama o loader
 *            com cada largura do srcset, então o recorte acompanha a largura pedida.
 */
export function sanityImageLoader(img: SanityImageSource, aspect?: number) {
  return ({ width, quality }: { src: string; width: number; quality?: number }) => {
    let b = builder.image(img).width(width).fit("crop").auto("format").quality(quality ?? 70);
    if (aspect) b = b.height(Math.round(width * aspect));
    return b.url();
  };
}
