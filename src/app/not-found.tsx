import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-xl border border-border bg-card">
        <div className="terminal-bar flex h-9 items-center gap-3 px-3.5">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="traffic-light bg-[#ff5f56]" />
            <span className="traffic-light bg-[#ffbd2e]" />
            <span className="traffic-light bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center text-[9px] tracking-[0.16em] text-term-dim uppercase">
            404 — not found
          </div>
        </div>
        <div className="p-6">
          <p className="text-[10px] text-term-dim">
            <span className="text-term-green">gaurav@portfolio</span>
            <span>:</span>
            <span className="text-term-cyan">~</span>
            <span>$ cd /404</span>
          </p>
          <p className="mt-3 text-xs text-term-red">
            zsh: no such file or directory: /404
          </p>
          <h1 className="mt-6 text-2xl tracking-tight text-foreground">
            This page does not exist<span aria-hidden="true" className="text-term-green">_</span>
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            The route was not found. Head back to the portfolio and pick a
            project instead.
          </p>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "default" }),
              "mt-6 rounded-none bg-term-green text-primary-foreground hover:bg-term-green/80",
            )}
          >
            cd ~ &amp;&amp; open portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}