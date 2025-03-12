"use client";

import { AuthProvider } from "@/context/AuthContext";
import { UserInterface } from "@/interfaces/AuthInteface";
import { ModalRender } from "./modal/ModalRender";

export function Providers({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserInterface | null;
}) {
  return (
    <AuthProvider userInitial={user}>
      {children}

      <ModalRender />
    </AuthProvider>
  );
}
