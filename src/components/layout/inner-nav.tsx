"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import {
  ArrowLeft, Home, Search, Briefcase, MessageSquare,
  BarChart3, Settings, Moon, Sun, PlusCircle, Users, FolderOpen,
} from "lucide-react";
import Image from "next/image";

export function InnerNav() {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();

  const role = (session?.user as unknown as Record<string, unknown>)?.role as string;
  const isCreator = role !== "BUSINESS";

  const navItems = isCreator
    ? [
        { label: "Home", href: "/dashboard/creator", icon: Home },
        { label: "Campaigns", href: "/dashboard/creator/campaigns", icon: Search },
        { label: "Collaborations", href: "/dashboard/creator/collaborations", icon: FolderOpen },
        { label: "Messages", href: "/dashboard/creator/messages", icon: MessageSquare },
        { label: "Analytics", href: "/dashboard/creator/analytics", icon: BarChart3 },
        { label: "Settings", href: "/dashboard/creator/settings", icon: Settings },
      ]
    : [
        { label: "Home", href: "/dashboard/business", icon: Home },
        { label: "New Campaign", href: "/dashboard/business/campaigns/new", icon: PlusCircle },
        { label: "Find Creators", href: "/dashboard/business/find-creators", icon: Users },
        { label: "Campaigns", href: "/dashboard/business/campaigns", icon: Briefcase },
        { label: "Messages", href: "/dashboard/business/messages", icon: MessageSquare },
        { label: "Analytics", href: "/dashboard/business/analytics", icon: BarChart3 },
        { label: "Settings", href: "/dashboard/business/settings", icon: Settings },
      ];

  return (
    <header className="sticky top-0 z-50 glass shadow-xs">
      <div className="flex items-center justify-between h-[56px] px-4 max-w-6xl mx-auto">
        {/* Left: Back + Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            aria-label="Go back"
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Link href={isCreator ? "/dashboard/creator" : "/dashboard/business"} className="flex items-center gap-2">
            <Image
              src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
              alt="SYNQ"
              width={90}
              height={28}
              className="h-6 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Nav items */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all"
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Theme + User */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-lg p-1 hover:bg-surface-elevated transition-colors">
                  <Avatar name={session.user.name ?? "User"} src={session.user.image} size="sm" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-text-primary">{session.user.name}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={isCreator ? "/dashboard/creator" : "/dashboard/business"}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="text-error">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden items-center gap-1 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-1 shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all"
          >
            <item.icon className="h-3 w-3" />
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
