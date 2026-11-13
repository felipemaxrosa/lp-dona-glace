"use client";

import Image from "next/image";
import { urlFor, sanityImageLoader } from "@/sanity/lib/image";
import type { SImage } from "@/lib/types";

/**
 * next/image servindo DIRETO do cdn.sanity.io (sem o otimizador /_next/image da Vercel).
 * Client component porque o `loader` é uma função e não cruza a fronteira server→client.
 * Usa layout `fill` — o container define o tamanho/recorte (object-cover).
 *
 * `aspect` = altura/largura do recorte desejado (ex.: 4:5 → 1.25, 3:2 → 2/3, 4:3 → 3/4).
 */
export default function SanityImage({
  img,
  alt,
  sizes,
  className = "object-cover",
  aspect,
  priority = false,
  seedWidth = 1200,
}: {
  img: SImage;
  alt: string;
  sizes: string;
  className?: string;
  aspect?: number;
  priority?: boolean;
  seedWidth?: number;
}) {
  const seed = aspect
    ? urlFor(img).width(seedWidth).height(Math.round(seedWidth * aspect)).url()
    : urlFor(img).width(seedWidth).url();

  return (
    <Image
      loader={sanityImageLoader(img, aspect)}
      src={seed}
      alt={alt}
      fill
      priority={priority}
      quality={70}
      sizes={sizes}
      className={className}
    />
  );
}
