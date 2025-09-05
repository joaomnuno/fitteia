import React from "react";

export function Th({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <th className={`text-left text-xs font-semibold uppercase tracking-wider ${className}`}>{children}</th>;
}

export function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <td className={`align-middle ${className}`}>{children}</td>;
}
