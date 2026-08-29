"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Лендинг гайда" },
  { href: "/master", label: "Лендинг мастер-класса" },
] as const

export function SiteNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 grid min-h-16 grid-cols-1 items-center gap-3 border-b border-line bg-ivory/95 px-4 py-3 backdrop-blur-md sm:grid-cols-[1fr_auto] sm:px-6 sm:py-0">
      <span className="text-sm font-black uppercase tracking-[0.03em]">Игорь Беляев</span>
      <nav className="flex flex-wrap gap-2">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-3 py-2 text-[11px] font-extrabold transition-colors sm:px-3.5 sm:text-xs ${
                active
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-charcoal bg-transparent text-charcoal hover:bg-charcoal/5"
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
