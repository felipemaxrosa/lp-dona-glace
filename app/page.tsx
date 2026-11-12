import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import CardapioHome from "@/components/CardapioHome";
import Depoimentos from "@/components/Depoimentos";
import ComoEncomendar from "@/components/ComoEncomendar";
import CtaFinal from "@/components/CtaFinal";

export default function Home() {
  return (
    <>
      <Hero />
      <Sobre />
      <CardapioHome />
      <Depoimentos />
      <ComoEncomendar />
      <CtaFinal />
    </>
  );
}
