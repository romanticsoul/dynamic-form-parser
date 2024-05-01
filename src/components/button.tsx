import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "box-border flex select-none items-center justify-center rounded text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary text-background hover:bg-primary/95",
        text: "bg-transparent text-inherit hover:bg-primary/5",
        muted: "border-2 bg-muted",
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
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
