"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-glow/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-glow text-midnight-deep hover:bg-emerald-glow/90 shadow-[0_0_20px_rgba(52,245,182,0.35)] hover:shadow-[0_0_30px_rgba(52,245,182,0.55)]",
        glass:
          "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10 hover:border-emerald-glow/40",
        outline:
          "border border-emerald-glow/50 text-emerald-glow hover:bg-emerald-glow/10",
        ghost:
          "text-white/70 hover:text-white hover:bg-white/5",
        sunset:
          "bg-sunset text-white hover:bg-sunset/90 shadow-[0_0_20px_rgba(255,138,61,0.35)]",
        destructive:
          "bg-red-500 text-white hover:bg-red-500/90",
        link: "text-emerald-glow underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
