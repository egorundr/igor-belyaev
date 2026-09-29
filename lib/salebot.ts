const API_BASE_URL = 'https://chatter.salebot.pro/api'
const PAYMENT_SUCCESS_CALLBACK = 'SUCCESS_PAY'

function getApiKey() {
  const apiKey = process.env.SALEBOT_API_KEY?.trim()
  if (!apiKey || apiKey.length > 512 || /[\r\n]/.test(apiKey)) {
    throw new Error('SaleBot API is not configured')
  }
  return apiKey
}

export async function sendSaleBotPaymentSuccess(clientId?: string | null) {
  if (!clientId || !/^\d{1,20}$/.test(clientId)) {
    return { delivered: false as const, reason: 'client_id_missing' as const }
  }

  const apiKey = getApiKey()
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(apiKey)}/callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, message: PAYMENT_SUCCESS_CALLBACK }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  })
  const responseText = await response.text()
  let body: unknown = responseText
  try {
    body = responseText ? JSON.parse(responseText) as unknown : null
  } catch {
    // SaleBot may return a plain-text success response.
  }

  if (!response.ok || (body && typeof body === 'object' && (body as Record<string, unknown>).success === false)) {
    throw new Error(`SaleBot callback failed (${response.status})`)
  }
  return { delivered: true as const }
}

