import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  prepend?: React.ReactNode;
  prependinner?: React.ReactNode;
  append?: React.ReactNode;
  appendInner?: React.ReactNode;
  errorMessage?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("grid gap-1 text-sm font-medium", className)}>
        {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
        <div className="flex gap-1">
          {props.prepend && <div>{props.prepend}</div>}
          <div
            className={cn(
              "box-border flex h-10 flex-1 items-center overflow-hidden rounded border-2 bg-muted transition-colors focus-within:border-primary",
              props.errorMessage &&
                "border-destructive focus-within:border-destructive",
            )}
          >
            {props.prependinner && (
              <div className="p-2 pr-0">{props.prependinner}</div>
            )}
            <input
              {...props}
              ref={ref}
              className="size-full min-w-0 bg-inherit px-2 text-inherit outline-none"
            />
            {props.appendInner && (
              <div className="p-2">{props.appendInner}</div>
            )}
          </div>
          {props.append && <div>{props.append}</div>}
        </div>
        {props.errorMessage && (
          <p className="text-xs text-destructive">{props.errorMessage}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
