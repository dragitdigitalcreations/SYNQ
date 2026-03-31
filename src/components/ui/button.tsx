"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[12px] font-semibold transition-all duration-150",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-[0.97]",
          {
            "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md": variant === "primary",
            "bg-accent/10 text-accent hover:bg-accent/15": variant === "secondary",
            "text-text-secondary hover:text-text-primary hover:bg-surface-elevated": variant === "ghost",
            "bg-error text-white hover:bg-error/90": variant === "destructive",
            "bg-surface-elevated text-text-primary hover:bg-surface-elevated/80": variant === "outline",
          },
          {
            "h-9 px-3.5 text-sm": size === "sm",
            "h-11 px-5 text-sm": size === "md",
            "h-[52px] px-7 text-base": size === "lg",
            "h-11 w-11 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
