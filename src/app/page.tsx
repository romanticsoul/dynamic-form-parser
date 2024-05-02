"use client";
import { Button } from "@/components/button";
import { Dropzone } from "@/components/dropzone";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const initialFiles = Object.entries(localStorage)
      .filter(([key]) => key.endsWith(".json"))
      .map<File>(
        ([key, value]) => new File([value], key, { type: "application/json" }),
      );
    setFiles(initialFiles);
  }, [setFiles]);

  const handleChangeFile = async (newFiles: File[]) => {
    setFiles(newFiles);
    localStorage.clear();
    const results = await Promise.all(newFiles.map((file) => file.text()));
    results.forEach((content, i) =>
      localStorage.setItem(newFiles[i].name, content),
    );
  };

  return (
    <main>
      <Dropzone
        files={files}
        multiple
        accept=".json"
        onChange={handleChangeFile}
        appendFileItem={(file) => (
          <Link href={file.name.replace(/\.[^./]+$/, "")}>
            <Button variant="muted">Открыть</Button>
          </Link>
        )}
      />
    </main>
  );
}
