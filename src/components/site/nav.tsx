"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons/github";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const links = [
  { href: "#projects", label: "work", id: "projects" },
  { href: "#about", label: "about", id: "about" },
  { href: "#contact", label: "contact", id: "contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!("IntersectionObserver" in window) || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-term-green"
        aria-hidden="true"
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="group flex min-w-0 items-center gap-2"
            aria-label="Gaurav Kumar — back to top"
          >
            <span className="grid size-7 shrink-0 place-items-center border border-border text-[10px] text-term-green transition-colors group-hover:border-term-green/50">
              GK
            </span>
            <span className="truncate text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
              gaurav@portfolio<span className="text-term-dim">:~$</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative border border-transparent px-2.5 py-1.5 text-[10px] tracking-[0.08em] text-muted-foreground transition-colors hover:border-border hover:text-foreground",
                  active === link.href && "border-border text-term-green",
                )}
              >
                [{link.label}]
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2.5 -bottom-px h-px origin-left scale-x-0 bg-term-green transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            ))}
            <Link
              href="/profile"
              className="group relative border border-transparent px-2.5 py-1.5 text-[10px] tracking-[0.08em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              [profile]
              <span
                aria-hidden="true"
                className="absolute inset-x-2.5 -bottom-px h-px origin-left scale-x-0 bg-term-green transition-transform duration-300 group-hover:scale-x-100"
              />
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="https://github.com/ARtoRiAs10"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon-sm" }),
                      "border border-border text-muted-foreground hover:text-term-green",
                    )}
                  />
                }
              >
                <Github className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent side="bottom">GitHub</TooltipContent>
            </Tooltip>

            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "hidden border-term-green/30 text-[10px] text-term-green hover:border-term-green hover:bg-term-green/10 hover:text-term-green sm:inline-flex",
              )}
            >
              [ hire me ]
            </a>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="grid size-8 place-items-center border border-border text-muted-foreground transition-colors hover:border-term-green/50 hover:text-term-green sm:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[290px] border-border bg-card p-0"
              >
                <SheetHeader className="border-b border-border p-4 text-left">
                  <SheetTitle className="text-[11px] tracking-[0.14em] text-term-green uppercase">
                    navigation
                  </SheetTitle>
                  <SheetDescription className="text-[10px] text-term-dim">
                    jump to a section
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col p-2" aria-label="Mobile">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-border px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-term-green/5 hover:text-term-green"
                    >
                      <span>[{link.label}]</span>
                      <span className="text-term-dim">↵</span>
                    </a>
                  ))}
                  <a
                    href="https://github.com/ARtoRiAs10"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-border px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-term-green/5 hover:text-term-green"
                  >
                    <span>[github]</span>
                    <Github className="size-3.5" />
                  </a>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-border px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-term-green/5 hover:text-term-green"
                  >
                    <span>[profile]</span>
                    <span className="text-term-dim">↵</span>
                  </Link>
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "mx-3 mt-4 border-term-green/30 text-term-green hover:bg-term-green/10 hover:text-term-green",
                    )}
                  >
                    [ hire me ]
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}