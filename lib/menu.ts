/**
 * Dados do cardápio e conteúdo da home.
 * Preços e itens extraídos do cardápio de referência (Natal 2025).
 * TODO: atualizar com o cardápio atual quando a Monique enviar.
 */

export type Img = { src: string; w: number; h: number; alt: string };

export const IMAGES = {
  logo: { src: "/images/logo.jpg", w: 708, h: 708, alt: "Logo da Dona Glacê" },
  monique: {
    src: "/images/monique.jpg",
    w: 1258,
    h: 843,
    alt: "Monique Nery, confeiteira e fundadora da Dona Glacê, segurando um docinho",
  },
  chocotone: {
    src: "/images/chocotone-trufado.jpg",
    w: 1815,
    h: 2420,
    alt: "Fatia de chocotone trufado com doce de leite escorrendo",
  },
  fruitcake: { src: "/images/ig-fruitcake.jpg", w: 1440, h: 1920, alt: "Fruit cake red velvet com frutas vermelhas" },
  floral: { src: "/images/ig-floral.jpg", w: 1440, h: 1920, alt: "Bolo floral artesanal de massa branca" },
  shagcake: { src: "/images/ig-shagcake.jpg", w: 3024, h: 3024, alt: "Bolo decorado estilo shag cake" },
  spiderman: { src: "/images/ig-spiderman.jpg", w: 1200, h: 1533, alt: "Bolo temático do Homem-Aranha" },
  brigadeiros: { src: "/images/ig-brigadeiros.jpg", w: 720, h: 960, alt: "Brigadeiros gourmet decorados com flores" },
  merengue: { src: "/images/ig-merengue.jpg", w: 2268, h: 4032, alt: "Merengue de morango com suspiros e frutas" },
  minichocotone: { src: "/images/ig-minichocotone.jpg", w: 1440, h: 1440, alt: "Mini chocotones recheados" },
  boloemotivo: { src: "/images/ig-boloemotivo.jpg", w: 1440, h: 1920, alt: "Bolo decorado da Dona Glacê" },
} satisfies Record<string, Img>;

/** Os 5 mais pedidos (seleção ilustrativa — confirmar com a Monique). */
export const MAIS_PEDIDOS = [
  { rank: 1, name: "Chocotone Trufado", price: "R$ 120", image: IMAGES.chocotone, badge: "mais pedido", msg: "Quero o Chocotone Trufado!" },
  { rank: 2, name: "Fruit Cake Red Velvet", price: "sob encomenda", image: IMAGES.fruitcake, msg: "Quero o Fruit Cake Red Velvet!" },
  { rank: 3, name: "Merengue de Morango", price: "a partir de R$ 80", image: IMAGES.merengue, msg: "Quero o Merengue de Morango!" },
  { rank: 4, name: "Brigadeiros Gourmet", price: "personalizados", image: IMAGES.brigadeiros, msg: "Quero Brigadeiros Gourmet!" },
  { rank: 5, name: "Bolos Decorados", price: "sob encomenda", image: IMAGES.shagcake, msg: "Quero um Bolo Decorado!" },
] as const;

/** Categorias (teaser na home). */
export const CATEGORIAS = [
  { name: "Bolos Decorados", desc: "Temáticos, infantis e cheios de personalidade.", image: IMAGES.shagcake, catalogId: "bolos-decorados" },
  { name: "Bolos Modernos", desc: "Red velvet, frutas vermelhas e recheios que surpreendem.", image: IMAGES.fruitcake, catalogId: "bolos-modernos" },
  { name: "Sobremesas na Travessa", desc: "Merengue, banoffe, maracujá — servem de 6 a 10.", image: IMAGES.merengue, badge: "R$ 70+", catalogId: "sobremesas" },
  { name: "Brigadeiros Gourmet", desc: "Personalizados com flores e cores para o seu evento.", image: IMAGES.brigadeiros, catalogId: "brigadeiros" },
  { name: "Chocotones Artesanais", desc: "Trufados e recheados, do mini ao 1kg. A partir de R$ 34.", image: IMAGES.minichocotone, badge: "sazonal", catalogId: "chocotone-trufado" },
] as const;

