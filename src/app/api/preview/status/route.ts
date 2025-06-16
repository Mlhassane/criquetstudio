import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const isPreview = (await draftMode()).isEnabled
  return NextResponse.json({ isPreview })
} 