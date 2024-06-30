import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
  schema: "./app/utils/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://Expense-Tracker_owner:zSHWnivQjr90@ep-raspy-violet-a4dln9bx.us-east-1.aws.neon.tech/Expense-Tracker?sslmode=require',
  },
});
