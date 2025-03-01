import { config } from "@/config/config";
import { Curso } from "@/interfaces/CursoInterface";
import axios from "axios";
import { useEffect, useState } from "react";

const getCursos = async () => {
  const response = await axios.get(`${config.apiUrl}/cursos`)
  
  return response.data.cursos
}

export function useCursos () {
  const [cursos, setCursos] = useState<Curso[]>([])

  useEffect(() => {
    getCursos().then(cursos => setCursos(cursos))
  })

  return {
    cursos
  }
}