/** Cardápio completo (página /cardapio). */
export type MenuItem = { name: string; desc?: string; price: string };
export type MenuGroup = { id: string; title: string; note?: string; items: MenuItem[] };

export const CARDAPIO: MenuGroup[] = [
  {
    id: "bolos-decorados",
    title: "Bolos Decorados",
    note: "Temáticos, infantis e personalizados — orçamento sob medida",
    items: [
      { name: "Bolos temáticos & infantis", desc: "Do tema à cor, feitos conforme a sua festa — personagens, super-heróis e mais.", price: "Sob encomenda" },
      { name: "Shag Cake & decorados autorais", desc: "Acabamentos especiais e design exclusivo para datas marcantes.", price: "Sob encomenda" },
    ],
  },
  {
    id: "bolos-modernos",
    title: "Bolos Modernos",
    note: "Massas e recheios contemporâneos — orçamento sob medida",
    items: [
      { name: "Fruit Cake (Red Velvet)", desc: "Massa red velvet, recheio de brigadeiro com morangos, chantininho e frutas vermelhas.", price: "Sob encomenda" },
      { name: "Bolos florais", desc: "Massa branca, recheios clássicos (ex.: doce de leite e ameixa) e decoração elegante.", price: "Sob encomenda" },
    ],
  },
  {
    id: "brigadeiros",
    title: "Brigadeiros Gourmet",
    note: "Para festas, lembrancinhas e presentes",
    items: [
      { name: "Brigadeiros personalizados", desc: "Sabores variados e decoração sob medida — flores, cores e temas da sua festa.", price: "Orçamento" },
    ],
  },
  {
    id: "chocotone-trufado",
    title: "Chocotone Trufado",
    note: "Aprox. 1kg · acompanha caixa personalizada, laço e tag",
    items: [
      { name: "Brigadeiro", desc: "Recheado com brigadeiro cremoso, coberto com chocolate e granulado nobre.", price: "R$ 120" },
      { name: "Nozes", desc: "Doce de leite artesanal e nozes, coberto com chocolate branco e nuts.", price: "R$ 120" },
      { name: "Pistache & Frutas Vermelhas", desc: "Brigadeiro de pistache e geleia artesanal de frutas vermelhas, chocolate branco e pistache.", price: "R$ 145" },
      { name: "Kinder Bueno", desc: "Ninho e Nutella, chocolate branco, fio de nutella e Kinder Bueno.", price: "R$ 130" },
    ],
  },
  {
    id: "mini-chocotone",
    title: "Mini Chocotone",
    note: "Aprox. 250g · acompanha caixa personalizada, laço e tag",
    items: [
      { name: "Nozes", desc: "Doce de leite artesanal e nozes, chocolate branco e nuts.", price: "R$ 34" },
      { name: "Brigadeiro", desc: "Brigadeiro cremoso, chocolate e granulê.", price: "R$ 34" },
      { name: "Dois Amores", desc: "Brigadeiro blend e ninho cremoso, duplo chocolate e granulê.", price: "R$ 34" },
      { name: "Kinder Bueno", desc: "Ninho e Nutella, chocolate branco, fio de nutella e Kinder Bueno.", price: "R$ 36" },
      { name: "Chocomelo", desc: "Brigadeiro e caramelo salgado, chocolate e biscoito de especiarias caramelizado.", price: "R$ 36" },
      { name: "Pistache & Frutas Vermelhas", desc: "Brigadeiro de pistache, geleia de frutas vermelhas, chocolate branco e pistache.", price: "R$ 38" },
    ],
  },
  {
    id: "sobremesas",
    title: "Sobremesas na Travessa",
    note: "(P) serve até 6 porções · (G) serve até 10 porções",
    items: [
      { name: "Merengue de Morango", desc: "Massa de baunilha, nata com morangos, creme de ninho, suspiro e chantilly.", price: "P R$ 80 · G R$ 165" },
      { name: "Delícia de Maracujá", desc: "Biscoito assado, brigadeiro de ninho e geleia artesanal de maracujá com chantininho.", price: "P R$ 75 · G R$ 155" },
      { name: "Banoffe", desc: "Biscoito assado, doce de leite artesanal, banana, canela, chantininho e raspas de chocolate.", price: "P R$ 75 · G R$ 155" },
      { name: "Abacaxi com Coco", desc: "Massa de baunilha, creme de coco, compota de abacaxi e chantininho.", price: "P R$ 75 · G R$ 155" },
      { name: "Bombom de Morango", desc: "Brigadeiro de ninho, morangos, brigadeiro blend, ganache e granulê.", price: "P R$ 70 · G R$ 145" },
      { name: "Bombom de Uva", desc: "Creme de ninho, uva Thompson, ganache cremosa e raspas de chocolate.", price: "P R$ 70 · G R$ 145" },
    ],
  },
  {
    id: "mimos",
    title: "Mimos & Presenteáveis",
    items: [
      { name: "Chocomimo", desc: "Cappuccino em barra para dissolver no leite quente. (não acompanha caneca)", price: "R$ 13" },
      { name: "Mini Chocotone (presente)", desc: "Produzido artesanalmente, coberto com chocolate e granulado nobre.", price: "R$ 17" },
      { name: "Rena de Brownie", desc: "Quadradinho de brownie (6x6cm), crocante por fora e macio por dentro.", price: "R$ 8,90" },
      { name: "Kit Doçura", desc: "1 caixa decorada + 1 Mini Chocotone + 1 Chocomimo.", price: "R$ 45" },
      { name: "Árvore Bombotone", desc: "Caixa com 2 árvores bombom de chocotone, recheadas com doce de leite e brigadeiro.", price: "R$ 36" },
    ],
  },
  {
    id: "datas-especiais",
    title: "Datas Especiais",
    note: "Coleções sazonais sob encomenda",
    items: [
      { name: "Natal, Páscoa, Dia das Mães e mais", desc: "Kits e doces temáticos lançados a cada data comemorativa. Fale com a gente para a coleção vigente.", price: "Sob encomenda" },
    ],
  },
] as const;

