import { CldUploadWidget } from "next-cloudinary"
import { Button } from "../ui/button"
import { Plus, Trash } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4 ">
        {value.map((url) => (
          <div className="relative h-[200px] w-[200px]" key={url}>
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                size="sm"
                type="button"
                className="bg-red-500 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              fill
              alt="collection"
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="qtqp36vy" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-gray-500 text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Upload Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
