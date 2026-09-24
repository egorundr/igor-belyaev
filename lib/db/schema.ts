import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const workshopLeads = pgTable('workshop_leads', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  telegram: text('telegram').notNull(),
  consentAt: timestamp('consent_at', { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  source: text('source').notNull().default('masterclass'),
})

export type WorkshopLead = typeof workshopLeads.$inferSelect
export type NewWorkshopLead = typeof workshopLeads.$inferInsert
