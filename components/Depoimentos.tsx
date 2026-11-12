import { DEPOIMENTOS } from "@/lib/menu";

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-cream-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal text-center">
          <span className="font-script text-3xl text-teal-500">quem prova, ama</span>
        </div>

        <blockquote className="reveal d1 mx-auto mt-6 max-w-4xl text-center font-display text-2xl italic leading-snug text-choco-700 sm:text-[2.1rem]">
          &ldquo;O bolo foi, sem exagero, a coisa mais linda e gostosa que servi
          numa festa. A Dona Glacê entrega arte — não peço de outro lugar.&rdquo;
        </blockquote>
        <p className="reveal d1 mt-5 text-center text-sm font-bold uppercase tracking-widest text-pink-400">
          Juliana P. · Caraguatatuba
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {DEPOIMENTOS.map((d, i) => (
            <figure
              key={d.author}
              className={`card-lift reveal${i === 1 ? " d1" : i === 2 ? " d2" : ""} rounded-3xl border border-gold-400/30 bg-white p-6`}
            >
              <div className="text-lg text-gold-500" aria-hidden>
                ★★★★★
              </div>
              <blockquote className="mt-3 text-choco-500/90">
                &ldquo;{d.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-bold text-choco-700">
                {d.author}{" "}
                <span className="text-sm font-normal text-choco-400">· {d.local}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
