"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  showStrength?: boolean
}

export function PasswordInput({ className, showStrength, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [strength, setStrength] = React.useState(0)

  const calculateStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z\d]/.test(password)) score++
    return score
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showStrength) {
      setStrength(calculateStrength(e.target.value))
    }
    props.onChange?.(e)
  }

  const strengthLabels = ["Weak", "Fair", "Good", "Strong"]
  const strengthColors = [
    "bg-destructive",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-primary",
  ]

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          onChange={handleChange}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
      {showStrength && (props.value as string)?.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i < strength ? strengthColors[strength - 1] : "bg-border"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Password strength: {strength > 0 ? strengthLabels[strength - 1] : "Too short"}
          </p>
        </div>
      )}
    </div>
  )
}
