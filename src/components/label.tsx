import { forwardRef, LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {};
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        className={cn("text-sm font-medium", className)}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    );
  },
);

Label.displayName = "Label";
