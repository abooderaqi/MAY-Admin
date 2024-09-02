import { ColumnDef } from "@tanstack/react-table"
import Delete from "@/app/_components/custom ui/Delete"
import Link from "next/link"
import { CollectionType } from "@/lib/type"

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original.id}`}
        className="hover:text-blue-500 font-bold "
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => (
      <p className="text-[#000]">{row.original.products?.length}</p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original.id} />,
  },
]
