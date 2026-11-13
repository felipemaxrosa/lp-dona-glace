import type { SiteSettings } from "@/lib/types";

export default function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="bg-choco-900 pb-8 pt-14 text-cream-100/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.jpg"
              alt="Dona Glacê"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-gold-400/60"
            />
            <span className="font-script text-3xl text-cream-50">Dona Glacê</span>
          </div>
          <p className="mt-4 text-sm">
            Confeitaria artesanal em {site.cidade}. Bolos e doces feitos à mão desde
            2016. Adoce seu dia. 🤍
          </p>
        </div>

        <div className="text-sm">
          <h2 className="mb-3 font-display text-lg text-cream-50">Contato</h2>
          <p>
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${site.telefoneIntl}`}
              className="text-teal-300 transition hover:text-teal-100"
            >
              {site.telefoneDisplay}
            </a>
          </p>
          <p className="mt-1">
            Instagram:{" "}
            <a
              href={`https://instagram.com/${site.instagram}`}
              className="text-teal-300 transition hover:text-teal-100"
            >
              @{site.instagram}
            </a>
          </p>
          <p className="mt-1">Atendimento: {site.horario}</p>
        </div>

        <div className="text-sm">
          <h2 className="mb-3 font-display text-lg text-cream-50">Retirada</h2>
          <p>
            {site.bairro} — {site.referencia}
          </p>
          <p className="mt-1">
            {site.cidade} · {site.uf}
          </p>
          <p className="mt-1">{site.textoPagamento}</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl space-y-1 border-t border-white/10 px-6 pt-6 text-center text-xs text-cream-100/70">
        <p>© {new Date().getFullYear()} Dona Glacê · Feito com ♥ em {site.cidade}</p>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://maxdigitalstudio.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal-300 transition hover:text-teal-100"
          >
            Max Digital Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
