type Props = {
  children: React.ReactNode;
}

export default function Label({ children, ...rest }: Readonly<Props>) {
  return (
    <label htmlFor="countries" className="mb-1.5 text-sm font-medium text-gray-400" {...rest}>
      {children}
    </label>
  )
}