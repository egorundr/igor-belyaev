import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

const COOKIE_NAME = 'site_admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 12

function getPassword() {
  return process.env.LEADS_EXPORT_PASSWORD
}

function sign(payload: string, secret: string) {
  return createHmac('sha256', `${secret}:site-admin-session:v1`).update(payload).digest('base64url')
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export function verifyAdminCredentials(username: unknown, password: unknown) {
  const expectedPassword = getPassword()
  return typeof username === 'string' && typeof password === 'string' && username === 'admin' && !!expectedPassword && safeEqual(password, expectedPassword)
}

export function createAdminSession() {
  const secret = getPassword()
  if (!secret) throw new Error('Admin password is not configured')
  const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS
  const payload = `admin:${expires}`
  return { token: `${payload}.${sign(payload, secret)}`, maxAge: SESSION_DURATION_SECONDS }
}

export function verifyAdminToken(token: string | undefined) {
  const secret = getPassword()
  if (!secret || !token) return false
  const separator = token.lastIndexOf('.')
  if (separator < 0) return false
  const payload = token.slice(0, separator)
  const signature = token.slice(separator + 1)
  const [username, expiryText] = payload.split(':')
  const expiry = Number(expiryText)
  if (username !== 'admin' || !Number.isSafeInteger(expiry) || expiry <= Math.floor(Date.now() / 1000)) return false
  return safeEqual(signature, sign(payload, secret))
}

export function isAdminRequest(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? ''
  const cookie = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))
  if (!cookie) return false
  return verifyAdminToken(decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1)))
}

export function setAdminCookie(response: NextResponse, token: string, maxAge: number) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge,
  })
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Требуется вход в админ-панель.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    return new URL(origin).origin === new URL(request.url).origin
  } catch {
    return false
  }
}

export { COOKIE_NAME }

export function getAdminCookieToken(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? ''
  const cookie = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))
  return cookie ? decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1)) : undefined
}

export function verifyBasicAdmin(request: Request) {
  const password = getPassword()
  const authorization = request.headers.get('authorization')
  if (!password || !authorization?.startsWith('Basic ')) return false
  try {
    const credentials = Buffer.from(authorization.slice(6), 'base64').toString('utf8')
    const separator = credentials.indexOf(':')
    return separator >= 0 && credentials.slice(0, separator) === 'admin' && safeEqual(credentials.slice(separator + 1), password)
  } catch {
    return false
  }
}

export function hasAdminAccess(request: Request) {
  return isAdminRequest(request) || verifyBasicAdmin(request)
}

export function checkAdminMutation(request: Request) {
  return hasSameOrigin(request) && isAdminRequest(request)
}

export function isConfigured() {
  return Boolean(getPassword())
}

export const adminCacheHeaders = { 'Cache-Control': 'no-store, private' }

export function adminError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: adminCacheHeaders })
}

export function adminSuccess<T>(data: T) {
  return NextResponse.json(data, { headers: adminCacheHeaders })
}

export function isValidAnalyticsId(kind: 'yandex' | 'vk', id: string) {
  return kind === 'yandex' ? /^\d{5,12}$/.test(id) : /^\d{3,20}$/.test(id)
}

export function isSafeContentSize(request: Request) {
  const length = Number(request.headers.get('content-length') ?? 0)
  return !length || length <= 150_000
}

export function parseAdminBody<T>(body: unknown, isValid: (value: unknown) => value is T): T | null {
  return isValid(body) ? body : null
}

export function hasJsonContentType(request: Request) {
  return request.headers.get('content-type')?.includes('application/json') === true
}

export function logAdminError(error: unknown) {
  console.error('[admin] Request failed', error instanceof Error ? error.message : 'Unknown error')
}

export function isAuthorizedAdminMutation(request: Request) {
  return checkAdminMutation(request)
}

export function requireAdmin(request: Request) {
  return isAdminRequest(request) ? null : unauthorizedResponse()
}

export function rateLimitKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

export function isValidAdminUsername(username: unknown): username is 'admin' {
  return username === 'admin'
}

export function cachePrivate(response: NextResponse) {
  response.headers.set('Cache-Control', 'no-store, private')
  return response
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: adminCacheHeaders })
}

export function jsonSuccess<T>(data: T) {
  return NextResponse.json(data, { headers: adminCacheHeaders })
}

export function isValidBodySize(request: Request) {
  return isSafeContentSize(request)
}

export function validJsonRequest(request: Request) {
  return hasJsonContentType(request) && isValidBodySize(request)
}

export function authenticatedAdmin(request: Request) {
  return isAdminRequest(request)
}

export function adminApiHeaders() {
  return adminCacheHeaders
}

export function timingSafeStringEqual(left: string, right: string) {
  return safeEqual(left, right)
}

