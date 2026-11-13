import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Webhook do Sanity: ao publicar, revalida o conteúdo do site na hora.
 * Configurar em sanity.io/manage > API > Webhooks apontando para /api/revalidate,
 * com o mesmo segredo de SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Assinatura inválida", { status: 401 });
    }

    revalidateTag("sanity", "max");
    if (body?._type) revalidateTag(body._type, "max");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
