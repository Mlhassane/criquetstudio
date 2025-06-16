import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // Vérifier le secret si fourni
  if (secret && secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new NextResponse('Invalid token', { status: 401 })
  }

  const isPreview = (await draftMode()).isEnabled

  if (isPreview) {
    (await draftMode()).disable()
  } else {
    (await draftMode()).enable()
  }

  return NextResponse.json({ isPreview: !isPreview })
} 