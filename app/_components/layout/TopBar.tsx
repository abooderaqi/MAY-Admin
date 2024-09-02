"use client"

import { navLinks } from "@/lib/constants"
import { UserButton, useUser } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

import Link from "next/link"

function TopBar() {
  const user = useUser()
  const [dropdownMenu, setDropdownMenu] = useState(false)
  const pathname = usePathname()
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-100 shadow-xl lg:hidden">
      <Image src="/logo.png" width={150} height={70} alt="Logo image" />
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-xl ${
              pathname === link.url ? "text-blue-500" : ""
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}

        <div className="relative flex gap-4 items-center">
          <Menu
            className="cursor-pointer md:hidden"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          />
          {dropdownMenu && (
            <div className="absolute rounded-lg top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl">
              {navLinks.map((link) => (
                <Link
                  href={link.url}
                  key={link.label}
                  className="flex gap-4 text-xl"
                >
                  {link.icon} <p>{link.label}</p>
                </Link>
              ))}
            </div>
          )}
          {!user ? <Link href={"/sign-in"}>Login</Link> : <UserButton />}
        </div>
      </div>
    </div>
  )
}

export default TopBar
