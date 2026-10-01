import { bigint, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const workshopLeads = pgTable('workshop_leads', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  telegram: text('telegram').notNull(),
  consentAt: timestamp('consent_at', { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  source: text('source').notNull().default('masterclass'),
  checkoutKey: text('checkout_key'),
  yookassaPaymentId: text('yookassa_payment_id'),
  paymentStatus: text('payment_status'),
  paymentConfirmationUrl: text('payment_confirmation_url'),
  salebotNotificationStatus: text('salebot_notification_status'),
  salebotNotificationUpdatedAt: timestamp('salebot_notification_updated_at', { withTimezone: true }),
  salebotClientId: text('salebot_client_id'),
})

export type WorkshopLead = typeof workshopLeads.$inferSelect
export type NewWorkshopLead = typeof workshopLeads.$inferInsert
