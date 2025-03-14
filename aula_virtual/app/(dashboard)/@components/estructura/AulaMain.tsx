'use client'
import { useAuth } from "@/context/AuthContext";
import React from "react";

export const AulaMain = () => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-800">
        {user?.nombres.split(" ")[0] ?? "" + user?.apellidos.split(" ")[0]}
      </h1>
      <p className="text-sm mt-1 text-gray-500">{currentDate}</p>
    </div>
  );
};
