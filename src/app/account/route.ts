import { db } from "../../database/client";
import { accounts } from "../../database/schema";
import { createAccountUpdateEvent } from "../../events/accounts";

export const POST = async (request: Request): Promise<Response> => {

  const body = await request.json();

  const accountId = crypto.randomUUID()

  const event = createAccountUpdateEvent(body);

  await db
    .insert(accounts)
    .values({
      accountId,
      event,
      timestamp: new Date().toISOString()
    })

  return new Response(JSON.stringify({ ...body, accountId }))
}