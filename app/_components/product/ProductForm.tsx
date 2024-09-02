"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/app/_components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Textarea } from "@/app/_components/ui/textarea"
import { Separator } from "../ui/separator"
import ImageUpload from "../custom ui/imageUpload"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
import Delete from "../custom ui/Delete"
import { createProduct, updateProduct } from "@/lib/actions/productAction"
import MultiText from "../custom ui/MultiText"
import MultiSelect from "../custom ui/MultiSelect"
import { useCollection } from "@/app/(dashboard)/collections/useCollection"
import { SignOutButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

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

interface ProductFormProps {
  initialData?: ProductType | null
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const { toast } = useToast()
  const { collection } = useCollection()
  const { user } = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          collection: initialData.collection.map(
            (collection: CollectionType) => collection.id
          ),
        }
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collection: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
        },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = initialData ? `/products/${initialData.id}` : "/products"
      if (url === "/products") await createProduct(values)
      else {
        await updateProduct(initialData?.id as string, values)
      }

      toast({
        title: "Product",
        description: `Product ${
          initialData ? "updated" : "created"
        } successfully`,
        variant: "default",
      })

      router.push("/products")
    } catch (err) {
      console.error(err)
      toast({
        title: "product error",
        description: `${err as string}`,
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {user?.organizationMemberships.at(0)?.role === "org:admin" ? (
        <div className="p-10">
          {initialData ? (
            <div className="flex items-center justify-between">
              <Delete id={initialData.id} item="product" />
              <p className="font-bold">Edit Product</p>
            </div>
          ) : (
            <p className="font-bold">Create Product</p>
          )}
          <Separator className="mt-4 mb-7 bg-gray-500" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="media"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={(url) =>
                          field.onChange([...field.value, url])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter((image) => image !== url),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:grid md:grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense 💲</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Expense" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <MultiText
                          placeholder="Tags"
                          value={field.value}
                          onChange={(tag) =>
                            field.onChange([...field.value, tag])
                          }
                          onRemove={(tagToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (tag) => tag !== tagToRemove
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {collection.length > 0 && (
                  <FormField
                    control={form.control}
                    name="collection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Collection</FormLabel>
                        <FormControl>
                          <MultiSelect
                            placeholder="Collection"
                            collection={collection}
                            value={field.value}
                            onChange={(id) =>
                              field.onChange([...field.value, id])
                            }
                            onRemove={(id) =>
                              field.onChange([
                                ...field.value.filter(
                                  (collectionId) => id !== collectionId
                                ),
                              ])
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colors</FormLabel>
                      <FormControl>
                        <MultiText
                          placeholder="Colors"
                          value={field.value}
                          onChange={(color) =>
                            field.onChange([...field.value, color])
                          }
                          onRemove={(colorToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (color) => color !== colorToRemove
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <FormControl>
                        <MultiText
                          placeholder="Sizes"
                          value={field.value}
                          onChange={(size) =>
                            field.onChange([...field.value, size])
                          }
                          onRemove={(sizeToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (size) => size !== sizeToRemove
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="bg-blue-500 text-white">
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() => router.push("/products")}
                  className="bg-blue-500 text-white"
                >
                  Discard
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-10 items-center justify-center h-screen">
          <p className="text-5xl font-bold text-center">
            You must be admin to view this
          </p>
          <Link
            href={"/sign-in"}
            className="border font-bold flex justify-center cursor-pointer underline"
          >
            <SignOutButton />
          </Link>
        </div>
      )}
    </>
  )
}

export default ProductForm
