"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Order = {
  id: string
  amount: number
  currency: string
  customer_id: string
  status: string
  createdAt: Date
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "customer_id",
    header: "Customer ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount")) / 100 // Amount is in cents
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.currency,
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      const formatted = date.toLocaleDateString("en-US")
      return <div>{formatted}</div>
    },
  },
]
