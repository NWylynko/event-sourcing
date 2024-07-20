import { z } from 'zod';

const updateAccountEvent = z.object({
  type: z.literal("update"),

  firstName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).max(255).optional(),
  username: z.string().min(1).max(255).optional(),
  dateOfBirth: z.string().min(1).max(255).optional(),
  address: z.string().min(1).max(255).optional(),
  city: z.string().min(1).max(255).optional(),
  state: z.string().min(1).max(255).optional(),
  zip: z.string().min(1).max(255).optional(),
  country: z.string().min(1).max(255).optional(),
})

const deleteAccountEvent = z.object({
  type: z.literal("delete"),
})

export const accountEvent = z.discriminatedUnion("type", [
  updateAccountEvent,
  deleteAccountEvent,
]);

type AccountEvent = z.infer<typeof accountEvent>;
type UpdateAccountEvent = z.infer<typeof updateAccountEvent>;
type DeleteAccountEvent = z.infer<typeof deleteAccountEvent>;

export const parseAccountEvent = (event: unknown) => {
  return accountEvent.parse(event);
}

export const createAccountUpdateEvent = (details: Omit<UpdateAccountEvent, "type">) => {
  return accountEvent.parse({ type: "update", ...details });
}

export const createAccountDeleteEvent = (details: Omit<DeleteAccountEvent, "type">) => {
  return accountEvent.parse({ type: "delete", ...details });
}