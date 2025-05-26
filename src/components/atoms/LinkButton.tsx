import React from "react";

interface LinkButtonProps {
  href: string;
  className?: string;
  ariaLabel?: string;
  title?: string;
  disabled?: boolean;
}

export default function LinkButton({
  disabled,
  className,
  ariaLabel,
  title,
  href,
}: LinkButtonProps) {
  return (
    <a
      href={disabled ? "#" : href}
      tabIndex={disabled ? 1 : 0}
      className={`group inline-block ${className}`}
      aria-label={ariaLabel}
      title={title}
      aria-disabled={disabled}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span
        className={`bg-gray-800 text-white hover:bg-gray-700 inline-block rounded-md border-2 border-skin-accent px-4 py-2 text-sm font-medium transition-colors duration-200 ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {title || "Click Here"}
      </span>
    </a>
  );
}
