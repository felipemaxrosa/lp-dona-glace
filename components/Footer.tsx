import Image from "next/image";
import { BUSINESS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-choco-900 pb-8 pt-14 text-cream-100/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="Dona Glacê"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-gold-400/60"
            />
            <span className="font-script text-3xl text-cream-50">Dona Glacê</span>
          </div>
          <p className="mt-4 text-sm">
            Confeitaria artesanal em {BUSINESS.city}. Bolos e doces feitos à mão
            desde {BUSINESS.since}. Adoce seu dia. 🤍
          </p>
        </div>

        <div className="text-sm">
          <h2 className="mb-3 font-display text-lg text-cream-50">Contato</h2>
          <p>
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${BUSINESS.phoneIntl}`}
              className="text-teal-300 transition hover:text-teal-100"
            >
              {BUSINESS.phoneDisplay}
            </a>
          </p>
          <p className="mt-1">
            Instagram:{" "}
            <a
              href={BUSINESS.instagramUrl}
              className="text-teal-300 transition hover:text-teal-100"
            >
              @{BUSINESS.instagram}
            </a>
          </p>
          <p className="mt-1">Atendimento: {BUSINESS.hours}</p>
        </div>

        <div className="text-sm">
          <h2 className="mb-3 font-display text-lg text-cream-50">Retirada</h2>
          <p>
            {BUSINESS.neighborhood} — {BUSINESS.reference}
          </p>
          <p className="mt-1">
            {BUSINESS.city} · {BUSINESS.state}
          </p>
          <p className="mt-1">
            Agendamento com 50% de sinal · Pix, cartão e dinheiro
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-6 pt-6 text-center text-xs text-cream-100/70">
        © {new Date().getFullYear()} Dona Glacê · Feito com ♥ em {BUSINESS.city}
      </div>
    </footer>
  );
}
