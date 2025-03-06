import { config } from "@/config/config"
import { Categoria } from "@/interfaces/CategoriaInterface"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

export const getCategorias = async (setCategorias: React.Dispatch<React.SetStateAction<Categoria[]>>) => {
  try {
    const response = await axios.get(`${config.apiUrl}/categorias`)
    setCategorias(response.data.categorias)
  } catch (e) {
    console.error(e)
    toast.error("No se pudieron obtener las categorias")
  }
}

export function useCategorias () {
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    getCategorias(setCategorias)
  }, [])

  return {
    categorias
  }
}