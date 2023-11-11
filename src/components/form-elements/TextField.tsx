import { InputHTMLAttributes } from "react";

type TextFieldProps = {
  value?: number;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField: React.FC<TextFieldProps> = ({ value, placeholder, ...rest }) => (
  <input
    placeholder={placeholder}
    className="p-2 font-medium border rounded-md first-letter placeholder:text-sm"
    value={value}
    {...rest}
  />
);

export default TextField;





