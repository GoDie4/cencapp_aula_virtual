import { config } from "@/config/config"
import { Categoria } from "@/interfaces/CategoriaInterface"
import axios from "axios"
import { toast } from "sonner"

interface CategoriaReturn {
  categoria: Categoria
}

export async function getCategoriaSelected (nombre: string) {
  try {
    const response = await axios.get<CategoriaReturn>(`${config.apiUrl}/categoriasBuscar/${nombre}`)
    return response.data.categoria
  }
  catch (e) {
    console.error(e)
    toast.error("Error extrayendo la categoria seleccionada")
  }
}