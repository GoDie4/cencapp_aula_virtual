"use client";
import { Header } from "../../components/public/estructura/Header";

export function HeaderLayout() {
  return (
    <>
      <Header />
      {
        // rutasPublicas.includes(pathname) || pathname.startsWith('/cursos/') || pathname.startsWith('/curso/') ? <Header /> : null
      }
    </>
  );
}
