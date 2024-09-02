type CollectionType = {
  id: string
  title: string
  description: string
  image: string
  products: ProductType[]
  updatedAt: Date
  createdAt: Date
}

type ProductType = {
  id: string
  title: string
  description: string
  media: [string]
  category: string
  collection: [CollectionType]
  tags: [string]
  sizes: [string]
  colors: [string]
  price: number
  expense: number
  createdAt: Date
  updatedAt: Date
}
