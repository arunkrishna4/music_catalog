import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20 hover:-translate-y-0.5 hover:bg-[#1D4ED8] active:translate-y-0 active:bg-[#1E40AF]",

        outline:
          "border border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#2563EB] hover:bg-[#F8FAFC]",

        ghost:
          "text-[#2563EB] hover:bg-[#EFF6FF]",
      },

      size: {
        default: "h-12 px-5",
        sm: "h-10 rounded-lg px-4",
        icon: "h-10 w-10 rounded-lg p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <LoaderCircle
          className="h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}

      <span>{children}</span>
    </button>
  );
}