import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { label: "תחקור רשויות", href: "/dashboard" },
  { label: "Data Explorer", href: "/maps" },
  { label: "מדד איכות חיים", href: "/reports" },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              ☰
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0">
            <SheetHeader className="p-4">
              <SheetTitle>תפריט</SheetTitle>
            </SheetHeader>

            <Separator />

            <nav className="flex flex-col p-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="font-bold">
          Galil Data
        </Link>

        {/* Desktop nav */}
        <nav className="mr-6 hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex-1" />
      </div>
    </header>
  )
}
