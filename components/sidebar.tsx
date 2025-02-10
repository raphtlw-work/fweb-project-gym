"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Dumbbell,
  Users,
  UserCog,
  QrCode,
} from "lucide-react";
import { BarcodeScanner } from "./barcode-scanner";
import { verifySession } from "@/app/auth/dal";

export function Sidebar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [scannerOpen, setScannerOpen] = useState(false);

  const user = verifySession();
  const isAdmin = user?.role === "admin";

  const navItems = isAdmin
    ? [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Equipment List", href: "/equipment", icon: Dumbbell },
        { name: "Members", href: "/members", icon: Users },
        { name: "Manage Admins", href: "/admins", icon: UserCog },
      ]
    : [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Members", href: "/members", icon: Users },
      ];

  return (
    <>
      <aside className='flex flex-col w-64 bg-card text-card-foreground'>
        <div className='p-4'>
          <div className='flex items-center gap-2'>
            <Dumbbell className='w-8 h-8 text-primary' />
            <div>
              <h1 className='text-2xl font-bold font-logo'>FastGym</h1>
              <p className='text-xs text-muted-foreground opacity-70'>
                workspace
              </p>
            </div>
          </div>
        </div>
        <nav className='flex-1'>
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 mt-2 text-sm ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className='w-5 h-5 mr-2' />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='p-4'>
          <Button
            variant='outline'
            className='w-full mb-2'
            onClick={() => setScannerOpen(true)}
          >
            <QrCode className='w-5 h-5 mr-2' />
            Launch Scanner
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='w-full'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </div>
      </aside>
      <BarcodeScanner open={scannerOpen} onOpenChange={setScannerOpen} />
      <div className='noise' />
    </>
  );
}
