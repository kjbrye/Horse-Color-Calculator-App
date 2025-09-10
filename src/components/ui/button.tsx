import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  const variants = {
    default:
      "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 border border-[var(--accent)]",
    outline:
      "bg-transparent border border-[var(--accent)] text-[var(--text)] hover:bg-[var(--accent)]/10",
    ghost: "bg-transparent text-[var(--text)] hover:bg-[var(--accent)]/10",
    secondary:
      "bg-[var(--card)] hover:bg-gray-100 text-[var(--text)] border border-gray-200",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-5 py-3 text-lg rounded-xl",
  };
  return (
    <button
      className={cn("transition shadow-glow", variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
