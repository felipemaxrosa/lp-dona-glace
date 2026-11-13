/**
 * Popula o Sanity com o conteúdo atual do site + sobe as fotos de public/images.
 * Rodar: npm run seed   (usa .env.local via --env-file)
 * Idempotente: usa createOrReplace com _ids fixos; imagens são deduplicadas por hash.
 */
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId) throw new Error("Faltou NEXT_PUBLIC_SANITY_PROJECT_ID no .env.local");
if (!token) throw new Error("Faltou SANITY_API_WRITE_TOKEN no .env.local");

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token,
  useCdn: false,
});

const IMG_DIR = join(process.cwd(), "public", "images");

type ImgRef = { _type: "image"; asset: { _type: "reference"; _ref: string }; alt: string };

async function up(file: string, alt: string): Promise<ImgRef> {
  const asset = await client.assets.upload("image", createReadStream(join(IMG_DIR, file)), { filename: file });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = Record<string, any>;

const cat = (slug: string, fields: Doc): Doc => ({
  _id: `category-${slug}`,
  _type: "category",
  slug: { _type: "slug", current: slug },
  destaqueNaHome: false,
  ...fields,
});

const prod = (slug: string, catSlug: string, fields: Doc): Doc => ({
  _id: `product-${slug}`,
  _type: "product",
  slug: { _type: "slug", current: slug },
  categoria: { _type: "reference", _ref: `category-${catSlug}` },
  ativo: true,
  sazonal: false,
  ...fields,
});

async function main() {
  console.log("↑ Subindo imagens...");
  const img = {
    monique: await up("monique.jpg", "Monique Nery, confeiteira e fundadora da Dona Glacê, segurando um docinho"),
    chocotone: await up("chocotone-trufado.jpg", "Fatia de chocotone trufado com doce de leite escorrendo"),
    fruitcake: await up("ig-fruitcake.jpg", "Fruit cake red velvet com frutas vermelhas"),
    floral: await up("ig-floral.jpg", "Bolo floral artesanal de massa branca"),
    shagcake: await up("ig-shagcake.jpg", "Bolo decorado estilo shag cake"),
    spiderman: await up("ig-spiderman.jpg", "Bolo temático do Homem-Aranha"),
    brigadeiros: await up("ig-brigadeiros.jpg", "Brigadeiros gourmet decorados com flores"),
    merengue: await up("ig-merengue.jpg", "Merengue de morango com suspiros e frutas"),
    minichocotone: await up("ig-minichocotone.jpg", "Mini chocotones recheados"),
    boloemotivo: await up("ig-boloemotivo.jpg", "Bolo decorado da Dona Glacê"),
  };

  const docs: Doc[] = [
    // ---------- Singletons ----------
    {
      _id: "heroSettings",
      _type: "heroSettings",
      eyebrow: "+2 mil clientes adoçados desde 2016",
      titulo: "O doce que vai ser o",
      destaque: "astro da sua festa",
      descricao: 'Bolos, sobremesas e chocotones artesanais que fazem todo mundo perguntar "de quem é esse doce?". Feitos à mão pela Monique, em Caraguatatuba.',
      precoBadge: "sobremesas a partir de R$ 70",
      notaBadge: "Nota 5,0",
      imagem: img.fruitcake,
    },
    {
      _id: "sobreSettings",
      _type: "sobreSettings",
      subtitulo: "Prazer, eu sou a Monique",
      titulo: "Doce de verdade, feito com o coração",
      paragrafos: [
        "O que começou em 2016, numa cozinha movida a amor pela confeitaria, hoje já adoçou mais de 2 mil clientes em Caraguatatuba. Cada bolo carrega a mesma promessa do primeiro dia: ingredientes de verdade, capricho à mão e aquele sabor que você sente na primeira garfada.",
        "Aqui não vendemos só doce — ajudamos você a celebrar o que importa: família, amigos e os momentos que aquecem o coração. 🤍",
      ],
      imagem: img.monique,
      tagNome: "Monique Nery",
      tagCargo: "confeiteira & fundadora",
      badge: "desde 2016",
      stats: [
        { _key: "s1", valor: "10", label: "anos de confeitaria" },
        { _key: "s2", valor: "+2 mil", label: "clientes felizes" },
        { _key: "s3", valor: "100%", label: "feito à mão" },
      ],
    },
    {
      _id: "siteSettings",
      _type: "siteSettings",
      nome: "Dona Glacê",
      telefoneIntl: "5512981046072",
      telefoneDisplay: "(12) 98104-6072",
      instagram: "donaglace",
      horario: "Terça a Sábado",
      bairro: "Bairro Caputera",
      referencia: "próximo ao mercado Assaí",
      cidade: "Caraguatatuba",
      uf: "SP",
      textoPagamento: "Agendamento com 50% de sinal · Pix, cartão e dinheiro",
    },
    {
      _id: "comoEncomendar",
      _type: "comoEncomendar",
      tituloSecao: "Encomendar é simples assim",
      passos: [
        { _key: "p1", titulo: "Chame no WhatsApp", descricao: "Conte a data, o tema e para quantas pessoas." },
        { _key: "p2", titulo: "Receba o orçamento", descricao: "A Monique monta uma proposta sob medida pra você." },
        { _key: "p3", titulo: "Garanta sua data", descricao: "Confirme com 50% de sinal — Pix, cartão ou dinheiro." },
        { _key: "p4", titulo: "É só retirar", descricao: "No Bairro Caputera, pertinho do Assaí. 🎁" },
      ],
      faq: [
        { _key: "f1", pergunta: "Com quanta antecedência preciso encomendar?", resposta: "Quanto antes, melhor! As vagas de produção da semana são limitadas e datas concorridas esgotam rápido — garanta a sua com alguns dias de antecedência." },
        { _key: "f2", pergunta: "Como funciona o pagamento?", resposta: "Agendamos com 50% de sinal e o restante na retirada. Aceitamos Pix, cartão (link) e dinheiro. O pedido é confirmado após o envio do comprovante." },
        { _key: "f3", pergunta: "Fazem bolos temáticos e sobremesas grandes?", resposta: "Sim! Bolos decorados, temáticos, modernos e sobremesas na travessa que servem de 6 a 10 porções." },
        { _key: "f4", pergunta: "Qual o horário de atendimento?", resposta: "De terça a sábado. Mande sua mensagem no WhatsApp que a gente responde rapidinho." },
      ],
    },

    // ---------- Categorias ----------
    cat("bolos-decorados", { nome: "Bolos Decorados", descricao: "Temáticos, infantis e cheios de personalidade.", imagem: img.shagcake, destaqueNaHome: true, ordem: 10 }),
    cat("bolos-modernos", { nome: "Bolos Modernos", descricao: "Red velvet, frutas vermelhas e recheios que surpreendem.", imagem: img.fruitcake, destaqueNaHome: true, ordem: 20 }),
    cat("brigadeiros", { nome: "Brigadeiros Gourmet", descricao: "Personalizados com flores e cores para o seu evento.", imagem: img.brigadeiros, destaqueNaHome: true, ordem: 30 }),
    cat("chocotone-trufado", { nome: "Chocotone Trufado", descricao: "Trufados e recheados, do mini ao 1kg. A partir de R$ 34.", nota: "Aprox. 1kg · acompanha caixa personalizada, laço e tag", badge: "sazonal", imagem: img.chocotone, destaqueNaHome: true, ordem: 40 }),
    cat("mini-chocotone", { nome: "Mini Chocotone", descricao: "Versão individual, recheada e presenteável.", nota: "Aprox. 250g · acompanha caixa personalizada, laço e tag", imagem: img.minichocotone, destaqueNaHome: false, ordem: 50 }),
    cat("sobremesas", { nome: "Sobremesas na Travessa", descricao: "Merengue, banoffe, maracujá — servem de 6 a 10.", nota: "(P) serve até 6 porções · (G) serve até 10 porções", badge: "R$ 70+", imagem: img.merengue, destaqueNaHome: true, ordem: 60 }),
    cat("mimos", { nome: "Mimos & Presenteáveis", descricao: "Lembrancinhas e presentes doces para qualquer ocasião.", imagem: img.minichocotone, destaqueNaHome: false, ordem: 70 }),
    cat("datas-especiais", { nome: "Datas Especiais", descricao: "Natal, Páscoa, Dia das Mães e cada celebração que merece um doce de verdade.", imagem: img.boloemotivo, destaqueNaHome: true, ordem: 80 }),

    // ---------- Produtos ----------
    // Bolos Decorados (sob encomenda)
    prod("bd-tematicos", "bolos-decorados", { nome: "Bolos temáticos & infantis", descricao: "Do tema à cor, feitos conforme a sua festa — personagens, super-heróis e mais.", precoTipo: "sobEncomenda", imagem: img.spiderman, ordem: 10 }),
    prod("bd-shag", "bolos-decorados", { nome: "Shag Cake & decorados autorais", descricao: "Acabamentos especiais e design exclusivo para datas marcantes.", precoTipo: "sobEncomenda", imagem: img.shagcake, top5: 5, ordem: 20 }),
    // Bolos Modernos (sob encomenda)
    prod("bm-fruitcake", "bolos-modernos", { nome: "Fruit Cake (Red Velvet)", descricao: "Massa red velvet, recheio de brigadeiro com morangos, chantininho e frutas vermelhas.", precoTipo: "sobEncomenda", imagem: img.fruitcake, top5: 2, ordem: 10 }),
    prod("bm-florais", "bolos-modernos", { nome: "Bolos florais", descricao: "Massa branca, recheios clássicos (ex.: doce de leite e ameixa) e decoração elegante.", precoTipo: "sobEncomenda", imagem: img.floral, ordem: 20 }),
    // Brigadeiros (orçamento)
    prod("brig-personalizados", "brigadeiros", { nome: "Brigadeiros personalizados", descricao: "Sabores variados e decoração sob medida — flores, cores e temas da sua festa.", precoTipo: "sobEncomenda", precoNota: "Orçamento", imagem: img.brigadeiros, top5: 4, ordem: 10 }),
    // Chocotone Trufado (~1kg, fixo)
    prod("ct-brigadeiro", "chocotone-trufado", { nome: "Brigadeiro", descricao: "Recheado com brigadeiro cremoso, coberto com chocolate e granulado nobre.", precoTipo: "fixo", preco: 120, unidade: "≈ 1kg", imagem: img.chocotone, top5: 1, ordem: 10 }),
    prod("ct-nozes", "chocotone-trufado", { nome: "Nozes", descricao: "Doce de leite artesanal e nozes, coberto com chocolate branco e nuts.", precoTipo: "fixo", preco: 120, unidade: "≈ 1kg", ordem: 20 }),
    prod("ct-pistache", "chocotone-trufado", { nome: "Pistache & Frutas Vermelhas", descricao: "Brigadeiro de pistache e geleia artesanal de frutas vermelhas, chocolate branco e pistache.", precoTipo: "fixo", preco: 145, unidade: "≈ 1kg", ordem: 30 }),
    prod("ct-kinder", "chocotone-trufado", { nome: "Kinder Bueno", descricao: "Ninho e Nutella, chocolate branco, fio de nutella e Kinder Bueno.", precoTipo: "fixo", preco: 130, unidade: "≈ 1kg", ordem: 40 }),
    // Mini Chocotone (~250g, fixo)
    prod("mini-nozes", "mini-chocotone", { nome: "Nozes", descricao: "Doce de leite artesanal e nozes, chocolate branco e nuts.", precoTipo: "fixo", preco: 34, unidade: "≈ 250g", imagem: img.minichocotone, ordem: 10 }),
    prod("mini-brigadeiro", "mini-chocotone", { nome: "Brigadeiro", descricao: "Brigadeiro cremoso, chocolate e granulê.", precoTipo: "fixo", preco: 34, unidade: "≈ 250g", ordem: 20 }),
    prod("mini-dois-amores", "mini-chocotone", { nome: "Dois Amores", descricao: "Brigadeiro blend e ninho cremoso, duplo chocolate e granulê.", precoTipo: "fixo", preco: 34, unidade: "≈ 250g", ordem: 30 }),
    prod("mini-kinder", "mini-chocotone", { nome: "Kinder Bueno", descricao: "Ninho e Nutella, chocolate branco, fio de nutella e Kinder Bueno.", precoTipo: "fixo", preco: 36, unidade: "≈ 250g", ordem: 40 }),
    prod("mini-chocomelo", "mini-chocotone", { nome: "Chocomelo", descricao: "Brigadeiro e caramelo salgado, chocolate e biscoito de especiarias caramelizado.", precoTipo: "fixo", preco: 36, unidade: "≈ 250g", ordem: 50 }),
    prod("mini-pistache", "mini-chocotone", { nome: "Pistache & Frutas Vermelhas", descricao: "Brigadeiro de pistache, geleia de frutas vermelhas, chocolate branco e pistache.", precoTipo: "fixo", preco: 38, unidade: "≈ 250g", ordem: 60 }),
    // Sobremesas (tamanhos P/G)
    prod("sob-merengue", "sobremesas", { nome: "Merengue de Morango", descricao: "Massa de baunilha, nata com morangos, creme de ninho, suspiro e chantilly.", precoTipo: "tamanhos", precoP: 80, precoG: 165, imagem: img.merengue, top5: 3, ordem: 10 }),
    prod("sob-maracuja", "sobremesas", { nome: "Delícia de Maracujá", descricao: "Biscoito assado, brigadeiro de ninho e geleia artesanal de maracujá com chantininho.", precoTipo: "tamanhos", precoP: 75, precoG: 155, ordem: 20 }),
    prod("sob-banoffe", "sobremesas", { nome: "Banoffe", descricao: "Biscoito assado, doce de leite artesanal, banana, canela, chantininho e raspas de chocolate.", precoTipo: "tamanhos", precoP: 75, precoG: 155, ordem: 30 }),
    prod("sob-abacaxi", "sobremesas", { nome: "Abacaxi com Coco", descricao: "Massa de baunilha, creme de coco, compota de abacaxi e chantininho.", precoTipo: "tamanhos", precoP: 75, precoG: 155, ordem: 40 }),
    prod("sob-bombom-morango", "sobremesas", { nome: "Bombom de Morango", descricao: "Brigadeiro de ninho, morangos, brigadeiro blend, ganache e granulê.", precoTipo: "tamanhos", precoP: 70, precoG: 145, ordem: 50 }),
    prod("sob-bombom-uva", "sobremesas", { nome: "Bombom de Uva", descricao: "Creme de ninho, uva Thompson, ganache cremosa e raspas de chocolate.", precoTipo: "tamanhos", precoP: 70, precoG: 145, ordem: 60 }),
    // Mimos (fixo)
    prod("mimo-chocomimo", "mimos", { nome: "Chocomimo", descricao: "Cappuccino em barra para dissolver no leite quente. (não acompanha caneca)", precoTipo: "fixo", preco: 13, ordem: 10 }),
    prod("mimo-mini", "mimos", { nome: "Mini Chocotone (presente)", descricao: "Produzido artesanalmente, coberto com chocolate e granulado nobre.", precoTipo: "fixo", preco: 17, ordem: 20 }),
    prod("mimo-rena", "mimos", { nome: "Rena de Brownie", descricao: "Quadradinho de brownie (6x6cm), crocante por fora e macio por dentro.", precoTipo: "fixo", preco: 8.9, ordem: 30 }),
    prod("mimo-kit", "mimos", { nome: "Kit Doçura", descricao: "1 caixa decorada + 1 Mini Chocotone + 1 Chocomimo.", precoTipo: "fixo", preco: 45, ordem: 40 }),
    prod("mimo-arvore", "mimos", { nome: "Árvore Bombotone", descricao: "Caixa com 2 árvores bombom de chocotone, recheadas com doce de leite e brigadeiro.", precoTipo: "fixo", preco: 36, ordem: 50 }),
    // Datas Especiais (sob encomenda)
    prod("de-sazonais", "datas-especiais", { nome: "Natal, Páscoa, Dia das Mães e mais", descricao: "Kits e doces temáticos lançados a cada data comemorativa. Fale com a gente para a coleção vigente.", precoTipo: "sobEncomenda", imagem: img.boloemotivo, ordem: 10 }),

    // ---------- Depoimentos ----------
    { _id: "testimonial-juliana", _type: "testimonial", autor: "Juliana P.", local: "Caraguatatuba", destaque: true, ordem: 10, texto: "O bolo foi, sem exagero, a coisa mais linda e gostosa que servi numa festa. A Dona Glacê entrega arte — não peço de outro lugar." },
    { _id: "testimonial-rafael", _type: "testimonial", autor: "Rafael M.", local: "Martim de Sá", destaque: false, ordem: 20, texto: "Encomendei o chocotone trufado e foi o melhor que já comi. Atendimento impecável da Monique." },
    { _id: "testimonial-camila", _type: "testimonial", autor: "Camila S.", local: "Indaiá", destaque: false, ordem: 30, texto: "Fez o bolo da minha filha idêntico ao que pedi. Me emocionei! Já encomendei o próximo." },
    { _id: "testimonial-beatriz", _type: "testimonial", autor: "Beatriz L.", local: "Centro", destaque: false, ordem: 40, texto: "Sabor de verdade e um capricho que impressiona. Virou tradição nas nossas datas." },
  ];

  console.log(`↑ Gravando ${docs.length} documentos...`);
  const tx = client.transaction();
  docs.forEach((d) => tx.createOrReplace(d));
  await tx.commit();
  console.log("✓ Seed concluído com sucesso.");
}

main().catch((err) => {
  console.error("✗ Falha no seed:", err.message || err);
  process.exit(1);
});
