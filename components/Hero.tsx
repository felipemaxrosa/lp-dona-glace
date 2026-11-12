import Image from "next/image";
import { wa } from "@/lib/site";
import { IMAGES } from "@/lib/menu";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1000px 600px at 12% -5%, #E9F5F4 0%, transparent 60%), radial-gradient(760px 520px at 100% 15%, #F2A9CC3d 0%, transparent 55%), linear-gradient(180deg, #D7EEEC 0%, #C7E8E4 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: "radial-gradient(#D8B25766 1.3px, transparent 1.3px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-cream-50 px-4 py-1.5 text-xs font-bold text-choco-400">
            <span className="text-gold-500">★★★★★</span> +2 mil clientes adoçados desde 2016
          </span>
          <h1 className="reveal d1 mt-5 font-display text-[2.5rem] leading-[1.04] text-choco-700 sm:text-6xl">
            O doce que vai ser o
            <br />
            <span className="font-script text-[3.2rem] text-pink-400 sm:text-7xl">
              astro da sua festa
            </span>
          </h1>
          <p className="reveal d2 mx-auto mt-5 max-w-md text-lg text-choco-500/90 lg:mx-0">
            Bolos, sobremesas e chocotones artesanais que fazem todo mundo
            perguntar <em>&ldquo;de quem é esse doce?&rdquo;</em>. Feitos à mão
            pela Monique, em Caraguatatuba.
          </p>
          <div className="reveal d3 mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href={wa("Olá Dona Glacê! Quero fazer meu pedido 🍰")}
              target="_blank"
              rel="noopener noreferrer"
              className="pulse rounded-full bg-pink-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-pink-400/30 transition hover:bg-pink-700"
            >
              Fazer meu pedido
            </a>
            <a
              href="#cardapio"
              className="rounded-full border border-choco-400/25 bg-white/70 px-6 py-3 text-base font-bold text-choco-700 transition hover:bg-white"
            >
              Ver cardápio
            </a>
          </div>
          <div className="reveal d4 mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-choco-400 lg:justify-start">
            <span>⚡ Resposta rápida</span>
            <span>🤍 Feito à mão</span>
            <span>🎁 Caixa personalizada</span>
          </div>
        </div>

        <div className="reveal d2 relative">
          <div className="floaty relative mx-auto w-[86%] max-w-sm">
            <div className="oval-frame lace relative aspect-[4/5] overflow-hidden bg-cream-100">
              <Image
                src={IMAGES.fruitcake.src}
                alt={IMAGES.fruitcake.alt}
                fill
                priority
                sizes="(max-width: 1024px) 86vw, 420px"
                className="object-cover"
              />
            </div>
            <div className="absolute -top-3 -right-1 rotate-6 rounded-2xl bg-gold-500 px-4 py-2 text-sm font-bold text-choco-900 shadow-xl">
              ⭐ Nota 5,0
            </div>
            <div className="absolute -bottom-4 -left-2 -rotate-3 rounded-2xl bg-white px-4 py-2.5 shadow-xl">
              <p className="text-[11px] font-semibold leading-none text-choco-400">
                sobremesas a partir de
              </p>
              <p className="font-display text-2xl leading-tight text-pink-400">R$ 70</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
