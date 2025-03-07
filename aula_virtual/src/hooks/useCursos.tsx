import { config } from "@/config/config";
import { Curso } from "@/interfaces/CursoInterface";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const getCursos = async (setCursos: Dispatch<SetStateAction<Curso[]>>) => {
  const response = await axios.get(`${config.apiUrl}/cursos`)
  console.log(response.data.cursos)
  setCursos(response.data.cursos)
}

export function useCursos () {
  const [cursos, setCursos] = useState<Curso[]>([])

  useEffect(() => {
    getCursos(setCursos)
  }, [])

  return {
    cursos
  }
}