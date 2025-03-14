"use client";

import { AuthProvider } from "@/context/AuthContext";
import { UserInterface } from "@/interfaces/AuthInteface";
import { ModalRender } from "./modal/ModalRender";
import { useUser } from "@/store/useUser";

export function Providers({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserInterface | null;
}) {
  const { setUser } = useUser();

  if (user) {
    /*setUser(user);*/
  }
  return (
    <AuthProvider userInitial={user}>
      {children}

      <ModalRender />
    </AuthProvider>
  );
}
