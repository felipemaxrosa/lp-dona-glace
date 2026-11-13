"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV, wa } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function Header({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  const waHeader = wa(phone, "Olá Dona Glacê! Quero fazer um pedido 🍰");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gold-400/30 bg-cream-50/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.jpg"
              alt="Dona Glacê"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-gold-400/60"
            />
            <span className="pt-1 font-script text-2xl leading-none text-choco-500">
              Dona Glacê
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold text-choco-500 md:flex">
            {NAV.map((i) => (
              <Link key={i.href} href={i.href} className="transition hover:text-pink-400">
                {i.label}
              </Link>
            ))}
          </nav>

          <a
            href={waHeader}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-pink-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-pink-400/30 transition hover:bg-pink-700 md:inline-block"
          >
            Pedir agora
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="relative z-50 grid h-10 w-10 place-content-center rounded-full text-choco-500 transition hover:bg-choco-900/5 md:hidden"
          >
            <span className={`block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`mt-[4px] block h-0.5 w-6 rounded-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`mt-[4px] block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Painel do menu mobile — tela cheia abaixo do header (fora do <header> para não herdar o containing-block do backdrop-blur) */}
      <nav
        id="mobile-menu"
        aria-label="Menu principal"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-cream-50 px-4 pb-10 pt-4 transition-opacity duration-300 md:hidden ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col divide-y divide-gold-400/20">
          {NAV.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-2xl text-choco-700 transition hover:text-pink-400"
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={waHeader}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-4 flex items-center justify-center gap-2 rounded-full bg-pink-600 py-3.5 font-bold text-white shadow-lg shadow-pink-400/30 transition hover:bg-pink-700"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Fazer meu pedido
        </a>
      </nav>
    </>
  );
}
