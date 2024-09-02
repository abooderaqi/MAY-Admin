"use client"
import { Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"

import { Button } from "../ui/button"
import { deleteCollection } from "@/lib/actions/collectionActions"
import { useToast } from "../ui/use-toast"
import { deleteProduct } from "@/lib/actions/productAction"

interface DeleteProps {
  id: string
  item: string
}
const Delete: React.FC<DeleteProps> = ({ id, item }) => {
  const { toast } = useToast()
  const onDelete = async () => {
    try {
      if (item === "collection") await deleteCollection(id)
      else if (item === "product") await deleteProduct(id)

      window.location.reload()
      toast({
        title: `${item} Deleted`,
        description: `${item} deleted successfully`,
        variant: "default",
      })
    } catch (err) {
      console.error(err)
      return toast({
        title: `Failed to delete ${item}`,
        description: `${err as string}`,
        variant: "destructive",
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-600 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600" onClick={onDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Delete
