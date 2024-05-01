"use client";
import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

type ColorInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: React.ReactNode;
  options?: string[];
};

const defaultOptions = [
  "#D9D9D9",
  "#A7A2A2",
  "#676666",
  "#3F3E3E",
  "#262626",
  "#141414",
  "#000000",
];

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  ({ className, label, onChange, options = defaultOptions, ...props }, ref) => {
    const [value, setValue] = useState(options[0]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={cn("grid gap-1", className)}>
        <Input
          label={label}
          {...props}
          ref={ref}
          onChange={handleChange}
          value={props.value || value}
          prependinner={
            <span
              className="block size-5 rounded"
              style={{ backgroundColor: value }}
            />
          }
        />
        <div className="grid grid-cols-7 gap-1">
          {options.map((color) => (
            <input
              onChange={handleChange}
              checked={color === value}
              key={color}
              type="radio"
              value={color}
              style={{ backgroundColor: color }}
              className={cn(
                `block h-8 cursor-pointer appearance-none rounded transition-transform hover:scale-105`,
              )}
            />
          ))}
        </div>
      </div>
    );
  },
);

ColorInput.displayName = "ColorInput";
