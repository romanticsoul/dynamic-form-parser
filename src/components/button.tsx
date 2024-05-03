"use client";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useFormStatus } from "react-dom";
import { LoaderCircleIcon } from "lucide-react";

const buttonVariants = cva(
  "box-border flex select-none items-center justify-center rounded text-xs font-semibold transition-all disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-background [&:not([disabled]):hover]:bg-primary/90",
        text: "bg-transparent text-inherit [&:not([disabled]):hover]:bg-primary/5",
        muted:
          "border-2 bg-muted [&:not([disabled]):hover]:border-primary/20 [&:not([disabled]):hover]:bg-primary/10",
      },
      size: {
        small: "h-8 px-3",
        medium: "h-10 px-5",
        large: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, type = "button", disabled, size, children, ...props },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || pending}
        {...props}
      >
        {pending && type === "submit" ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
