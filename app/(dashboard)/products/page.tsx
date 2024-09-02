"use client"

import ProductList from "@/app/_components/product/ProductList"
import { useAuth, useUser } from "@clerk/nextjs"
import { Separator } from "@/app/_components/ui/separator"
import { Suspense } from "react"
import { Button } from "@/app/_components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import Spinner from "@/app/_components/custom ui/Spinner"
import Link from "next/link"

const Products = () => {
  const { user } = useUser()
  const route = useRouter()
  return (
    <div className="px-10 py-5">
      {!user?.id ? (
        <Link
          href={"/sign-in"}
          className="border font-bold flex justify-center cursor-pointer"
        >
          LogIn First to create Product
        </Link>
      ) : user.organizationMemberships.at(0)?.role === "org:member" ? (
        <Link
          href={"/sign-in"}
          className="border font-bold flex justify-center cursor-pointer"
        >
          You must be an administrator to create product
        </Link>
      ) : (
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">Products</p>
          <Button
            className="bg-blue-500 flex gap-1 "
            onClick={() => route.push("/products/new")}
          >
            <Plus className="w-4 h-4" /> Create Product
          </Button>
        </div>
      )}
      <Separator className="my-4 bg-gray-500 flex-1" />
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </div>
  )
}

export default Products
