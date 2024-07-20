import { asc, eq } from "drizzle-orm";
import { db } from "../../../../database/client";
import { accounts } from "../../../../database/schema";

export const GET = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  const accountId = url.pathname.split('/')[2];

  const history = await db
    .select()
    .from(accounts)
    .where(eq(accounts.accountId, accountId))
    .orderBy(asc(accounts.timestamp))

  return new Response(JSON.stringify({ accountId, history }));

}