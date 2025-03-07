import React, { ReactNode } from "react";

export const TitleAula = ({
  titulo,
  children,
}: {
  titulo: string;
  children?: ReactNode;
}) => {
  return (
    <header className="bg-primary-950 rounded-t-main flex items-center justify-between">
      <div className="py-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl  font-bold text-white-main">{titulo}</h2>
      </div>
      {children}
    </header>
  );
};
