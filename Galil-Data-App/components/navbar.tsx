"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ModeToggle from "@/components/mode-toggle";

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
        {/* Right: Logo */}
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

        {/* Center: Navigation */}
        <div className="flex items-center gap-4 sm:gap-10 text-lg sm:text-2xl">
          <NavLink href="/authorities" active={pathname === "/authorities"}>
            תחקור רשויות
          </NavLink>

          <NavLink href="/dataexplorer" active={pathname === "/dataexplorer"}>
            חקר נתונים
          </NavLink>

          <NavLink href="/lifeindex" active={pathname === "/lifeindex"}>
            מדד איכות חיים
          </NavLink>
        </div>

        {/* Left: Actions */}
        <ModeToggle />
      </div>
    </nav>
  );
}

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
