import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: React.ReactNode;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className={cn("grid gap-1", className)}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <select
          className="box-border h-10 rounded border-2 bg-muted px-2 text-sm font-medium outline-none focus-visible:border-primary"
          ref={ref}
          {...props}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>
    );
  },
);

Select.displayName = "Select";
