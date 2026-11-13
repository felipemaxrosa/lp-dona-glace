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
