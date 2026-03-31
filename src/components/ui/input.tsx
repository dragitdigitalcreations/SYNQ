"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, type, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-[10px] border-0 bg-input-bg px-3.5 py-2 text-[15px] text-text-primary",
            "placeholder:text-text-secondary",
            "focus:outline-none focus:ring-2 focus:ring-accent/50",
            "transition-all duration-200",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-11",
            error && "ring-1 ring-error focus:ring-2 focus:ring-error/50",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
