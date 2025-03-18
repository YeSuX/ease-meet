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

// This is sample data.
const data = {
  user: {
    name: "suxiong",
    email: "m@example.com",
  },
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
    },
    {
      title: "预约系统",
      url: "/dashboard/appointment",
      icon: BookOpen,
    },
    {
      title: "时间管理",
      url: "/dashboard/time-management",
      icon: Clock,
    },
    {
      title: "设置",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
