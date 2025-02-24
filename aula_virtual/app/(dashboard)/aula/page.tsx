/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserData } from "@/libs/auth/getUserData";
import { jwtDecode } from "jwt-decode";
export default async function Aula() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let userId = "";

  if (!token) {
    redirect("/login");
  }

  let decoded;
  try {
    decoded = jwtDecode<any>(token);
    userId = decoded.id;
  } catch (error) {
    console.log(error);
    redirect("/login");
  }

  const data = await getUserData(token, userId);

  const user = data.usuario;

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <h1>Bienvenido, {user.nombres}</h1>
    </>
  );
}
