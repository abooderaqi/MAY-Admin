"use client"

import { CollectionType } from "@/lib/type"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/app/_components/ui/command"
import { Suspense, useState } from "react"
import Spinner from "./Spinner"
import { useCollection } from "@/app/(dashboard)/collections/useCollection"
import { Badge } from "../ui/badge"
import { X } from "lucide-react"

interface MultiSelectProps {
  placeholder: string
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
  collection: CollectionType[]
  status: string
}
const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
  collection,
}) => {
  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false)

  let selected: CollectionType[]

  if (value.length === 0) {
    selected = []
  } else {
    selected = value.map((id) =>
      collection.find((collection) => collection.id === id)
    ) as CollectionType[]
  }

  const selectables = collection.filter(
    (collections) => !selected.includes(collections)
  )

  return (
    <Command className="overflow-visible">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection.id}>
            {collection.title}
            <button
              className="ml-1 hover:text-red-500"
              onClick={() => onRemove(collection.id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>
      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full h-full z-10  top-0 overflow-auto border rounded-md shadow-md p-10 ">
            <CommandList>
              {selectables?.map((collections) => (
                <CommandItem
                  className="hover:bg-gray-500 cursor-pointer"
                  onSelect={() => {
                    onChange(collections.id)
                    setInputValue("")
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  key={collections?.id}
                >
                  {collections?.title}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        )}
      </div>
    </Command>
  )
}

export default MultiSelect
