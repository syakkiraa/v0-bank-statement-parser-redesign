"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="h-8 w-8"
            >
              {/* Geometric leaf/petal logo */}
              <path
                d="M16 4C16 4 8 8 8 16C8 20.4183 11.5817 24 16 24C16 24 16 16 16 4Z"
                className="fill-primary"
              />
              <path
                d="M16 4C16 4 24 8 24 16C24 20.4183 20.4183 24 16 24C16 24 16 16 16 4Z"
                className="fill-primary/70"
              />
              <path
                d="M16 12C16 12 12 14.5 12 19C12 21.7614 13.7909 24 16 24C16 24 16 18 16 12Z"
                className="fill-accent"
              />
              <path
                d="M16 12C16 12 20 14.5 20 19C20 21.7614 18.2091 24 16 24C16 24 16 18 16 12Z"
                className="fill-accent/70"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">Kredit Lab</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            Log In
          </Button>
          <Button size="sm">
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <Button variant="ghost" size="sm" className="justify-start">
                Log In
              </Button>
              <Button size="sm">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
