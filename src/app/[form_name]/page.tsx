"use client";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import type { Form } from "@/types/Form";
import { DynamicForm } from "@/modules/DynamicForm/dynamic-form";

export default function FormPage({
  params,
}: {
  params: { form_name: string };
}) {
  const [form, setForm] = useState<Form | null>(null);
  useEffect(() => {
    const form = localStorage.getItem(`${params.form_name}.json`);
    if (!form) notFound();
    setForm(JSON.parse(form));
  }, [setForm, params.form_name]);

  return form && <DynamicForm formSchema={form} />;
}
