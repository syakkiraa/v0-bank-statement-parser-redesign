import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Subtle grid background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0,0,0)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          }}
        />
        {/* Teal glow accent */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 50% 50% at 50% 0%, hsl(170 50% 45% / 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/kredit-lab-light.png"
            alt="Kredit Lab"
            width={130}
            height={36}
            className="h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src="/images/kredit-lab-dark.png"
            alt="Kredit Lab"
            width={130}
            height={36}
            className="h-8 w-auto hidden dark:block"
            priority
          />
        </Link>
        <ThemeToggle />
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Capital Island Sdn Bhd. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
