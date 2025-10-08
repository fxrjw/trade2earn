import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("card p-5 shadow-glow", className)} {...props} />;
}

export function Button({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "rounded-2xl px-4 py-2 bg-blue-600 hover:bg-blue-500 transition font-medium",
        className
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "bg-transparent border rounded-xl px-3 py-2 w-full border-white/15 outline-none focus:ring-2 focus:ring-blue-600",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-sm text-white/80", className)} {...props} />;
}
