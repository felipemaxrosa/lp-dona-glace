import { wa } from "@/lib/site";

export default function CtaFinal({ phone }: { phone: string }) {
  return (
    <section className="bg-cream-50 py-16 sm:py-20">
      <div className="reveal mx-auto max-w-4xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 py-12 text-center shadow-xl ring-1 ring-gold-400/40 sm:py-14"
          style={{
            background:
              "radial-gradient(620px 320px at 50% -12%, #F2A9CC 0%, transparent 60%), linear-gradient(160deg, #E0579B 0%, #E6358A 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[.14]"
            style={{
              backgroundImage: "radial-gradient(#fff 1.4px, transparent 1.4px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative text-white">
            <span className="font-script text-3xl text-cream-50">não perca sua data</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl">
              Sua data pode esgotar essa semana ⏳
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">
              Não arrisque ficar sem. Fale com a Monique agora e garanta o doce que vai
              roubar a cena. 🤍
            </p>
            <a
              href={wa(phone, "Olá Dona Glacê! Quero garantir minha data 🍰")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-full bg-white px-8 py-4 font-extrabold text-pink-500 shadow-lg transition hover:bg-cream-50"
            >
              Fazer meu pedido no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
