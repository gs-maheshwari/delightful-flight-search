"use client"

import type React from "react"
import type { ButtonHTMLAttributes } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

const Button = ({ children, variant = "primary", className = '', ...props } : ButtonProps) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variantClasses =
    variant === "primary"
      ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500"

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button;
