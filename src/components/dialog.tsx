"use client";

import { XIcon } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type DialogProps = React.ComponentPropsWithRef<"dialog"> & {
  open?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  title?: React.ReactNode;
};

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ className, open, header, title, footer, children, ...props }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => dialogRef.current!);

    useEffect(() => {
      if (open) dialogRef.current?.showModal();
      else dialogRef.current?.close();
    }, [open]);

    return (
      <dialog
        className="appearance-none rounded-lg border-2 border-primary/20 bg-card shadow-lg transition-all duration-300"
        ref={dialogRef}
        {...props}
      >
        {header || (
          <div className="sticky top-0 z-10 flex items-center border-b-2 bg-inherit p-4">
            {title}

            <Button
              variant="text"
              size="small"
              className="ml-auto aspect-square self-start p-0"
              onClick={() => dialogRef.current?.close()}
            >
              <button type="button" className="sr-only">
                Закрыть
              </button>
              <XIcon className="size-5" />
            </Button>
          </div>
        )}
        <div className={cn("relative max-w-lg p-4", className)}>{children}</div>
        {footer && (
          <div className="sticky bottom-0 z-10 border-t-2 border-primary/20 bg-inherit p-4">
            {footer}
          </div>
        )}
      </dialog>
    );
  },
);

Dialog.displayName = "Dialog";
