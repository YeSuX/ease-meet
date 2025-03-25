"use client";

import * as React from "react";
import {
  BookOpen,
  Clock,
  GalleryVerticalEnd,
  Home,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { type User } from "@/server/db/schema";
import { usePathname } from "next/navigation";

interface IAppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

export function AppSidebar({ user, ...props }: IAppSidebarProps) {
  const pathname = usePathname();

  const data = {
    teams: [
      {
        name: "易会",
        logo: GalleryVerticalEnd,
        // plan: "会员版",
      },
    ],
    navMain: [
      {
        title: "首页",
        url: "/dashboard",
        icon: Home,
        isActive: pathname === "/dashboard",
      },
      {
        title: "预约系统",
        url: "/dashboard/appointment",
        icon: BookOpen,
        isActive: pathname === "/dashboard/appointment",
      },
      {
        title: "时间管理",
        url: "/dashboard/time-management",
        icon: Clock,
        isActive: pathname === "/dashboard/time-management",
      },
      {
        title: "设置",
        url: "/dashboard/settings",
        icon: Settings,
        isActive: pathname === "/dashboard/settings",
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
