"use client"

import { navLinks } from "@/lib/constants"
import { useAuth, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

function LeftSideBar() {
  const pathname = usePathname()
  const { userId } = useAuth()
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-100 shadow-xl max-lg:hidden">
      <Image src="/logo.png" width={150} height={70} alt="Logo image" />
      <div className="flex flex-col gap-12">
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
      </div>
      <div className="flex gap-4 text-xl items-center">
        {userId ? (
          <>
            <UserButton /> <p>Edit Profile</p>
          </>
        ) : (
          <Link href={"/sign-in"}>Log in</Link>
        )}
      </div>
    </div>
  )
}

export default LeftSideBar
