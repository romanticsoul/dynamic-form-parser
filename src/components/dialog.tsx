import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type DialogProps = React.ComponentPropsWithoutRef<"dialog"> & {};

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dialog
        className={cn("rounded-lg bg-background p-4 shadow-lg", className)}
        ref={ref}
        {...props}
      >
        {children}
      </dialog>
    );
  },
);

Dialog.displayName = "Dialog";
