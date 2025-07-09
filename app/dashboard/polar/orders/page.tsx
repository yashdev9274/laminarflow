import { Order, columns } from "./columns"
import { DataTable } from "@/app/dashboard/components/data-table"
import { auth } from "@/app/utils/auth"
import { db } from "@/app/utils/db"

async function getData(): Promise<Order[]> {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const userId = session.user.id

  const polarAccount = await db.polarAccount.findUnique({
    where: { userId },
  })

  if (!polarAccount) {
    return []
  }

  const orders = await db.polarOrder.findMany({
    where: {
      organizationId: polarAccount.organizationId,
    },
  })

  return orders
}

export default async function OrdersPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}