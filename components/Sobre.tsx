import Image from "next/image";
import { IMAGES } from "@/lib/menu";

export default function Sobre() {
  return (
    <section id="sobre" className="bg-cream-50 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="reveal order-2 lg:order-1">
          <span className="font-script text-3xl text-teal-700">
            Prazer, eu sou a Monique
          </span>
          <h2 className="mt-2 font-display text-3xl text-choco-700 sm:text-4xl">
            Doce de verdade, feito com o coração
          </h2>
          <p className="mt-5 leading-relaxed text-choco-500/90">
            O que começou em 2016, numa cozinha movida a amor pela confeitaria,
            hoje já adoçou <strong>mais de 2 mil clientes</strong> em
            Caraguatatuba. Cada bolo carrega a mesma promessa do primeiro dia:
            ingredientes de verdade, capricho à mão e aquele sabor que você sente
            na primeira garfada.
          </p>
          <p className="mt-4 leading-relaxed text-choco-500/90">
            Aqui não vendemos só doce — ajudamos você a celebrar o que importa:
            família, amigos e os momentos que aquecem o coração. 🤍
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              ["10", "anos de confeitaria"],
              ["+2 mil", "clientes felizes"],
              ["100%", "feito à mão"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="card-lift rounded-2xl border border-gold-400/30 bg-white py-4"
              >
                <p className="font-display text-2xl text-pink-400">{n}</p>
                <p className="mt-1 text-xs text-choco-400">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal d1 relative order-1 lg:order-2">
          <div className="relative aspect-[3/2] rotate-1 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-choco-900/20">
            <Image
              src={IMAGES.monique.src}
              alt={IMAGES.monique.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 560px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-6 -rotate-2 rounded-2xl bg-teal-800 px-5 py-3 text-white shadow-xl">
            <span className="font-script text-2xl">Monique Nery</span>
            <p className="text-[11px] uppercase tracking-wide opacity-90">
              confeiteira &amp; fundadora
            </p>
          </div>
          <div className="absolute -top-4 -right-3 grid h-20 w-20 rotate-6 place-content-center rounded-full bg-pink-600 text-center text-white shadow-xl">
            <span className="font-script text-xl leading-none">
              desde
              <br />
              2016
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
