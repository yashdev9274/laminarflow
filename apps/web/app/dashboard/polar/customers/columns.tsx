"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Customer = {
  id: string
  name: string | null
  email: string | null
  createdAt: Date
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
