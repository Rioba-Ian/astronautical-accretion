import React from "react";

interface BadgeProps {
  className?: string;
  content: string;
}

export default function Badge({ content }: BadgeProps) {
  return (
    <span className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold shadow-sm">
      {content}
    </span>
  );
}
