import { date, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const Budgets = pgTable('budgets', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  amount: varchar('amount').notNull(),
  icon: varchar('icon'),
  createdBy:varchar('createdBy').notNull(),
});

export const Expenses=pgTable('expenses',{
  id:serial('id').primaryKey(),
  name:varchar('name').notNull(),
  amount:integer('amount').notNull(),
  budgetId:integer('budgetId').references(()=>Budgets.id),
  createdAt:date('createdAt'),
})



// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
