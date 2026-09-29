const API_BASE_URL = 'https://chatter.salebot.pro/api'
const PAYMENT_SUCCESS_MESSAGE = 'Оплата мастер-класса прошла успешно. Спасибо за участие!'

function getApiKey() {
  const apiKey = process.env.SALEBOT_API_KEY?.trim()
  if (!apiKey || apiKey.length > 512 || /[\r\n]/.test(apiKey)) {
    throw new Error('SaleBot API is not configured')
  }
  return apiKey
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) throw new Error('Invalid client phone')
  return phone.startsWith('+') ? `+${digits}` : digits
}

function extractClientId(value: unknown): string | null {
  if (typeof value === 'number' && Number.isSafeInteger(value) && value > 0) return String(value)
  if (typeof value === 'string' && /^\d{1,20}$/.test(value.trim()) && value.trim() !== '0') {
    return value.trim()
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const record = value as Record<string, unknown>
  for (const key of ['client_id', 'clientId', 'id']) {
    const clientId = extractClientId(record[key])
    if (clientId) return clientId
  }
  return null
}

async function readResponse(response: Response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

async function findClientId(apiKey: string, phone: string): Promise<string | null> {
  const url = new URL(`${API_BASE_URL}/${encodeURIComponent(apiKey)}/find_client_id_by_phone`)
  url.searchParams.set('phone', normalizePhone(phone))

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  })
  if (response.status === 404) return null
  const body = await readResponse(response)
  if (!response.ok) throw new Error(`SaleBot client lookup failed (${response.status})`)
  return extractClientId(body)
}

export async function sendSaleBotPaymentSuccess(phone: string, providedClientId?: string | null) {
  const apiKey = getApiKey()
  const clientId = providedClientId
    ? (/^\d{1,20}$/.test(providedClientId) ? providedClientId : null)
    : await findClientId(apiKey, phone)
  if (!clientId) {
    if (providedClientId) throw new Error('Invalid SaleBot client ID')
    return { delivered: false as const, reason: 'client_not_found' as const }
  }

  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(apiKey)}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, message: PAYMENT_SUCCESS_MESSAGE }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  })
  const body = await readResponse(response)
  const success = body === 1 || body === '1' || body === true || (
    Boolean(body) && typeof body === 'object' &&
    ((body as Record<string, unknown>).success === true || (body as Record<string, unknown>).result === 1)
  )

  if (!response.ok || !success) throw new Error(`SaleBot message send failed (${response.status})`)
  return { delivered: true as const }
}