export const DEPOIMENTOS = [
  { quote: "Encomendei o chocotone trufado e foi o melhor que já comi. Atendimento impecável da Monique.", author: "Rafael M.", local: "Martim de Sá" },
  { quote: "Fez o bolo da minha filha idêntico ao que pedi. Me emocionei! Já encomendei o próximo.", author: "Camila S.", local: "Indaiá" },
  { quote: "Sabor de verdade e um capricho que impressiona. Virou tradição nas nossas datas.", author: "Beatriz L.", local: "Centro" },
] as const;

export const PASSOS = [
  { n: 1, title: "Chame no WhatsApp", desc: "Conte a data, o tema e para quantas pessoas." },
  { n: 2, title: "Receba o orçamento", desc: "A Monique monta uma proposta sob medida pra você." },
  { n: 3, title: "Garanta sua data", desc: "Confirme com 50% de sinal — Pix, cartão ou dinheiro." },
  { n: 4, title: "É só retirar", desc: "No Bairro Caputera, pertinho do Assaí. 🎁" },
] as const;

export const FAQ = [
  { q: "Com quanta antecedência preciso encomendar?", a: "Quanto antes, melhor! As vagas de produção da semana são limitadas e datas concorridas esgotam rápido — garanta a sua com alguns dias de antecedência." },
  { q: "Como funciona o pagamento?", a: "Agendamos com 50% de sinal e o restante na retirada. Aceitamos Pix, cartão (link) e dinheiro. O pedido é confirmado após o envio do comprovante." },
  { q: "Fazem bolos temáticos e sobremesas grandes?", a: "Sim! Bolos decorados, temáticos, modernos e sobremesas na travessa que servem de 6 a 10 porções." },
  { q: "Qual o horário de atendimento?", a: "De terça a sábado. Mande sua mensagem no WhatsApp que a gente responde rapidinho." },
] as const;
