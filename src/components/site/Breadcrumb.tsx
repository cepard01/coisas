"use client";

import Link from "next/link";
import { ChevronDownIcon } from "./icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="px-5 sm:px-6 pt-20 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-foreground font-medium" : ""}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronDownIcon size={12} className="text-muted-foreground/40 -rotate-90" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
