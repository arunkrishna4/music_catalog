import * as React from "react";
import { cn } from "../../lib/utils";

type InputProps = React.ComponentProps<"input">;

export function Input({
  className,
  type,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] shadow-sm transition-all duration-200",
        "focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE] focus:outline-none",
        "hover:border-[#94A3B8]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}