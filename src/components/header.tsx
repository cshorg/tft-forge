"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LogInIcon, LogOutIcon, UserIcon } from "lucide-react"
import Link from "next/link"

function AccountDropdown() {
  const session = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>{session.data?.user?.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={"/my-boards"}>
          <DropdownMenuItem className="cursor-pointer">
            <UserIcon size={18} className="mr-2" />
            My Boards
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            signOut({
              callbackUrl: "/"
            })
          }
        >
          <LogOutIcon size={18} className="mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Header() {
  const session = useSession()
  const isLoggedIn = !!session.data

  return (
    <header className="px-4 md:px-10 bg-neutral-100/90 dark:bg-neutral-900/80 h-[60px] backdrop-blur z-10 border-b-[1px] flex items-center w-full fixed top-0">
      <div className="flex justify-between items-center w-full">
        <Link
          className="text-lg font-semibold flex items-center gap-2 hover:opacity-90 ease-in transition"
          href="/"
        >
          <Image
            src="/teamfight-tactics.png"
            width="28"
            height="28"
            alt="Application logo"
          />
          TFT Forge
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="outline">
              <LogInIcon size={18} className="mr-2" /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
