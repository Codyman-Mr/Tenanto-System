import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
};

export function Button({ children, size = "md", className = "", ...props }: ButtonProps) {
  const sizeClass = size === "sm" ? "px-3 py-1 text-sm" : size === "lg" ? "px-5 py-3 text-lg" : "px-4 py-2";
  return (
    <button
      className={`bg-blue-600 text-white rounded hover:bg-blue-700 ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}