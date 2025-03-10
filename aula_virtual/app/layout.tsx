/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import { Toaster } from "sonner";
import { jwtDecode } from "jwt-decode";
import { Providers } from "./(landing)/@components/Providers";
import { cookies } from "next/headers";
import axios from "axios";
import { config } from "@/config/config";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  let userId = "";

  if (!token) {
    console.log("No hay token");
    return;
  }

  if (token && token.split(".").length === 3) {
    try {
      const decodedToken = jwtDecode<any>(token);

      userId = decodedToken.id;

      const response = await axios.get(
        `${config.apiUrl}/user/perfil/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuesta: ", response.data.usuario);

      return response.data.usuario;

    } catch (error) {
      console.log(error);
    }
  }
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Toaster position="top-center" richColors />
        <Providers user={user}>{children}</Providers>
      </body>
    </html>
  );
}
