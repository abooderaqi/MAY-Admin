"use client"

import CollectionList from "@/app/_components/collections/CollectionList"
import Spinner from "@/app/_components/custom ui/Spinner"
import { Button } from "@/app/_components/ui/button"
import { Separator } from "@/app/_components/ui/separator"
import { useAuth, useUser } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Suspense } from "react"

const Collections = () => {
  const { user } = useUser()
  const route = useRouter()
  return (
    <div className="px-10 py-5">
      {!user?.id ? (
        <Link
          href={"/sign-in"}
          className="border font-bold flex justify-center cursor-pointer"
        >
          LogIn First to create collections
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
          <p className="font-bold text-xl">Collection</p>
          <Button
            className="bg-blue-500 flex gap-1 "
            onClick={() => route.push("/collections/new")}
          >
            <Plus className="w-4 h-4" /> Create Collection
          </Button>
        </div>
      )}

      <Separator className="my-4 bg-gray-500 flex-1" />
      <Suspense fallback={<Spinner />}>
        <CollectionList />
      </Suspense>
    </div>
  )
}

export default Collections
