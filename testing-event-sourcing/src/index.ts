import assert from "assert"

type Account = {
  accountId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  username?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

async function createAccount(details: Omit<Account, "accountId">) {
  const response = await fetch(
    "http://localhost:3000/account",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    }
  )

  const account = await response.json() as Account

  console.log(`Account created with ID: ${account.accountId}`)

  return account
}

async function updateAccount(accountId: string, account: Omit<Account, "accountId">) {
  await fetch(
    `http://localhost:3000/account/${accountId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }
  )

  console.log(`Account updated with ID: ${accountId}`)
}

async function updateAccountDetail(accountId: string, account: Partial<Omit<Account, "accountId">>) {
  await fetch(
    `http://localhost:3000/account/${accountId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }
  )

  console.log(`Account detail updated with ID: ${accountId}`)
}

async function deleteAccount(accountId: string) {
  await fetch(
    `http://localhost:3000/account/${accountId}`,
    {
      method: "DELETE",
    }
  )

  console.log(`Account deleted with ID: ${accountId}`)
}

async function viewAccount(accountId: string) {
  const response = await fetch(
    `http://localhost:3000/account/${accountId}`,
    {
      method: "GET",
    }
  )

  const account = await response.json() as Account

  console.log(`Fetched Account ID: ${account.accountId}`)

  return account
}

const test = async () => {

  const { accountId } = await createAccount({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com"
  })

  const account1 = await viewAccount(accountId)

  console.log(account1)

  assert(account1.accountId === accountId)
  assert(account1.firstName === "John")
  assert(account1.lastName === "Doe")
  assert(account1.email === "john.doe@email.com")

  await updateAccount(accountId, {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@email.com"
  })

  const account2 = await viewAccount(accountId)

  console.log(account2)

  assert(account2.accountId === accountId)
  assert(account2.firstName === "Jane")
  assert(account2.lastName === "Doe")
  assert(account2.email === "jane.doe@email.com")

  await updateAccountDetail(accountId, {
    phone: "1234567890",
    address: "123 Main St",
    city: "Springfield",
  })

  const account3 = await viewAccount(accountId)

  console.log(account3)

  assert(account3.accountId === accountId)
  assert(account3.firstName === "Jane")
  assert(account3.lastName === "Doe")
  assert(account3.email === "jane.doe@email.com")
  assert(account3.phone === "1234567890")
  assert(account3.address === "123 Main St")
  assert(account3.city === "Springfield")

  await deleteAccount(accountId)

  const account4 = await viewAccount(accountId)

  console.log(account4)

  assert(account4.accountId === accountId)
  assert(account4.firstName === undefined)
  assert(account4.lastName === undefined)
  assert(account4.email === undefined)

}

test()