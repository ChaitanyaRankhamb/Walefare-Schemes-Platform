"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, User, LogOut, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "@/context/UserContext";

export function Navbar() {
  const { user, isLogged, logout } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold text-xl tracking-tight">
              AuthFlow
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#tech-stack"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Tech Stack
          </Link>
          <Link
            href="#oauth-guide"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            OAuth Guide
          </Link>
          <Link
            href="#passwordless"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Passwordless
          </Link>
          <Link
            href="#architecture"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Architecture
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {!isLogged && (
            <nav className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </nav>
          )}

          <div className="flex items-center gap-3 pl-4">
            {isLogged && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all">
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">
                        {user?.username || "User Account"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate w-44">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
