"use client";

import Image from "next/image";
import { urlFor, sanityImageLoader } from "@/sanity/lib/image";
import type { SImage } from "@/lib/types";

/**
 * Imagem do hero (elemento LCP). Client component só para poder passar o `loader`
 * ao next/image — assim a imagem é servida direto do cdn.sanity.io, sem o otimizador
 * da Vercel. O resto do hero continua server component (zero JS extra).
 */
export default function HeroImage({ img, alt }: { img: SImage; alt: string }) {
  return (
    <Image
      loader={sanityImageLoader(img, 1.25)}
      src={urlFor(img).width(840).height(1050).url()}
      alt={alt}
      fill
      priority
      quality={70}
      sizes="(max-width: 1024px) 86vw, 420px"
      className="object-cover"
    />
  );
}
