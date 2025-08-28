import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ children, className = "", ...props }: SelectProps) {
  return (
    <select {...props} className={`w-full border border-gray-300 rounded px-3 py-2 ${className}`}>
      {children}
    </select>
  );
}