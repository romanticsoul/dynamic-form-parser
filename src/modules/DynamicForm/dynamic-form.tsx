"use client";
import type { Form } from "@/types/Form";
import { Input } from "@/components/input";
import { ColorInput } from "@/components/color-input";
import { Textarea } from "@/components/textarea";
import { Checkbox } from "@/components/checkbox";
import { Dropzone } from "@/components/dropzone";
import { Select } from "@/components/select";
import { Button } from "@/components/button";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { parseFormData } from "./action";
import Link from "next/link";

type DynamicFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  formSchema: Form;
};

export const DynamicForm = forwardRef<HTMLFormElement, DynamicFormProps>(
  ({ formSchema: form, ...props }, ref) => {
    const [formData, setFormData] = useState<{
      [key: string]: string | boolean | number | File[];
    }>({});

    const [state, formAction] = useFormState(parseFormData, null);

    const requiredFields = useMemo(
      () => form.form_fields.filter((field) => field.required),
      [form],
    );

    const filledRequiredFields = useMemo(
      () => requiredFields.every((field) => formData[field.id]),
      [requiredFields, formData],
    );

    const fieldsWithPattern = useMemo(
      () => form.form_fields.filter((field) => field.pattern),
      [form],
    );

    const validFieldsWithPattern = useMemo(
      () =>
        fieldsWithPattern.every((field) => {
          const regex = new RegExp(field.pattern || "");
          const value = formData[field.id];

          return regex.test(typeof value === "string" ? value : "");
        }),
      [fieldsWithPattern, formData],
    );

    const fieldsWithMinLengthMaxLength = useMemo(
      () =>
        form.form_fields.filter((field) => field.minlength || field.maxlength),
      [form],
    );

    const validFieldsWithMinLengthMaxLength = useMemo(
      () =>
        fieldsWithMinLengthMaxLength.every((field) => {
          const value = formData[field.id];
          const minLength = field.minlength || 0;
          const maxLength = field.maxlength || Infinity;

          if (typeof value === "string") {
            return value.length >= minLength && value.length <= maxLength;
          }
        }),
      [fieldsWithMinLengthMaxLength, formData],
    );

    const isValid = useMemo(
      () =>
        filledRequiredFields &&
        validFieldsWithPattern &&
        validFieldsWithMinLengthMaxLength,
      [
        filledRequiredFields,
        validFieldsWithPattern,
        validFieldsWithMinLengthMaxLength,
      ],
    );

    useEffect(() => {
      console.log(formData, isValid);
    }, [formData, isValid]);

    return (
      <form ref={ref} {...props} action={formAction}>
        {JSON.stringify(state)}
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold">{form.form_name}</h1>
          {form.form_description && <p>{form.form_description}</p>}
        </div>
        <div className="grid gap-4">
          {form.form_fields.map(({ maxlength, minlength, ...field }) => {
            if (field.type === "text" || field.type === "password") {
              return (
                <Input
                  key={field.id}
                  name={field.id}
                  {...field}
                  maxLength={maxlength}
                  minLength={minlength}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      [field.id]: e.target.value,
                    }));
                  }}
                />
              );
            }

            if (field.type === "color") {
              return (
                <ColorInput
                  key={field.id}
                  {...field}
                  name={field.id}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      [field.id]: e.target.value,
                    }));
                  }}
                />
              );
            }

            if (field.type === "textarea") {
              return (
                <Textarea
                  name={field.id}
                  key={field.id}
                  {...field}
                  maxLength={maxlength}
                  minLength={minlength}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      [field.id]: e.target.value,
                    }));
                  }}
                />
              );
            }

            if (field.type === "select") {
              return (
                <Select
                  key={field.id}
                  {...field}
                  name={field.id}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      [field.id]: e.target.value,
                    }));
                  }}
                />
              );
            }

            if (field.type === "checkbox") {
              return (
                <Checkbox
                  key={field.id}
                  {...field}
                  name={field.id}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      [field.id]: e.target.checked,
                    }));
                  }}
                />
              );
            }

            if (field.type === "file") {
              return (
                <Dropzone
                  name={field.id}
                  key={field.id}
                  accept={field.formats}
                  multiple={(field.max_count && field.max_count > 1) || false}
                  onChange={(files) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      [field.id]: files,
                    }));
                  }}
                  {...field}
                />
              );
            }
          })}
        </div>
        <div className="mt-8 flex gap-2">
          {form.form_buttons.map(({ name, ...button }) => {
            if (button.type === "button") {
              return (
                <Link href="/" key={name}>
                  <Button variant="muted" {...button}>
                    {name}
                  </Button>
                </Link>
              );
            } else {
              return (
                <Button
                  className="flex-1"
                  disabled={!isValid}
                  variant={button.type === "submit" ? "primary" : "muted"}
                  key={name}
                  {...button}
                >
                  {name}
                </Button>
              );
            }
          })}
        </div>
      </form>
    );
  },
);

DynamicForm.displayName = "DynamicForm";
