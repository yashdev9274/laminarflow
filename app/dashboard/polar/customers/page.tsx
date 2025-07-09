import { Customer, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { auth } from "@/app/utils/auth"
import { prisma } from "@/app/utils/db"
import CreateButton from "@/app/components/createButton"

async function getData(): Promise<{customers: Customer[], polarAccount: any}> {
  const session = await auth()
  if (!session?.user?.id) {
    return {customers: [], polarAccount: null}
  }

  const userId = session.user.id

  const polarAccount = await prisma.polarAccount.findUnique({
    where: { userId },
  })

  if (!polarAccount) {
    return {customers: [], polarAccount: null}
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/polar/customers`);
  const data = await res.json()

  if (data.items) {
    for (const customer of data.items) {
      await prisma.polarCustomer.upsert({
        where: { id: customer.id },
        update: {
          name: customer.name,
          email: customer.email,
        },
        create: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          organizationId: polarAccount.organizationId,
        },
      })
    }
  }

  const customers = await prisma.polarCustomer.findMany({
    where: {
      organizationId: polarAccount.organizationId,
    },
  })

  return {customers, polarAccount}
}

export default async function CustomersPage() {
  const {customers, polarAccount} = await getData()

  return (
    <div className="ml-7">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Polar Customers for {polarAccount?.organizationName}</h1>
          {/* <CreateButton href="/dashboard/polar/customers/new">Create New Customer</CreateButton> */}
        </div>
        <DataTable columns={columns} data={customers} />
      </div>
    </div>
  )
}