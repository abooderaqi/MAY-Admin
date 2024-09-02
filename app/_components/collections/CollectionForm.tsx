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
import {
  createCollection,
  updateCollection,
} from "@/lib/actions/collectionActions"
import { useToast } from "../ui/use-toast"
import Delete from "../custom ui/Delete"
import { SignOutButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
})

interface CollectionFormProps {
  initialData?: CollectionType | null
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const { toast } = useToast()
  const { user } = useUser()

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(initialData)
    try {
      const url = initialData ? `/collection/${initialData.id}` : "/collections"
      if (url === "/collections") await createCollection(values)
      else {
        await updateCollection(initialData?.id as string, values)
      }

      toast({
        title: "collection",
        description: `Collection ${
          initialData ? "updated" : "created"
        } successfully`,
        variant: "default",
      })
      router.push("/collections")
    } catch (err) {
      console.error(err)
      toast({
        title: "collection error",
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
              <Delete item="collection" id={initialData.id} />
              <p className="font-bold">Edit Collection</p>
            </div>
          ) : (
            <p className="font-bold">Create Collection</p>
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        onChange={(url: string) => {
                          field.onChange(url)
                        }}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="submit" className="bg-blue-500 text-white">
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() => router.push("/collections")}
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

export default CollectionForm
