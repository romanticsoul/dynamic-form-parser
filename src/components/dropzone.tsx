"use client";

import { useRef, useState } from "react";
import { FileUpIcon, FileTextIcon, FileImageIcon, XIcon } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Button } from "./button";

type DropzoneProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> & {
  label?: React.ReactNode;
  onChange?: (files: File[]) => void;
  onDelete?: (file: File) => void;
  appendFileItem?: (file: File) => React.ReactNode;
};

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Б", "КБ", "МБ", "ГБ", "ТБ", "ПБ", "ЭБ", "ЗБ", "ЙБ"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  ({ className, style, appendFileItem, onDelete, onChange, ...props }, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = Array.from(e.target.files || []);
      updateFiles(newFiles);
    };

    const handleRemoveFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      onDelete?.(files[index]);
      updateFiles(newFiles);
    };

    const updateFiles = (files: File[]) => {
      const data = new DataTransfer();
      files.forEach((file) => data.items.add(file));
      if (inputRef.current) inputRef.current.files = data.files;
      onChange?.(files);
      setFiles(files);
    };

    return (
      <div className={cn("flex flex-col gap-1", className)} style={style}>
        {props.label && (
          <Label className="self-start" htmlFor={props.id}>
            {props.label}
          </Label>
        )}
        {/**
         * TODO: Второй вариант фона для Dropzone. Еще не решил, какой из них красивее (использовать вместо "bg-muted").
         * bg-[url('/dropzone-background.svg')] bg-[length:20px_20px] bg-center shadow-[inset_0px_0px_50px_30px_#f4f4f5]
         */}
        <div className="group relative flex flex-1 flex-col items-center justify-center gap-1 overflow-hidden rounded border-2 border-dashed bg-muted py-4 transition-colors hover:border-primary/20 has-[:focus-visible]:border-primary">
          <input
            type="file"
            onChange={handleChange}
            ref={ref || inputRef}
            {...props}
            className="peer absolute z-10 size-full  min-w-0 opacity-0"
          />
          <FileUpIcon className="size-9 transition-transform group-hover:scale-105 peer-focus-visible:scale-105" />
          <div className="text-center text-xs">
            <p className="font-bold">
              Перетащите сюда {props.multiple ? "ваши файлы" : "ваш файл"}
            </p>
            <p className="font-medium text-muted-foreground">
              или нажмите для выбора
            </p>
          </div>
        </div>
        {files.length > 0 && (
          <ul className="mt-1 grid gap-1">
            {files.map((file, index) => (
              <FileItem
                key={file.name}
                file={file}
                append={() => (
                  <>
                    <Button
                      variant="text"
                      className="size-10 p-0 opacity-50 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <span className="sr-only">Удалить изображение</span>
                      <XIcon className="size-4" />
                    </Button>
                    {appendFileItem && appendFileItem(file)}
                  </>
                )}
              />
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export const FileItem = ({
  file,
  append,
}: {
  file: File;
  append?: (file: File) => React.ReactNode;
}) => {
  return (
    <li key={file.name} className="group flex items-center gap-2">
      <div className="box-border grid size-11 place-items-center rounded border-2 bg-muted">
        {file.type.startsWith("image") ? (
          <FileImageIcon className="size-5" />
        ) : (
          <FileTextIcon className="size-5" />
        )}
      </div>
      <div className="flex-1 text-xs">
        <p className="font-bold">{file.name.replace(/\.\w+$/, "")}</p>
        <p className="font-medium text-muted-foreground">
          {formatBytes(file.size)}
        </p>
      </div>
      {append && append(file)}
    </li>
  );
};

Dropzone.displayName = "Dropzone";
