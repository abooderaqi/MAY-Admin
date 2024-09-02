import { getCollections } from "@/lib/actions/collectionActions"

import { DataTable } from "@/app/_components/custom ui/DataTable"
import { columns } from "@/app/_components/product/ProductColumn"
import { useCollection } from "@/app/(dashboard)/collections/useCollection"
import { useGetProducts } from "@/app/(dashboard)/products/useProducts"

const ProductList = () => {
  // const collections = await getCollections()
  const { products } = useGetProducts()
  if (!products?.length) return null
  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  )
}

export default ProductList
