"use client"

import { DataTable } from "@/app/_components/custom ui/DataTable"
import { columns } from "@/app/_components/collections/CollectionColumns"
import { useCollection } from "@/app/(dashboard)/collections/useCollection"

const CollectionList = () => {
  const { collection } = useCollection()
  if (!collection?.length) return null
  return (
    <div>
      <DataTable columns={columns} data={collection} />
    </div>
  )
}

export default CollectionList
