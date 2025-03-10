"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bell,
  BookOpen,
  Bot,
  Calendar,
  CalendarCheck,
  Clock,
  Command,
  GalleryVerticalEnd,
  Gauge,
  Settings2,
  SquareTerminal,
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
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "易会",
      logo: GalleryVerticalEnd,
      plan: "会员版",
    }
  ],
  navMain: [
    {
      title: "仪表盘",
      url: "#",
      icon: Gauge,
      isActive: true,
      items: [
        {
          title: "个人概览",
          url: "#",
        },
        {
          title: "快速操作",
          url: "#",
        },
        {
          title: "最近活动",
          url: "#",
        },
      ],
    },
    {
      title: "日程管理",
      url: "#",
      icon: CalendarCheck,
      items: [
        {
          title: "日历视图",
          url: "#",
        },
        {
          title: "列表视图",
          url: "#",
        },
        {
          title: "创建日程",
          url: "#",
        },
        {
          title: "重复日程设置",
          url: "#",
        },
      ],
    },
    {
      title: "预约系统",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "我的预约",
          url: "#",
        },
        {
          title: "创建预约",
          url: "#",
        },
        {
          title: "预约历史",
          url: "#",
        },
        {
          title: "预约模版",
          url: "#",
        },
      ],
    },
    {
      title: "时间管理",
      url: "#",
      icon: Clock,
      items: [
        {
          title: "可用时段设置",
          url: "#",
        },
        {
          title: "工作时间设置",
          url: "#",
        },
        {
          title: "休假安排",
          url: "#",
        },
        {
          title: "时区设置",
          url: "#",
        },
      ],
    },
    {
      title: "通知中心",
      url: "#",
      icon: Bell,
      items: [
        {
          title: "所有通知",
          url: "#",
        },
        {
          title: "未读通知",
          url: "#",
        },
        {
          title: "通知设置",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
