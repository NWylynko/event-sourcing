import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres("postgres://dev:dev@localhost:5432/app");

export const db = drizzle(queryClient);
