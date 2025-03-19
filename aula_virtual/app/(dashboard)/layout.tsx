import { DialogResponsiveProvider } from "@/context/DialogResponsive";
import { ProviderAula } from "./@components/ProviderAula";
import { redirect } from "next/navigation";
import axios from "axios";
import { config } from "@/config/config";
import { cookies } from "next/headers";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  if (!token) {
    console.log("No hay token");
    
    return;
  }

  if (token && token.split(".").length === 3) {
    try {
      const response = await axios.get(`${config.apiUrl}/user/yo`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      });

      return response.data.usuario;
    } catch (error) {
      console.log(error);
    }
  }
}

export default async function AulaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
    if (!user) {
      redirect("/");
    }
  return (
    <ProviderAula>
      <DialogResponsiveProvider>
        {children}
      </DialogResponsiveProvider>
    </ProviderAula>
  );
}
