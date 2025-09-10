import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  const variants = {
    default: "bg-glam-accent hover:bg-glam-accent/90 border border-glam-accent/20",
    outline: "bg-transparent text-glam-accent border border-glam-accent hover:bg-glam-accent/10",
    ghost: "bg-transparent text-glam-accent hover:bg-glam-accent/10",
    secondary: "bg-glam-card text-glam-accent hover:bg-glam-card/80 border border-glam-card"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-5 py-3 text-lg rounded-xl"
  };
  return (
    <button
      className={cn(
        "text-[var(--text)] transition shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glam-accent focus-visible:ring-offset-2 focus-visible:ring-offset-glam-bg",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
