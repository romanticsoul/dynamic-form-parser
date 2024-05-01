"use client";
import { Button } from "@/components/button";
import { Dropzone } from "@/components/dropzone";

export default function Home() {
  // TODO:
  // const saveFile = (files: File[]) => {
  //   files.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const fileContent = event.target?.result;
  //       if (typeof fileContent === "string") {
  //         cookies().set(file.name, encodeURIComponent(fileContent));
  //       }
  //     };
  //     reader.readAsText(file);
  //   });
  // };

  return (
    <main className="container box-border flex min-h-svh max-w-lg flex-col justify-center py-12">
      <Dropzone
        multiple
        accept=".json"
        // onChange={saveFile}
        onDelete={(file) => console.log(file)}
        appendFileItem={(file) => <Button variant="muted">Открыть</Button>}
      />
    </main>
  );
}
