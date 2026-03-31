"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({ options, selected, onChange, placeholder, className }: MultiSelectProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
            >
              {item}
              <button
                type="button"
                onClick={() => toggle(item)}
                className="rounded-full p-0.5 hover:bg-accent/20 transition-colors"
                aria-label={`Remove ${item}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {options
          .filter((o) => !selected.includes(o))
          .map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className="rounded-full border border-border px-3 py-1 text-sm text-text-secondary hover:border-accent hover:text-accent transition-all duration-200"
            >
              {option}
            </button>
          ))}
      </div>
      {selected.length === 0 && placeholder && (
        <p className="text-sm text-text-secondary">{placeholder}</p>
      )}
    </div>
  );
}
