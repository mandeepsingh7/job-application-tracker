"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { authClient, signOut, useSession } from "@/lib/auth/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className="border-b-2 border-muted flex items-center justify-between sm:justify-around">
      <div className="px-4 h-15 flex justify-between items-center text-xl sm:text-2xl font-semibold">
        <Link href="/">Home</Link>
      </div>
      <div className="px-4 h-15 flex justify-between items-center gap-2">
        {session?.user ? (
          <>
            <Link href="/dashboard">
              <Button variant="ghost" size="lg">
                Dashboard
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full "
                >
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 ">
                      {session.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p>{session.user.name}</p>
                    <p>{session.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem asChild className="text-sm data-[highlighted]:bg-primary/20">
                  <Link href='/profile' className="flex gap-2 items-center">
                    <User />
                    Profile Page
                  </Link>

                </DropdownMenuItem>
                <DropdownMenuItem onClick={async () => {
                  const result = await signOut();
                  if (result.data) {
                    router.push('/sign-in');
                  } else {
                    alert('Error signing out')
                  }
                  }}
                  className="text-sm data-[highlighted]:bg-red-100">
                    <LogOut />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href={"/sign-in"}>
              <Button variant="ghost" size="lg">
                Log In
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button size="lg">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
