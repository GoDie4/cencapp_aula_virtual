import React, { ReactNode } from "react";

export const WrapperCursos = ({ children }: { children: ReactNode }) => {
  return <div className="w-full space-y-6">{children}</div>;
};