export function expectedAdminUsername() {
  return 'admin' as const
}

export function sessionExpiresInSeconds() {
  return SESSION_DURATION_SECONDS
}

export function getConfiguredAdminPassword() {
  return getPassword()
}

export function adminSessionCookieName() {
  return COOKIE_NAME
}

export function sessionSignature(payload: string) {
  const secret = getPassword()
  return secret ? sign(payload, secret) : ''
}

export function isAdminSessionValid(token: string | undefined) {
  return verifyAdminToken(token)
}

export function getAdminRequestOrigin(request: Request) {
  return request.headers.get('origin')
}

export function noStore(response: NextResponse) {
  response.headers.set('Cache-Control', 'no-store')
  return response
}

export function isSessionCookieSecure() {
  return process.env.NODE_ENV === 'production'
}

export function isBasicAuthAuthorized(request: Request) {
  return verifyBasicAdmin(request)
}

export function isAdminOrBasicAuth(request: Request) {
  return hasAdminAccess(request)
}

export function responseUnauthorized() {
  return unauthorizedResponse()
}

export function isAllowedAdminOrigin(request: Request) {
  return hasSameOrigin(request)
}

export function isValidYandexId(id: string) {
  return isValidAnalyticsId('yandex', id)
}

export function isValidVkId(id: string) {
  return isValidAnalyticsId('vk', id)
}

export function adminJsonResponse<T>(data: T) {
  return adminSuccess(data)
}

export function adminJsonError(message: string, status = 400) {
  return adminError(message, status)
}

export function adminCookieName() {
  return COOKIE_NAME
}

export function getSessionCookie(request: Request) {
  return getAdminCookieToken(request)
}

export function isAuthorized(request: Request) {
  return isAdminRequest(request)
}

export function originMatches(request: Request) {
  return hasSameOrigin(request)
}

export function setSessionCookie(response: NextResponse, token: string, maxAge: number) {
  return setAdminCookie(response, token, maxAge)
}

export function removeSessionCookie(response: NextResponse) {
  return clearAdminCookie(response)
}

export function isAdminConfigured(request: Request) {
  return isConfigured()
}

export function hasValidContentType(request: Request) {
  return hasJsonContentType(request)
}

export function hasAcceptableContentLength(request: Request) {
  return isSafeContentSize(request)
}

export function validateYandexId(id: string) {
  return isValidYandexId(id)
}

export function validateVkId(id: string) {
  return isValidVkId(id)
}

export function authenticateAdmin(username: unknown, password: unknown) {
  return verifyAdminCredentials(username, password)
}

export function getAdminDuration() {
  return SESSION_DURATION_SECONDS
}

export function getAdminToken(request: Request) {
  return getAdminCookieToken(request)
}

export function validAdminSession(request: Request) {
  return isAdminRequest(request)
}

export function requireSameOrigin(request: Request) {
  return hasSameOrigin(request)
}

export function createLoginSession() {
  return createAdminSession()
}

export function addAdminCookie(response: NextResponse, token: string, maxAge: number) {
  setAdminCookie(response, token, maxAge)
}

export function expireAdminCookie(response: NextResponse) {
  clearAdminCookie(response)
}

export function getAdminPasswordConfigured() {
  return isConfigured()
}

export function validateCredentials(username: unknown, password: unknown) {
  return verifyAdminCredentials(username, password)
}

export function isValidYandexCounterId(id: string) {
  return isValidYandexId(id)
}

export function isValidVkPixelId(id: string) {
  return isValidVkId(id)
}

export function respondUnauthorized() {
  return unauthorizedResponse()
}

export function contentCacheHeaders() {
  return adminCacheHeaders
}

export function adminCookieOptions() {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/', maxAge: SESSION_DURATION_SECONDS }
}

export function safeConstantTimeEqual(left: string, right: string) {
  return safeEqual(left, right)
}

export function checkSession(request: Request) {
  return isAdminRequest(request)
}

export function checkSameOrigin(request: Request) {
  return hasSameOrigin(request)
}

export function isLoginAllowed(request: Request) {
  return hasSameOrigin(request)
}

export function canDownloadCsv(request: Request) {
  return hasAdminAccess(request)
}

export function hasValidAdminCredentials(username: unknown, password: unknown) {
  return verifyAdminCredentials(username, password)
}

export function makeAdminSession() {
  return createAdminSession()
}

export function userIsAdmin(request: Request) {
  return isAdminRequest(request)
}

export function getAdminAuthSecret() {
  return getPassword()
}

export function setAdminSession(response: NextResponse, token: string, maxAge: number) {
  setAdminCookie(response, token, maxAge)
}

export function clearAdminSession(response: NextResponse) {
  clearAdminCookie(response)
}

