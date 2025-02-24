/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/config/config";

export async function getUserData(token: string, userId: string) {
  try {
    const res = await fetch(`${config.apiUrl}/usuarios/perfil/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });


    let responseData;
    try {
      responseData = await res.json(); 
    } catch (error: any) {
      console.log(error);
      responseData = await res.text(); 
    }


    if (!res.ok) {
      throw new Error(
        `Error al obtener datos del usuario: ${res.status} - ${responseData}`
      );
    }

    return responseData;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
