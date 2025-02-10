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

type NavItem = {
  name: string;
  href: string;
  icon: string;
};

type SidebarClientProps = {
  navItems: NavItem[];
};

export default function SidebarClient({ navItems }: SidebarClientProps) {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [scannerOpen, setScannerOpen] = useState(false);

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    LayoutDashboard,
    Dumbbell,
    Users,
    UserCog,
  };

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
            {navItems.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 mt-2 text-sm ${
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className='w-5 h-5 mr-2' />
                    {item.name}
                  </Link>
                </li>
              );
            })}
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
