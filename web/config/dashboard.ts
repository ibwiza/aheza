import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboar",
      disabled: true,
    },
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Contributions",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Configuration",
      href: "/dashboard/configuration",
      icon: "billing",
    },
    {
      title: "Families",
      href: "/dashboard/family",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
