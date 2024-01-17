import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";
import Logo from "./logo";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
