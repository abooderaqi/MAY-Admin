import CollectionForm from "@/app/_components/collections/CollectionForm"
import { getCollectionById } from "@/lib/actions/collectionActions"

const CollectionDetails = async ({
  params,
  searchParams,
}: {
  params: { collectionId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const collection = await getCollectionById(params.collectionId)

  return <CollectionForm initialData={collection} />
}

export default CollectionDetails
