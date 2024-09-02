import ProductForm from "@/app/_components/product/ProductForm"
import { getProductById } from "@/lib/actions/productAction"
import { Suspense } from "react"

const CollectionDetails = async ({
  params,
  searchParams,
}: {
  params: { productId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const product = await getProductById(params.productId)
  console.log(product)
  return (
    <Suspense>
      <ProductForm initialData={product} />
    </Suspense>
  )
}

export default CollectionDetails
