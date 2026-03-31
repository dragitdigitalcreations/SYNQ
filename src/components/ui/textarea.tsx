"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, showCount, maxLength, value, ...props }, ref) => {
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-[10px] border-0 bg-input-bg px-3.5 py-3 text-[15px] text-text-primary",
            "placeholder:text-text-secondary",
            "focus:outline-none focus:ring-2 focus:ring-accent/50",
            "transition-all duration-200 resize-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "ring-1 ring-error focus:ring-2 focus:ring-error/50",
            className
          )}
          ref={ref}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        {showCount && maxLength && (
          <span className="absolute bottom-2 right-3 text-xs text-text-secondary font-mono">
            {currentLength}/{maxLength}
          </span>
        )}
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
