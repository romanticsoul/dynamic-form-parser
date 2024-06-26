"use server";

export async function parseFormData(_: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: data,
  };
}
