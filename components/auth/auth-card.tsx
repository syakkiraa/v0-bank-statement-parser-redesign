"use client"

import { cn } from "@/lib/utils"

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md bg-card rounded-2xl border border-border shadow-lg p-8",
        className
      )}
    >
      {children}
    </div>
  )
}

interface AuthCardHeaderProps {
  title: string
  description?: string
}

export function AuthCardHeader({ title, description }: AuthCardHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-semibold text-foreground tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}

interface AuthCardFooterProps {
  children: React.ReactNode
  className?: string
}

export function AuthCardFooter({ children, className }: AuthCardFooterProps) {
  return (
    <div className={cn("mt-6 text-center text-sm text-muted-foreground", className)}>
      {children}
    </div>
  )
}
