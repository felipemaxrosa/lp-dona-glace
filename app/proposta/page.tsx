import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Proposta",
  description: "Proposta especial da Max Digital Studio para o site oficial da Dona Glacê.",
  robots: { index: false, follow: false },
};

export default function PropostaPage() {
  return (
    <div className={styles.wrap}>
      <main className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Max Digital Studio</p>
          <p className={styles.script}>Uma proposta feita com carinho pra você,</p>
          <h1 className={styles.title}>
            Vamos colocar a Dona&nbsp;Glacê no ar de vez
          </h1>
          <p className={styles.heroNote}>
            Oi, Monique! O site já está lindo e funcionando. Aqui vai uma proposta pensada
            especialmente pra você tirar ele do ar de teste e publicar como o site oficial
            da sua confeitaria — com um preço que não é o mesmo que eu cobraria de qualquer
            cliente.
          </p>
        </header>

        <hr className={styles.rule} />

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.script}>o que você leva</span>
            <h2 className={styles.h2}>Tudo pronto e no seu controle</h2>
          </div>
          <div className={styles.stack}>
            <div className={styles.incl}>
              <div className={styles.ic} aria-hidden="true">🍰</div>
              <div className={styles.min}>
                <h3 className={styles.inclTitle}>A landing page completa</h3>
                <p className={styles.inclText}>
                  A página que você já viu: topo de impacto, cardápio, os “mais pedidos”,
                  depoimentos e botão de WhatsApp em tudo. Rápida no celular e preparada
                  pra aparecer no Google.
                </p>
              </div>
            </div>
            <div className={styles.incl}>
              <div className={styles.ic} aria-hidden="true">✏️</div>
              <div className={styles.min}>
                <h3 className={styles.inclTitle}>Um painel pra você editar sozinha</h3>
                <p className={styles.inclText}>
                  Troque fotos, preços e produtos quando quiser, direto num painel simples —
                  sem depender de ninguém e sem custo por alteração.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.script}>seu preço especial</span>
            <h2 className={styles.h2}>Tudo por um valor só</h2>
          </div>

          <div className={styles.priceCard}>
            <span className={styles.tag}>Preço Dona Glacê</span>
            <div className={styles.priceNow}>
              R$ 1.800<small> a combinar o parcelamento</small>
            </div>
            <p className={styles.priceWas}>
              em vez de <s>R$ 2.000</s> (landing page + painel)
            </p>
            <span className={styles.badgeFree}>✓ sem mensalidade de manutenção</span>
          </div>

          <div className={styles.compare}>
            <div className={styles.col}>
              <h4 className={styles.colHead}>Para clientes novos</h4>
              <div className={styles.li}><span>Landing page</span><span>R$ 1.500</span></div>
              <div className={styles.li}><span>Painel administrativo</span><span>R$ 500</span></div>
              <div className={styles.li}>
                <span className={styles.dim}>Manutenção mensal (obrigatória)</span>
                <span>R$ 180/mês</span>
              </div>
              <div className={`${styles.li} ${styles.liTotal}`}>
                <span>Total</span><span>R$ 2.000 + mensal</span>
              </div>
            </div>
            <div className={`${styles.col} ${styles.colYou}`}>
              <h4 className={styles.colHead}>Pra você</h4>
              <div className={styles.li}><span>Landing page + painel</span><span>tudo incluso</span></div>
              <div className={styles.li}><span>Manutenção mensal</span><span>isenta</span></div>
              <div className={styles.li}>
                <span className={styles.dim}>Economia na manutenção</span>
                <span>R$ 180/mês</span>
              </div>
              <div className={`${styles.li} ${styles.liTotal}`}>
                <span>Total</span><span>R$ 1.800</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.script}>sem aperto</span>
            <h2 className={styles.h2}>Como a gente divide</h2>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.n}>1</div>
              <div className={styles.min}>
                <h3 className={styles.stepTitle}>Entrada de R$ 500 pra começar</h3>
                <p className={styles.stepText}>
                  É o que coloca o projeto pra rodar. Se ficar melhor pra você, dá pra{" "}
                  <b>parcelar essa entrada</b> também.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.n}>2</div>
              <div className={styles.min}>
                <h3 className={styles.stepTitle}>O restante no seu ritmo</h3>
                <p className={styles.stepText}>
                  Sobram <b>R$ 1.300</b>, e a gente combina juntos um valor por mês que
                  caiba tranquilo no seu orçamento. Sem pressa e sem juros.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.n}>3</div>
              <div className={styles.min}>
                <h3 className={styles.stepTitle}>Hospedagem só depois de quitar</h3>
                <p className={styles.stepText}>
                  Enquanto você estiver pagando o site,{" "}
                  <b>a hospedagem fica por minha conta</b>. Você só começa a pagar depois
                  que o site estiver quitado.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.script}>depois que estiver no ar</span>
            <h2 className={styles.h2}>Os custos pra manter o site</h2>
          </div>
          <div className={styles.after}>
            <div className={styles.note}>
              <h3 className={styles.noteTitle}>Hospedagem</h3>
              <p className={styles.big}>R$ 50/mês</p>
              <p className={styles.noteText}>
                Começa só depois do site quitado. É o que mantém a página rápida e no ar o
                ano todo.
              </p>
            </div>
            <div className={styles.note}>
              <h3 className={styles.noteTitle}>Domínio (donaglace.com.br)</h3>
              <p className={styles.big}>~R$ 50/ano</p>
              <p className={styles.noteText}>
                O endereço do site, pago uma vez por ano direto no registrador. No primeiro
                ano costuma sair por volta de R$ 40.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.close}>
          <span className={styles.script}>combinado?</span>
          <p className={styles.closeText}>
            Pode ler com calma e me chamar com qualquer dúvida — inclusive pra ajustarmos o
            valor das parcelas. Vai ser um prazer deixar a Dona Glacê ainda mais linda no
            digital. 🤍
          </p>
          <p className={styles.sig}>
            — Max Digital Studio ·{" "}
            <a href="https://maxdigitalstudio.com.br/" target="_blank" rel="noopener noreferrer">
              maxdigitalstudio.com.br
            </a>
          </p>
        </div>

        <p className={styles.foot}>
          Proposta para a publicação do site oficial da Dona Glacê · Caraguatatuba&nbsp;·&nbsp;SP
        </p>
      </main>
    </div>
  );
}
