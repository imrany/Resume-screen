'use client'

import { BriefcaseBusiness, FileText, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from 'next/navigation'

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Screen Resume",
    url: "/dashboard",
    icon: FileText,
  },
  {
    title: "Job Offers",
    url: "/offers",
    icon: BriefcaseBusiness,
  },
];

export function AppSidebar() {
  const currentPath = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Resume Screener</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`${
                      currentPath === item.url ? "bg-blue-50 text-blue-800 font-semibold" : ""
                    } rounded-sm`}
                    asChild
                  >
                    <Link href={item.url}>
                      <div className="flex items-center">
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
