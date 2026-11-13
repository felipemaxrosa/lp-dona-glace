import { sanityImg } from "@/sanity/lib/image";
import type { Sobre as SobreData } from "@/lib/types";

export default function Sobre({ data }: { data: SobreData }) {
  return (
    <section id="sobre" className="bg-cream-50 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="reveal order-2 lg:order-1">
          <span className="font-script text-3xl text-teal-700">{data.subtitulo}</span>
          <h2 className="mt-2 font-display text-3xl text-choco-700 sm:text-4xl">
            {data.titulo}
          </h2>
          {data.paragrafos?.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-choco-500/90 first:mt-5">
              {p}
            </p>
          ))}
          {data.stats?.length ? (
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {data.stats.map((s, i) => (
                <div
                  key={i}
                  className="card-lift rounded-2xl border border-gold-400/30 bg-white py-4"
                >
                  <p className="font-display text-2xl text-pink-400">{s.valor}</p>
                  <p className="mt-1 text-xs text-choco-400">{s.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="reveal d1 relative order-1 lg:order-2">
          <div className="relative aspect-[3/2] rotate-1 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-choco-900/20">
            {data.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sanityImg(data.img, 1120, 2 / 3)}
                alt={data.img.alt ?? "Monique Nery, da Dona Glacê"}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
          </div>
          {data.tagNome ? (
            <div className="absolute -bottom-5 left-6 -rotate-2 rounded-2xl bg-teal-800 px-5 py-3 text-white shadow-xl">
              <span className="font-script text-2xl">{data.tagNome}</span>
              {data.tagCargo ? (
                <p className="text-[11px] uppercase tracking-wide opacity-90">
                  {data.tagCargo}
                </p>
              ) : null}
            </div>
          ) : null}
          {data.badge ? (
            <div className="absolute -top-4 -right-3 grid h-20 w-20 rotate-6 place-content-center rounded-full bg-pink-600 text-center text-white shadow-xl">
              <span className="font-script text-xl leading-none">{data.badge}</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
