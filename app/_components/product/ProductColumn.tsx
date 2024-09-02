import { ColumnDef } from "@tanstack/react-table"
import Delete from "@/app/_components/custom ui/Delete"
import Link from "next/link"
import { ProductType } from "@/lib/type"

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original.id}`}
        className="hover:text-blue-500 font-bold "
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category,
  },
  {
    accessorKey: "collection",
    header: "Collection",
    cell: ({ row }) =>
      row.original.collection.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => row.original.price,
  },
  {
    accessorKey: "expense",
    header: "Expense",
    cell: ({ row }) => row.original.expense,
  },

  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original.id} item="product" />,
  },
]
