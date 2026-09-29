import { and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { workshopLeads } from '@/lib/db/schema'
import { getYooKassaPayment, isMasterclassAmount } from '@/lib/yookassa'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid event' }, { status: 400 })
  const event = body as { event?: unknown; object?: { id?: unknown } }
  if (event.event !== 'payment.succeeded' && event.event !== 'payment.canceled') {
    return NextResponse.json({ ok: true })
  }

  const paymentId = typeof event.object?.id === 'string' ? event.object.id : ''
  if (!paymentId || paymentId.length > 128) return NextResponse.json({ error: 'Invalid payment ID' }, { status: 400 })

  try {
    const payment = await getYooKassaPayment(paymentId)
    const leadId = Number(payment.metadata?.lead_id)
    const checkoutKey = payment.metadata?.checkout_key

    if (
      payment.id !== paymentId ||
      !Number.isSafeInteger(leadId) ||
      !checkoutKey ||
      !isMasterclassAmount(payment.amount) ||
      (payment.status !== 'succeeded' && payment.status !== 'canceled')
    ) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    const db = getDb()
    const match = and(
      eq(workshopLeads.id, leadId),
      eq(workshopLeads.source, 'masterclass'),
      eq(workshopLeads.checkoutKey, checkoutKey),
      eq(workshopLeads.yookassaPaymentId, paymentId),
    )

    if (payment.status === 'succeeded') {
      await db.update(workshopLeads).set({ paymentStatus: 'succeeded' }).where(match)
    } else {
      await db.update(workshopLeads).set({ paymentStatus: 'canceled' }).where(and(match, eq(workshopLeads.paymentStatus, 'pending')))
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Could not verify payment' }, { status: 503 })
  }
}
