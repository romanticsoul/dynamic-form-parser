type FieldType =
  | "text"
  | "password"
  | "color"
  | "select"
  | "textarea"
  | "file"
  | "checkbox";

type FormField = {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  options?: string[];
  multiple?: boolean;
  formats?: string;
  max_size?: number;
  max_count?: number;
  mask?: string;
};

type ButtonType = "button" | "submit";

type FormButton = {
  name: string;
  type: ButtonType;
};

export type Form = {
  form_name: string;
  form_description?: string;
  form_fields: FormField[];
  form_buttons: FormButton[];
};
