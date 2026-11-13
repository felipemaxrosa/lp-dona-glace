import type { ComoEncomendarData } from "@/lib/types";

export default function ComoEncomendar({ data }: { data: ComoEncomendarData }) {
  return (
    <section
      id="encomendar"
      className="relative overflow-hidden bg-teal-500 py-20 text-white sm:py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal text-center">
          <span className="font-script text-3xl text-cream-100">é rapidinho</span>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl">
            {data.tituloSecao ?? "Encomendar é simples assim"}
          </h2>
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden
            className="absolute left-[12%] right-[12%] top-11 hidden h-0.5 bg-white/25 lg:block"
          />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.passos?.map((p, i) => (
              <li key={i} className="reveal text-center">
                <div className="mx-auto grid h-14 w-14 place-content-center rounded-full bg-pink-600 font-display text-2xl text-white shadow-lg ring-4 ring-teal-500">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-xl">{p.titulo}</h3>
                <p className="mt-2 text-sm text-cream-100/90">{p.descricao}</p>
              </li>
            ))}
          </ol>
        </div>

        {data.faq?.length ? (
          <div className="reveal mx-auto mt-16 max-w-3xl">
            <h3 className="mb-6 text-center font-display text-2xl">Perguntas frequentes</h3>
            <div className="space-y-3">
              {data.faq.map((f, i) => (
                <details
                  key={i}
                  className="faq rounded-2xl bg-white text-choco-700 shadow-lg shadow-teal-700/20"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold transition hover:text-pink-400">
                    {f.pergunta}
                    <span className="chev shrink-0 text-xl text-pink-400">＋</span>
                  </summary>
                  <div className="ans">
                    <div>
                      <p className="px-5 pb-5 text-sm text-choco-500">{f.resposta}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
