"use client";

import { cn, formatCurrency } from "@/lib/utils";

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  step = 500,
  showValue = true,
  formatValue = formatCurrency,
  className,
}: RangeSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      {showValue && (
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">{formatValue(min)}</span>
          <span className="font-mono font-medium text-accent">{formatValue(value)}</span>
          <span className="text-text-secondary">{formatValue(max)}+</span>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-elevated
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:hover:scale-110"
          style={{
            background: `linear-gradient(to right, var(--accent) ${percentage}%, var(--surface-elevated) ${percentage}%)`,
          }}
        />
      </div>
    </div>
  );
}
