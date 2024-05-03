"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { useState } from "react";
import { Button } from "./button";
import InputMask from "react-input-mask";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  prepend?: React.ReactNode;
  prependinner?: React.ReactNode;
  append?: React.ReactNode;
  appendInner?: React.ReactNode;
  errorMessage?: React.ReactNode;
  mask?: string | Array<string | RegExp>;
  maskPlaceholder?: string | null;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      mask = "",
      pattern,
      type,
      errorMessage = "",
      maskPlaceholder = null,
      ...props
    },
    ref,
  ) => {
    const [isValid, setIsValid] = useState(true);
    const [fieldType, setFieldType] = useState(type);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (pattern) {
        const regex = new RegExp(pattern);
        const isValid = regex.test(value);
        setIsValid(isValid);
      }
      props.onBlur?.(event);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 0) setIsValid(true);
      props.onChange?.(e);
    };

    return (
      <div className={cn("grid gap-1 text-sm font-medium", className)}>
        {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
        <div className="flex gap-1">
          {props.prepend && <div>{props.prepend}</div>}
          <div
            className={cn(
              "box-border flex h-10 flex-1 items-center overflow-hidden rounded border-2 bg-muted transition-colors focus-within:border-primary [&:hover:not(:focus-within)]:border-primary/20 [&:hover:not(:focus-within)]:bg-primary/5",
              errorMessage ||
                (!isValid &&
                  "border-destructive focus-within:border-destructive"),
            )}
          >
            {props.prependinner && (
              <div className="p-2 pr-0">{props.prependinner}</div>
            )}
            <InputMask
              type={fieldType}
              mask={mask}
              maskPlaceholder={maskPlaceholder}
              className="size-full min-w-0 bg-inherit px-2 text-inherit outline-none"
              {...props}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {type === "password" && (
              <button
                type="button"
                className="flex aspect-square h-full items-center justify-center bg-inherit"
                onClick={() =>
                  setFieldType(fieldType === "password" ? "text" : "password")
                }
              >
                {fieldType === "password" ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            )}

            {props.appendInner && (
              <div className="p-2">{props.appendInner}</div>
            )}
          </div>
          {props.append && <div>{props.append}</div>}
        </div>

        {errorMessage ||
          (!isValid && (
            <p className="text-xs font-semibold text-destructive">
              {errorMessage || "Введите данные в правильном формате"}
            </p>
          ))}
      </div>
    );
  },
);

Input.displayName = "Input";
