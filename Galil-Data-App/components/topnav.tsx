"use client";

import Link from "next/link";
import Image from "next/image";
import ModeToggle from "@/components/mode-toggle";
import {usePathname} from "next/navigation";
export default function TopNav() {
  const pathname = usePathname();
  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-3 bg-background shadow-md fixed top-0 right-0 left-0 z-40"
      dir="rtl">
      <div className="flex items-center w-full relative">
        <div className="flex items-center gap-3 absolute right-0">
          <Link
            href="/"
            className="font-medium text-foreground hover:text-primary transition-colors pos-relative flex items-center gap-2">
            <Image
              src="/GalileeKnowledgefavi.png"
              alt="Galilee Knowledge Logo"
              width={32}
              height={32}
            />
            <span className="font-bold text-lg text-foreground">דאטא גליל</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 mx-auto">
          <Link
            href="/authorities"
            className={`font-medium transition-colors ${
              pathname === "/authorities" ? "text-primary" : "text-foreground"
            } hover:text-primary`}>
            תחקור רשויות
          </Link>
          <Link
            href="/dataexplorer"
            className={`font-medium transition-colors ${
              pathname === "/dataexplorer" ? "text-primary" : "text-foreground"
            } hover:text-primary`}>
            Data explorer
          </Link>
          <Link
            href="/lifeindex"
            className={`font-medium transition-colors ${
              pathname === "/lifeindex" ? "text-primary" : "text-foreground"
            } hover:text-primary`}>
            מדד איכות חיים
          </Link>
        </div>
      </div>
      <ModeToggle />
    </nav>
  );
}
