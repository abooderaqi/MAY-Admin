import { CollectionType } from "@/lib/type"
import { getCollections } from "@/lib/actions/collectionActions"
import { useQuery } from "@tanstack/react-query"

export const useCollection = () => {
  const {
    data: collection,
    error,
    status,
  } = useQuery({
    queryKey: ["collection"],
    queryFn: () => getCollections(),
    initialData: [],
  })
  return { collection, error, status }
}
