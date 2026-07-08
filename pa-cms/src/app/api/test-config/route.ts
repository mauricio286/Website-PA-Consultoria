// Rota de diagnóstico — REMOVER ANTES DE PRODUÇÃO
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // @ts-ignore
    const mod = await import('@payload-config')
    const config = (await (mod.default ?? mod)) as any

    return NextResponse.json({
      type: typeof config,
      keys: Object.keys(config ?? {}),
      hasAdmin: !!config?.admin,
      hasCollections: !!config?.collections,
      isNull: config === null,
      isUndefined: config === undefined,
      stringified: JSON.stringify(config)?.slice(0, 500),
    })
  } catch (err: any) {
    return NextResponse.json({
      error: true,
      message: err?.message,
      stack: err?.stack?.slice(0, 1000),
    }, { status: 500 })
  }
}