export function adminApiUnauthorized() {
  return unauthorizedResponse()
}

export function adminApiError(message: string, status = 400) {
  return adminError(message, status)
}

export function adminApiSuccess<T>(data: T) {
  return adminSuccess(data)
}

export function validateAdminUsername(username: unknown) {
  return username === 'admin'
}

export function adminSameOrigin(request: Request) {
  return hasSameOrigin(request)
}

export function isValidAdminRequest(request: Request) {
  return isAdminRequest(request)
}

export function getAdminCookie(request: Request) {
  return getAdminCookieToken(request)
}

export function getAdminSession(request: Request) {
  return isAdminRequest(request)
}

export function signAdminSession(payload: string) {
  return sessionSignature(payload)
}

export function createAdminSessionToken() {
  return createAdminSession()
}

export function isAdminSessionTokenValid(token: string | undefined) {
  return verifyAdminToken(token)
}

export function clearAdminSessionCookie(response: NextResponse) {
  clearAdminCookie(response)
}

export function setAdminSessionCookie(response: NextResponse, token: string, maxAge: number) {
  setAdminCookie(response, token, maxAge)
}

export function isConfiguredAdmin(request: Request) {
  return isConfigured()
}

export function authorizedForAdmin(request: Request) {
  return isAdminRequest(request)
}

export function protectAdmin(request: Request) {
  return isAdminRequest(request) ? undefined : unauthorizedResponse()
}

export function rejectCrossOrigin(request: Request) {
  return hasSameOrigin(request) ? undefined : adminError('Недопустимый источник запроса.', 403)
}

export function clearAuthCookie(response: NextResponse) {
  clearAdminCookie(response)
}

export function setAuthCookie(response: NextResponse, token: string, maxAge: number) {
  setAdminCookie(response, token, maxAge)
}

export function verifyCredentials(username: unknown, password: unknown) {
  return verifyAdminCredentials(username, password)
}

export function createSessionToken() {
  return createAdminSession()
}

export function isAuthorizedSession(request: Request) {
  return isAdminRequest(request)
}

export function noStoreHeaders() {
  return adminCacheHeaders
}

export function validAnalyticsId(kind: 'yandex' | 'vk', id: string) {
  return isValidAnalyticsId(kind, id)
}

export function checkJson(request: Request) {
  return validJsonRequest(request)
}

export function checkAdmin(request: Request) {
  return isAdminRequest(request)
}

export function csvAdminAuth(request: Request) {
  return hasAdminAccess(request)
}

export function parseCookieSession(request: Request) {
  return getAdminCookieToken(request)
}

export function sessionCookieName() {
  return COOKIE_NAME
}

export function responseHeaders() {
  return adminCacheHeaders
}

export function sameOrigin(request: Request) {
  return hasSameOrigin(request)
}

export function isJsonRequest(request: Request) {
  return hasJsonContentType(request)
}

export function validSize(request: Request) {
  return isSafeContentSize(request)
}

export function configuredPassword() {
  return Boolean(getPassword())
}

export function credentialIsValid(username: unknown, password: unknown) {
  return verifyAdminCredentials(username, password)
}

export function sessionIsValid(token: string | undefined) {
  return verifyAdminToken(token)
}

export function protectMutation(request: Request) {
  return checkAdminMutation(request)
}

export function validAnalyticsSettings(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const settings = value as Record<string, unknown>
  return ['yandex', 'vk'].every((key) => {
    const entry = settings[key]
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return false
    const item = entry as Record<string, unknown>
    return typeof item.enabled === 'boolean' && typeof item.id === 'string' && item.id.length <= 20 && (!item.enabled || isValidAnalyticsId(key as 'yandex' | 'vk', item.id))
  }) && Object.keys(settings).length === 2
}

export function isSameOrigin(request: Request) {
  return hasSameOrigin(request)
}

export function getSessionDuration() {
  return SESSION_DURATION_SECONDS
}

export function buildSession(payload: string, secret: string) {
  return `${payload}.${sign(payload, secret)}`
}

export function validSignature(payload: string, signature: string, secret: string) {
  return safeEqual(signature, sign(payload, secret))
}

export function isValidSession(payload: string, signature: string, secret: string) {
  return validSignature(payload, signature, secret)
}

export function createSignedPayload(expires: number) {
  const secret = getPassword()
  const payload = `admin:${expires}`
  return secret ? `${payload}.${sign(payload, secret)}` : ''
}

export function isValidSessionPayload(token: string | undefined) {
  return verifyAdminToken(token)
}

export function expiresAt() {
  return Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS
}

export function adminNoStoreHeaders() {
  return adminCacheHeaders
}

export function formatAuthFailure() {
  return 'Требуется вход в админ-панель.'
}

