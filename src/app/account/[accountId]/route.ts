import { asc, desc, eq } from "drizzle-orm";
import { db } from "../../../database/client";
import { accounts } from "../../../database/schema";
import { createAccountDeleteEvent, createAccountUpdateEvent, parseAccountEvent } from "../../../events/accounts";

export const GET = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  const accountId = url.pathname.split('/')[2];

  const account = new Map<string, any>([
    ['accountId', accountId]
  ]);

  const history = await db
    .select()
    .from(accounts)
    .where(eq(accounts.accountId, accountId))
    .orderBy(asc(accounts.timestamp))

  // account.set('history', history);

  for (const entry of history) {
    const event = parseAccountEvent(entry.event);

    switch (event.type) {
      case 'update':
        event.firstName && account.set('firstName', event.firstName);
        event.lastName && account.set('lastName', event.lastName);
        event.email && account.set('email', event.email);
        event.phone && account.set('phone', event.phone);
        event.username && account.set('username', event.username);
        event.dateOfBirth && account.set('dateOfBirth', event.dateOfBirth);
        event.address && account.set('address', event.address);
        event.city && account.set('city', event.city);
        event.state && account.set('state', event.state);
        event.zip && account.set('zip', event.zip);
        event.country && account.set('country', event.country);
        break;
      case 'delete':
        account.delete('firstName');
        account.delete('lastName');
        account.delete('email');
        account.delete('phone');
        account.delete('username');
        account.delete('dateOfBirth');
        account.delete('address');
        account.delete('city');
        account.delete('state');
        account.delete('zip');
        account.delete('country');
        break;
      default:
        // @ts-expect-error - This should never happen
        throw new Error(`Unknown event type: ${event.type}`);
    }
  }

  return new Response(JSON.stringify(
    Object.fromEntries(account)
  ));

}

export const PUT = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  const accountId = url.pathname.split('/')[2];

  const body = await request.json();

  const event = createAccountUpdateEvent({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
    username: undefined,
    dateOfBirth: undefined,
    address: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
    country: undefined,
    ...body
  });

  await db
    .insert(accounts)
    .values({
      accountId,
      event,
      timestamp: new Date().toISOString()
    })

  return new Response(JSON.stringify({ ...body, accountId }))
}

export const PATCH = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  const accountId = url.pathname.split('/')[2];

  const body = await request.json();

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

export const DELETE = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  const accountId = url.pathname.split('/')[2];

  const event = createAccountDeleteEvent({});

  await db
    .insert(accounts)
    .values({
      accountId,
      event,
      timestamp: new Date().toISOString()
    })

  return new Response(JSON.stringify({ accountId }))
}
