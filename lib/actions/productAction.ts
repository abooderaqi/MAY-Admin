"use server"

import { db } from "@/db"
import { auth } from "@clerk/nextjs/server"
import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collection: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
})

export const createProduct = async (values: z.infer<typeof formSchema>) => {
  try {
    const { userId } = await auth()
    const {
      title,
      description,
      media,
      category,
      collection,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await values

    if (!title || !description || !media || !category || !price || !expense)
      throw new Error("Not enough data to create product")

    if (!userId) throw new Error("UnauthorizedUser")

    const newProduct = await db?.product?.create({
      data: {
        title,
        description,
        media,
        category,
        collection: {
          connect: collection.map((id) => ({
            id: id,
          })),
        },
        tags,
        sizes,
        colors,
        price,
        expense,
      },
    })
    return newProduct
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: {
        collection: true,
      },
    })
    return products
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error("UnauthorizedUser")

    await db.product.delete({
      where: {
        id: productId,
      },
    })
    return "Product deleted successfully"
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getProductById = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        collection: true,
      },
    })

    if (!product) throw new Error("Product not found")

    return product
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateProduct = async (
  productId: string,
  values: z.infer<typeof formSchema>
) => {
  try {
    const { userId } = await auth()
    const {
      title,
      description,
      media,
      category,
      collection,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await values

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        collection: true,
      },
    })
    if (!product) throw new Error("Product not found")

    if (!userId) throw new Error("UnauthorizedUser")
    if (!title || !description || !media || !category) {
      throw new Error("Not enough data to update product")
    }

    const updatedProduct = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        title,
        description,
        media,
        category,
        collection: {
          set: [],
          connect: collection.map((id) => ({
            id: id,
          })),
        },
        tags,
        sizes,
        colors,
        price,
        expense,
      },
      include: {
        collection: true,
      },
    })
    return updatedProduct
  } catch (err) {
    console.log(err)
    throw err
  }
}
