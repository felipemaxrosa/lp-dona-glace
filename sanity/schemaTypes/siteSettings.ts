import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Contato & Informações",
  type: "document",
  fields: [
    defineField({ name: "nome", title: "Nome do negócio", type: "string", initialValue: "Dona Glacê", validation: (r) => r.required() }),
    defineField({
      name: "telefoneIntl",
      title: "WhatsApp (formato internacional, só números)",
      type: "string",
      description: "Usado nos links de WhatsApp. Ex.: 5512981046072 (55 + DDD + número).",
      validation: (r) => r.required().regex(/^\d{12,13}$/, { name: "número internacional" }),
    }),
    defineField({
      name: "telefoneDisplay",
      title: "Telefone (como aparece no site)",
      type: "string",
      initialValue: "(12) 98104-6072",
    }),
    defineField({ name: "instagram", title: "Instagram (sem @)", type: "string", initialValue: "donaglace" }),
    defineField({ name: "horario", title: "Horário de atendimento", type: "string", initialValue: "Terça a Sábado" }),
    defineField({ name: "bairro", title: "Retirada — bairro", type: "string", initialValue: "Bairro Caputera" }),
    defineField({ name: "referencia", title: "Retirada — referência", type: "string", initialValue: "próximo ao mercado Assaí" }),
    defineField({ name: "cidade", title: "Cidade", type: "string", initialValue: "Caraguatatuba" }),
    defineField({ name: "uf", title: "UF", type: "string", initialValue: "SP" }),
    defineField({
      name: "textoPagamento",
      title: "Texto de pagamento/sinal",
      type: "string",
      initialValue: "Agendamento com 50% de sinal · Pix, cartão e dinheiro",
    }),
  ],
  preview: { prepare: () => ({ title: "Contato & Informações" }) },
});
