type OptionProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

export const Option: React.FC<OptionProps> = ({ value, className, children, ...rest }) => (
  <option value={value} className={`font-medium ${className}`} {...rest}>
    {children}
  </option>
);