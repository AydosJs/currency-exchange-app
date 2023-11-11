interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
}

export default function Button({
  children,
  className,
  type,
  ...otherProps
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 border w-full p-2.5 font-medium text-sm ${className}`}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
}
