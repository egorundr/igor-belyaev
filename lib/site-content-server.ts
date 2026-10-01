import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { siteSettings, siteSettingsKeys } from '@/lib/db/schema'
import {
  defaultAnalyticsSettings,
  defaultSiteContent,
  mergeContent,
  type AnalyticsSettings,
  type SiteContent,
} from '@/lib/site-content'

async function readSetting(key: string) {
  if (!process.env.DATABASE_URL) return null
  const [setting] = await getDb()
    .select({ value: siteSettings.value })
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1)
  return setting?.value ?? null
}

export async function getSiteContent(): Promise<SiteContent> {
  return mergeContent(await readSetting(siteSettingsKeys.content), defaultSiteContent)
}

export async function getAnalyticsSettings(): Promise<AnalyticsSettings> {
  return mergeContent(await readSetting(siteSettingsKeys.analytics), defaultAnalyticsSettings)
}

export async function getMasterclassPrice() {
  const content = await getSiteContent()
  const priceText = content.workshop.price.trim()
  if (!/^(?:\d[\d\s]*)(?:\s*(?:₽|руб(?:лей|ля|ль)?))?$/i.test(priceText)) return 9990
  const price = Number(priceText.replace(/\D/g, ''))
  return Number.isSafeInteger(price) && price >= 1 && price <= 1_000_000 ? price : 9990
}

export function isValidAnalyticsSettings(value: unknown): value is AnalyticsSettings {
  if (!value || typeof value !== 'object') return false
  const settings = value as Record<string, unknown>
  return (['yandex', 'vk'] as const).every((provider) => {
    const config = settings[provider]
    if (!config || typeof config !== 'object') return false
    const item = config as Record<string, unknown>
    return typeof item.enabled === 'boolean'
      && typeof item.id === 'string'
      && item.id.length <= 32
      && (!item.enabled || /^\d{1,20}$/.test(item.id))
  })
}

export function isValidSiteContent(value: unknown): value is SiteContent {
  return mergeContent(value, defaultSiteContent) === value
}

export { defaultAnalyticsSettings, defaultSiteContent }
export type { AnalyticsSettings, SiteContent }
