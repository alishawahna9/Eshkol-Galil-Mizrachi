import Link from "next/link";
import {Linkedin} from "lucide-react";
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-background/60 backdrop-blur" dir="ltr">
      <div className="container mx-auto border-t border-border bg-background/60 backdrop-blur px-4 py-6 rounded-lg">
        <div
          className="
            flex flex-col-reverse md:flex-row
            items-center md:justify-between gap-2 md:gap-4
            text-sm text-muted-foreground
          ">
          {/* Dev */}
          <span>
            <Linkedin className="inline-block mb-1 mr-1" size={15} />
            Created by{" "}
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors">
              placeholder
            </Link>
          </span>

          {/* Credits */}
          <span className="font-display text-accent" dir="rtl">
            © {year} מרכז הידע גליל מזרחי.
          </span>
        </div>
      </div>
    </footer>
  );
}
