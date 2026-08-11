"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
