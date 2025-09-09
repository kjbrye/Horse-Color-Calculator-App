import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  const variants = {
    default: "bg-white/5 hover:bg-white/10 border border-white/10",
    outline: "bg-transparent border border-white/20 hover:bg-white/5",
    ghost: "bg-transparent hover:bg-white/5",
    secondary: "bg-white/5 hover:bg-white/10 border border-white/20"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-5 py-3 text-lg rounded-xl"
  };
  return (
    <button
      className={cn("text-white transition shadow-glow", variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
