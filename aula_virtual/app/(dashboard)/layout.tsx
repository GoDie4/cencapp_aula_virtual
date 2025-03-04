"use client";
import { AulaProvider } from "@/context/AulaContext";
import { SideBarAula } from "./@components/estructura/SideBarAula";
import { useState } from "react";
import { HeaderAula } from "./@components/estructura/HeaderAula";

export default function AulaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ocultarSideBar, setOcultarSideBar] = useState<boolean>(false);
  localStorage.getItem("sidebar");
  return (
    <AulaProvider>
      <div className="flex">
        <SideBarAula
          ocultarSideBar={ocultarSideBar}
          setOcultarSideBar={setOcultarSideBar}
        />
        <div
          className={`${
            ocultarSideBar ? "w-[calc(100%-80px)]" : "w-[calc(100%-256px)]"
          } bg-secondary-50  transition-all duration-500 ease-out`}
        >
          <HeaderAula />
          <div className="w-full p-6">
            <div className="w-full bg-white-main p-4 rounded-main">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AulaProvider>
  );
}
