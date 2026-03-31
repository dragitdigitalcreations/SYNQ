"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Sidebar, type SidebarItem } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import {
  Home, Search, Briefcase, MessageSquare, BarChart3, Settings, PlusCircle, Users, FolderOpen,
} from "lucide-react";

const creatorItems: SidebarItem[] = [
  { label: "Home", href: "/dashboard/creator", icon: <Home className="h-4 w-4" /> },
  { label: "Browse Campaigns", href: "/dashboard/creator/campaigns", icon: <Search className="h-4 w-4" /> },
  { label: "My Collaborations", href: "/dashboard/creator/collaborations", icon: <FolderOpen className="h-4 w-4" /> },
  { label: "Messages", href: "/dashboard/creator/messages", icon: <MessageSquare className="h-4 w-4" /> },
  { label: "Analytics", href: "/dashboard/creator/analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Settings", href: "/dashboard/creator/settings", icon: <Settings className="h-4 w-4" /> },
];

const businessItems: SidebarItem[] = [
  { label: "Home", href: "/dashboard/business", icon: <Home className="h-4 w-4" /> },
  { label: "Create Campaign", href: "/dashboard/business/campaigns/new", icon: <PlusCircle className="h-4 w-4" /> },
  { label: "Find Creators", href: "/dashboard/business/find-creators", icon: <Users className="h-4 w-4" /> },
  { label: "My Campaigns", href: "/dashboard/business/campaigns", icon: <Briefcase className="h-4 w-4" /> },
  { label: "Messages", href: "/dashboard/business/messages", icon: <MessageSquare className="h-4 w-4" /> },
  { label: "Analytics", href: "/dashboard/business/analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Settings", href: "/dashboard/business/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const role = pathname.includes("/dashboard/business") ? "business" : "creator";
  const items = role === "business" ? businessItems : creatorItems;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={items} role={role} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar user={session?.user} />
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">{children}</main>
      </div>
      <MobileNav items={items} />
    </div>
  );
}
