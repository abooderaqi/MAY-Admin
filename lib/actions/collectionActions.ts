"use server"

import { db } from "@/db"
import { auth } from "@clerk/nextjs/server"

import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
})

export const createCollection = async (values: z.infer<typeof formSchema>) => {
  try {
    const { userId } = await auth()
    const { title, description, image } = await values
    const existingCollection = await db?.collection?.findFirst({
      where: {
        title,
      },
    })
    if (!userId) throw new Error("UnauthorizedUser")
    if (existingCollection) throw new Error("CollectionAlreadyExists")
    if (!title || !image) throw new Error("Title and image required")

    const newCollection = await prisma?.collection?.create({
      data: {
        title,
        description,
        image,
      },
    })

    return newCollection
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getCollections = async () => {
  try {
    const collections = await db.collection.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: {
        products: true,
      },
    })
    return collections
  } catch (error) {
    console.log(error)
  }
}

export const deleteCollection = async (collectionId: string) => {
  try {
    const { userId } = await auth()

    if (!userId) throw new Error("UnauthorizedUser")

    await db.collection.delete({
      where: {
        id: collectionId,
      },
      include: {
        products: true,
      },
    })
    return "Collection deleted successfully"
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getCollectionById = async (collectionId: string) => {
  try {
    const collection = await db.collection.findUnique({
      where: {
        id: collectionId,
      },
      include: {
        products: true,
      },
    })
    if (!collection) throw new Error("Collection not found")

    return collection
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateCollection = async (
  collectionId: string,
  values: z.infer<typeof formSchema>
) => {
  try {
    const { userId } = await auth()
    const { title, description, image } = await values
    if (!userId) throw new Error("UnauthorizedUser")
    if (!title || !image) throw new Error("Title and image required")
    let updatedCollection = await db.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        title,
        description,
        image,
      },
    })

    return updatedCollection
  } catch (err) {
    console.log(err)
    throw err
  }
}
