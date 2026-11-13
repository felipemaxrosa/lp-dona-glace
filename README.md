# Dona Glacê — Landing Page

Landing page da confeitaria **Dona Glacê** (Caraguatatuba-SP), com conteúdo editável pela
Monique via **Sanity Studio**. Home (`/`) + cardápio (`/cardapio`) + Studio embutido (`/studio`).

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
- **CMS:** Sanity (Studio embutido em `/studio`) · revalidação por tag via webhook
- **Deploy:** Vercel → <https://lp-dona-glace.vercel.app>

---

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # e preencha os valores (ver tabela abaixo)
npm run dev                  # site em http://localhost:3000, Studio em /studio
```

### Popular o Sanity com conteúdo inicial (seed)

Só na primeira vez (ou para repopular). Exige `SANITY_API_WRITE_TOKEN` no `.env.local`:

```bash
npm run seed
```

Sobe as imagens de `public/images/` e cria categorias, produtos, depoimentos e os singletons
(Hero, Sobre, Contato, Como Encomendar). É idempotente (`createOrReplace`).

---

## Variáveis de ambiente

| Variável | Onde | Obrigatória | Para quê |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | local + **Vercel** | ✅ | ID do projeto Sanity (`wdpvuf0h`) |
| `NEXT_PUBLIC_SANITY_DATASET` | local + **Vercel** | ✅ | Dataset (`production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | local + **Vercel** | ⬜ (tem fallback) | Versão da API (`2025-01-01`) |
| `NEXT_PUBLIC_SITE_URL` | local + **Vercel** | ✅ | URL canônica (OG, sitemap). Em produção, a URL real do site |
| `SANITY_REVALIDATE_SECRET` | local + **Vercel** | ✅ | Segredo do webhook de revalidação (**tem que ser igual ao do webhook no Sanity**) |
| `SANITY_API_WRITE_TOKEN` | **só local** | ⬜ | Token de escrita — **somente** para o `npm run seed`. **Não** colocar na Vercel |

> **Leitura sem token:** o site lê o Sanity sem token, então o **dataset precisa ser público**
> (`sanity.io/manage` → API → Dataset → *Public*). Por isso a Vercel não precisa do token de escrita.

---

## Como a edição aparece no site (revalidação)

O site usa cache do Next (ISR `revalidate: 60` + tags). Ao publicar no Studio, o Sanity dispara
um **webhook** → `/api/revalidate` → `revalidateTag` → o conteúdo atualiza em **~segundos**.
Se o webhook falhar, o ISR cobre em até 60s como fallback.

> ⚠️ **`useCdn: false`** em [`sanity/lib/client.ts`](sanity/lib/client.ts) é **essencial**.
> Com o CDN ligado, o webhook dispara mas o refetch pega dado em cache do CDN do Sanity por
> até ~60s — a edição demora pra aparecer mesmo com o webhook OK. Não religar o CDN.

### Testar o webhook de ponta a ponta

Edite o Hero no Studio e publique; o selo deve mudar no site em poucos segundos. Para um teste
rápido de assinatura no endpoint de produção, um POST **sem** assinatura deve retornar `401`
(validação ativa) e um POST assinado com o segredo correto, `200 {"revalidated":true}`.

---

## Configuração no Sanity (`sanity.io/manage`)

Checklist único por projeto:

- [ ] **Dataset público:** API → Datasets → `production` → *Public* (leitura sem token).
- [ ] **CORS origins:** API → CORS Origins → adicionar, com *Allow credentials*:
  - `http://localhost:3000`
  - `https://lp-dona-glace.vercel.app` (e o domínio final quando houver)
- [ ] **Token de escrita** (só para o seed): API → Tokens → criar com permissão *Editor* → `.env.local`.
- [ ] **Webhook** (API → Webhooks → *Create webhook*):
  - **Name:** `Revalidar Next.js`
  - **URL:** `https://lp-dona-glace.vercel.app/api/revalidate`
  - **Trigger:** Create, Update, Delete
  - **Filter:** (vazio = todos os tipos, ou restrinja aos tipos do site)
  - **Projection:** `{_type}` (o endpoint usa `_type` para revalidar a tag do tipo)
  - **HTTP method:** `POST` · **API version:** `v2021-06-07` · **Enabled:** ✔
  - **Secret (Advanced):** o **mesmo** valor de `SANITY_REVALIDATE_SECRET` da Vercel

---

## Deploy na Vercel

1. Importar o repositório na Vercel (branch de produção: `main`).
2. Em *Settings → Environment Variables*, adicionar as variáveis marcadas com **Vercel** na
   tabela acima (⚠️ **sem** o `SANITY_API_WRITE_TOKEN`).
3. Deploy. A cada push em `main`, a Vercel redeploya automaticamente.
4. Após o primeiro deploy, confirmar o webhook e o CORS no Sanity (checklist acima).

> Mudança em variável de ambiente **só vale após um Redeploy**.

---

## Dimensões de imagem recomendadas

O Sanity recorta sob demanda (hotspot) — envie em **alta resolução** e marque o foco.

| Slot | Proporção | Mínimo sugerido |
|---|---|---|
| Hero | retrato 4:5 | 1200×1500 px |
| Sobre (foto da Monique) | paisagem 3:2 | 1600×1066 px |
| Categoria (card) | paisagem 4:3 | 1200×900 px |
| Produto (card / cardápio) | quadrado 1:1 | 1200×1200 px |

---

## Rotas

| Rota | O quê |
|---|---|
| `/` | Home (hero, sobre, 5 mais pedidos, depoimentos, como pedir, CTA) |
| `/cardapio` | Catálogo completo por categoria, com modal de imagem |
| `/studio` | Sanity Studio (login Sanity). `noindex` — fora do sitemap/robots |
| `/api/revalidate` | Webhook de revalidação (POST assinado) |

## Scripts

| Comando | O quê |
|---|---|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servir o build |
| `npm run seed` | Popular o Sanity (usa `SANITY_API_WRITE_TOKEN`) |

---

<sub>Desenvolvido por [Max Digital Studio](https://maxdigitalstudio.com.br/).</sub>
