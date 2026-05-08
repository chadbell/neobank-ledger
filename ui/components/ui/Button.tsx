interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50";
  const variants = {
    primary: "bg-[#c8e06b] text-gray-900 border-0",
    secondary: "bg-white text-gray-700 border border-gray-200",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
