"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ModeToggle from "@/components/mode-toggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

// Main navigation bar component with RTL support
export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      dir="rtl"
      className="
        fixed top-0 inset-x-0 z-40
        h-20
        bg-background/95 backdrop-blur
        border-b mr-3
      "
    >
      <div className="container mx-auto h-full flex items-center justify-between px-6">
        {/* Logo section (right side in RTL) */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors"
        >
          <Image
            src="/GalileeKnowledgefavi.png"
            alt="Galilee Knowledge Logo"
            width={56}
            height={56}
          />
          דאטא גליל
        </Link>

        {/* Center navigation links (desktop only) */}
        <div className="hidden md:flex items-center gap-4 sm:gap-10 text-lg sm:text-2xl">
          <NavLink
            href="/authorities"
            active={isActive(pathname, "/authorities")}
          >
            תחקור רשויות
          </NavLink>

          <NavLink
            href="/dataexplorer"
            active={isActive(pathname, "/dataexplorer")}
          >
            חקר נתונים
          </NavLink>

          <NavLink href="/lifeindex" active={isActive(pathname, "/lifeindex")}>
            מדד איכות חיים
          </NavLink>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {/* Mobile menu trigger (visible on mobile only) */}
          <div className="md:hidden">
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Mobile menu component with side sheet
function MobileMenu({ pathname }: { pathname: string }) {
  // Navigation menu items
  const items = [
    { href: "/authorities", label: "תחקור רשויות" },
    { href: "/dataexplorer", label: "חקר נתונים" },
    { href: "/lifeindex", label: "מדד איכות חיים" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="תפריט">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      {/* Sheet content with custom padding */}
      <SheetContent side="left" dir="rtl" className="w-[85%] sm:w-95 p-0">
        {/* Header section with logo and title */}
        <div className="bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 px-6 py-5">
          <SheetTitle className="text-white text-lg font-bold text-center mb-4">
            תפריט ניווט
          </SheetTitle>

          <div className="flex flex-col items-center gap-2">
            <Image
              src="/GalileeKnowledgefavi.png"
              alt="Galilee Knowledge Logo"
              width={60}
              height={60}
              className="drop-shadow-xl"
            />
            <div className="text-center">
              <div className="text-white text-xl font-bold">דאטא גליל</div>
              <div className="text-blue-50 text-sm">אשכול גליל מזרחי</div>
            </div>
          </div>
        </div>

        {/* Navigation links section */}
        <div className="p-4 space-y-2 bg-gray-50 dark:bg-slate-800 flex-1">
          {items.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "block rounded-xl px-5 py-4 text-lg font-semibold transition-all text-center cursor-pointer",
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-slate-600 shadow-sm",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </div>

        {/* Footer with dark mode toggle */}
        <div className="border-t p-4 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-center gap-3">
            <span className="text-base font-medium text-gray-700 dark:text-gray-300">
              תצוגה
            </span>
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Navigation link component with active state styling
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        font-medium transition-colors
        ${active ? "text-primary" : "text-foreground"}
        hover:text-primary
      `}
    >
      {children}
    </Link>
  );
}

// Helper function to check if current path matches the given href
function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}
