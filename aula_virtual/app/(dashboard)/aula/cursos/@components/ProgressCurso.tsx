import React from "react";

export const ProgressCurso = ({
  progreso,
  version2,
}: {
  progreso: number;
  version2?: boolean;
}) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        {version2 ? (
          <span className="font-bold">{progreso}% completado</span>
        ) : (
          <>
            <span className="font-bold">{progreso}% </span>
            <p className="text-black-900">Topografía en obras civiles</p>
          </>
        )}
      </div>
      <div className="w-full mt-1 rounded-main overflow-hidden h-2 bg-gray-200 relative">
        <span
          style={{ width: `${progreso}%` }}
          className="block w-0 absolute top-0 left-0 h-full bg-secondary-main transition-all duration-500 ease-out"
        ></span>
      </div>
    </div>
  );
};
