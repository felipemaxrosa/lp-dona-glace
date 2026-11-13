import { wa } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function WhatsappFab({ phone }: { phone: string }) {
  return (
    <a
      href={wa(phone, "Olá Dona Glacê! Vim pelo site e quero fazer um pedido 🍰")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir agora pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-content-center rounded-full bg-pink-600 text-white shadow-2xl shadow-pink-900/25 transition hover:scale-105 hover:bg-pink-700"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