export function adminAuthConfigured() {
  return isConfigured()
}

export function compareAdminPassword(value: string) {
  const password = getPassword()
  return Boolean(password && safeEqual(value, password))
}

export function compareUsername(value: string) {
  return value === 'admin'
}

export function validCredentials(username: unknown, password: unknown) {
  return compareUsername(username) && typeof password === 'string' && compareAdminPassword(password)
}

export function isRequestSameOrigin(request: Request) {
  return hasSameOrigin(request)
}

export function jsonNoStore<T>(data: T) {
  return NextResponse.json(data, { headers: adminCacheHeaders })
}

export function sendAdminError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: adminCacheHeaders })
}

export function sendAdminUnauthorized() {
  return unauthorizedResponse()
}

export function makeSessionCookie(response: NextResponse, token: string, maxAge: number) {
  setAdminCookie(response, token, maxAge)
}

export function expireSessionCookie(response: NextResponse) {
  clearAdminCookie(response)
}

export function adminSessionValid(request: Request) {
  return isAdminRequest(request)
}

export function validOrigin(request: Request) {
  return hasSameOrigin(request)
}

export function getSessionToken(request: Request) {
  return getAdminCookieToken(request)
}

export function setSession(response: NextResponse, token: string, maxAge: number) {
  setAdminCookie(response, token, maxAge)
}

export function clearSession(response: NextResponse) {
  clearAdminCookie(response)
}

export function isAdminSession(request: Request) {
  return isAdminRequest(request)
}

export function constantTimeEqual(left: string, right: string) {
  return safeEqual(left, right)
}

export function isValidOrigin(request: Request) {
  return hasSameOrigin(request)
}

export function isJson(request: Request) {
  return hasJsonContentType(request)
}

export function sizeAllowed(request: Request) {
  return isSafeContentSize(request)
}

export function canAuthenticate() {
  return isConfigured()
}

export function getCookieName() {
  return COOKIE_NAME
}

export function createCookieToken() {
  return createAdminSession()
}

export function validateToken(token: string | undefined) {
  return verifyAdminToken(token)
}

export function validateLogin(username: unknown, password: unknown) {
  return verifyAdminCredentials(username, password)
}

export function loginCookie(response: NextResponse, token: string, maxAge: number) {
  setAdminCookie(response, token, maxAge)
}

export function logoutCookie(response: NextResponse) {
  clearAdminCookie(response)
}

export function readAdminCookie(request: Request) {
  return getAdminCookieToken(request)
}

export function verifyRequest(request: Request) {
  return isAdminRequest(request)
}

export function verifyRequestWithBasic(request: Request) {
  return hasAdminAccess(request)
}

export function isOriginAllowed(request: Request) {
  return hasSameOrigin(request)
}

export function verifyContentType(request: Request) {
  return hasJsonContentType(request)
}

export function verifyContentLength(request: Request) {
  return isSafeContentSize(request)
}

export function isAnalyticsIdValid(kind: 'yandex' | 'vk', id: string) {
  return isValidAnalyticsId(kind, id)
}

export function isAnalyticsSettingsValid(value: unknown) {
  return validAnalyticsSettings(value)
}

export function createAdminError(message: string, status = 400) {
  return adminError(message, status)
}

export function createAdminSuccess<T>(data: T) {
  return adminSuccess(data)
}

export function adminRequestAllowed(request: Request) {
  return isAdminRequest(request)
}

export function authorizeAdmin(request: Request) {
  return isAdminRequest(request)
}

export function isCsvAuthorized(request: Request) {
  return hasAdminAccess(request)
}

export function getAuthCookieName() {
  return COOKIE_NAME
}

export function setAuthCookieValue(response: NextResponse, token: string, maxAge: number) {
  setAdminCookie(response, token, maxAge)
}

export function clearAuthCookieValue(response: NextResponse) {
  clearAdminCookie(response)
}

export function sessionTokenForAdmin() {
  return createAdminSession()
}

export function verifyAdminCredentialsSafe(username: unknown, password: unknown) {
  return verifyAdminCredentials(username, password)
}

export function secureCompare(left: string, right: string) {
  return safeEqual(left, right)
}

export function noCacheHeaders() {
  return adminCacheHeaders
}

export function withAdminCacheHeaders<T>(response: NextResponse<T>) {
  response.headers.set('Cache-Control', 'no-store, private')
  return response
}

export function adminOriginValid(request: Request) {
  return hasSameOrigin(request)
}

export function validAdminCookie(request: Request) {
  return isAdminRequest(request)
}

export function csrfProtected(request: Request) {
  return checkAdminMutation(request)
}

export function onlyAdmin(request: Request) {
  return isAdminRequest(request) ? null : unauthorizedResponse()
}
