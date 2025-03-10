'use client'
import React, { ReactNode } from "react";

export const ContentMain = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};
