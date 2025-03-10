"use client";

import { AuthProvider } from "@/context/AuthContext";
import { UserInterface } from "@/interfaces/AuthInteface";

export function Providers({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserInterface | null;
}) {
  return <AuthProvider userInitial={user}>{children}</AuthProvider>;
}
