import { index, integer, json, pgEnum, pgTable, serial, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  accountId: uuid('account_uuid'),

  event: json('event').notNull(),

  timestamp: timestamp('timestamp', { mode: "string" }).notNull(),
}, (table) => {
  return {
    accountIndex: index('account_idx').on(table.accountId),
  }
});
