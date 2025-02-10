"use server";

import SidebarClient from "./sidebar-client";
import { verifySession } from "@/app/auth/dal";

export async function Sidebar() {
  const user = await verifySession();
  const isAdmin = user.role === "admin";

  const navItems = isAdmin
    ? [
        { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
        { name: "Equipment List", href: "/equipment", icon: "Dumbbell" },
        { name: "Members", href: "/members", icon: "Users" },
        { name: "Manage Admins", href: "/admins", icon: "UserCog" },
      ]
    : [
        { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
        { name: "Members", href: "/members", icon: "Users" },
      ];

  return <SidebarClient navItems={navItems} />;
}
