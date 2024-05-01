import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: React.ReactNode;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, rows = 4, ...props }, ref) => {
    return (
      <div className={cn("grid gap-1 text-sm font-medium", className)}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <textarea
          rows={rows}
          className="min-h-10 rounded border-2 bg-muted p-2 transition-colors focus-within:border-primary"
          ref={ref}
          {...props}
        ></textarea>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
