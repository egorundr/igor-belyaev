import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { workshopLeads } from '@/lib/db/schema'

export const MASTERCLASS_PRICE = '9990.00'

export type YooKassaPayment = {
  id: string
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled'
  amount: { value: string; currency: string }
  metadata?: Record<string, string>
  confirmation?: { confirmation_url?: string }
}

function getCredentials() {
  const shopId = process.env.YOOKASSA_SHOP_ID
  const secretKey = process.env.YOOKASSA_SECRET_KEY
  if (!shopId || !secretKey) throw new Error('YooKassa credentials are not configured')
  return { shopId, secretKey }
}

function authorizationHeader() {
  const { shopId, secretKey } = getCredentials()
  return `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString('base64')}`
}

export async function createYooKassaPayment(input: {
  checkoutKey: string
  leadId: number
  returnUrl: string
}) {
  const response = await fetch('https://api.yookassa.ru/v3/payments', {
    method: 'POST',
    headers: {
      Authorization: authorizationHeader(),
      'Content-Type': 'application/json',
      'Idempotence-Key': input.checkoutKey,
    },
    body: JSON.stringify({
      amount: { value: MASTERCLASS_PRICE, currency: 'RUB' },
      capture: true,
      confirmation: { type: 'redirect', return_url: input.returnUrl },
      description: 'Участие в онлайн-мастер-классе по переговорам',
      metadata: { lead_id: String(input.leadId), checkout_key: input.checkoutKey },
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  })

  if (!response.ok) {
    console.error('[payments] YooKassa create request failed:', response.status)
    throw new Error('YooKassa could not create the payment')
  }

  return (await response.json()) as YooKassaPayment
}

export async function fetchYooKassaPayment(paymentId: string) {
  const response = await fetch(`https://api.yookassa.ru/v3/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: authorizationHeader() },
    cache: 'no-store',
    signal: AbortSignal.timeout(12000),
  })

  if (!response.ok) {
    console.error('[payments] YooKassa payment lookup failed:', response.status)
    throw new Error('YooKassa payment lookup failed')
  }

  return (await response.json()) as YooKassaPayment
}

export async function verifyAndStorePayment(paymentId: string) {
  const db = getDb()
  const [lead] = await db
    .select({ id: workshopLeads.id, yookassaPaymentId: workshopLeads.yookassaPaymentId })
    .from(workshopLeads)
    .where(eq(workshopLeads.yookassaPaymentId, paymentId))
    .limit(1)

  if (!lead) return null

  const payment = await fetchYooKassaPayment(paymentId)
  if (
    payment.id !== paymentId ||
    payment.metadata?.lead_id !== String(lead.id) ||
    payment.amount?.value !== MASTERCLASS_PRICE ||
    payment.amount?.currency !== 'RUB'
  ) {
    throw new Error('YooKassa payment does not match the order')
  }

  const status = payment.status === 'succeeded'
    ? 'paid'
    : payment.status === 'canceled'
      ? 'canceled'
      : 'pending'

  await db
    .update(workshopLeads)
    .set({ paymentStatus: status })
    .where(eq(workshopLeads.yookassaPaymentId, paymentId))

  return status
}

export function isYooKassaConfigured() {
  return Boolean(process.env.YOOKASSA_SHOP_ID && process.env.YOOKASSA_SECRET_KEY)
}

export function isValidPaymentId(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
}

export function isValidCheckoutKey(value: unknown): value is string {
  return isValidPaymentId(value)
}

export async function getLeadPaymentByCheckoutKey(checkoutKey: string) {
  const [lead] = await getDb()
    .select({ paymentId: workshopLeads.yookassaPaymentId, status: workshopLeads.paymentStatus })
    .from(workshopLeads)
    .where(eq(workshopLeads.checkoutKey, checkoutKey))
    .limit(1)
  return lead ?? null
}

export async function getLeadPaymentById(id: number) {
  const [lead] = await getDb()
    .select({ paymentId: workshopLeads.yookassaPaymentId, status: workshopLeads.paymentStatus })
    .from(workshopLeads)
    .where(eq(workshopLeads.id, id))
    .limit(1)
  return lead ?? null
}

export async function getLeadPaymentByPaymentId(paymentId: string) {
  const [lead] = await getDb()
    .select({ id: workshopLeads.id, status: workshopLeads.paymentStatus })
    .from(workshopLeads)
    .where(eq(workshopLeads.yookassaPaymentId, paymentId))
    .limit(1)
  return lead ?? null
}

export async function updatePaymentStatusForCheckout(checkoutKey: string, status: string) {
  const [lead] = await getDb().select({ id: workshopLeads.id }).from(workshopLeads).where(eq(workshopLeads.checkoutKey, checkoutKey)).limit(1)
  if (lead) await updatePaymentStatusForLead(lead.id, status)
}

export async function updatePaymentStatusForLead(leadId: number, status: string) {
  await getDb()
    .update(workshopLeads)
    .set({ paymentStatus: status })
    .where(eq(workshopLeads.id, leadId))
}

export async function savePaymentIdAndStatus(leadId: number, paymentId: string, status: string) {
  await getDb()
    .update(workshopLeads)
    .set({ yookassaPaymentId: paymentId, paymentStatus: status })
    .where(eq(workshopLeads.id, leadId))
}

export async function storePaymentStatus(paymentId: string, status: string) {
  await getDb()
    .update(workshopLeads)
    .set({ paymentStatus: status })
    .where(eq(workshopLeads.yookassaPaymentId, paymentId))
}
