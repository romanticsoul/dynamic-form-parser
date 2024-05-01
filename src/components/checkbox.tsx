import React, { forwardRef } from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: React.ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="relative box-border size-5 rounded border-2 bg-muted transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary">
          <input
            type="checkbox"
            className="peer relative z-10 block size-full cursor-pointer appearance-none"
            ref={ref}
            {...props}
          />
          <CheckIcon
            strokeWidth={2.5}
            className="absolute inset-0 size-4 scale-0 text-transparent transition-all peer-checked:scale-100 peer-checked:text-primary-foreground"
          />
        </div>
        {label && (
          <Label className="flex-1" htmlFor={props.id}>
            {label}
          </Label>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
