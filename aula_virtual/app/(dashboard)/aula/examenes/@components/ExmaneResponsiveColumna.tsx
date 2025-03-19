'use client'
import { CursosUsuario } from "../../materiales/@interfaces/FetchMaterialInterface";
import { parseDate } from '@/logic/parseDate';
import React, { useContext } from 'react'
import { FaDownload } from 'react-icons/fa';
import { LuSend } from 'react-icons/lu';
import FormRespuesta from './FormRespuesta';
import { config } from '@/config/config';
import axios from 'axios';
import { DialogResponsiveContext } from '@/context/DialogResponsive';

interface Root {
  examenes: CursosUsuario[];
}

export default function ExmaneResponsiveColumna({ data }: { data: Root }) {
  const { handleClickOpen } = useContext(DialogResponsiveContext);
  const handleClickArchivo = async (id: string, nombre: string): Promise<void> => {
    const token = localStorage.getItem('token')
    try {
      const respuesta = await axios.get(`${config.apiUrl}/tests/documento/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token ?? ''}`
        },
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(respuesta.data)
      const a = document.createElement('a')
      a.href = url
      a.download = `${nombre}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    }
  }
  function enviarArchivoModal(id: string) {
    handleClickOpen({ title: 'Enviar respuesta', content: <FormRespuesta id={id} /> })
  }


  return (
    <>
      {data.examenes.map((curUs: CursosUsuario) => {
        console.log(curUs)
        if (curUs.curso) {
          if (curUs.curso.test) {
            return curUs.curso.test?.map((examen) => {
              return (
                <div
                  key={examen.id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-gray-900">
                      ID: {examen.id}
                    </p>
                    <span className="px-2 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {examen.estado}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 mt-2">
                    <span className="font-semibold">Titulo:</span>{" "}
                    {examen.titulo}
                  </p>
                  <p className="text-sm text-black-700">
                    <span className="font-semibold">Curso:</span>{" "}
                    {examen.curso?.nombre}
                  </p>
                  <p className="text-sm text-black-700">
                    <span className="font-semibold">Fecha Límite:</span>{" "}
                    {parseDate(examen.fecha_fin)}
                  </p>
                  <div className="mt-2">
                    <button title='descargar' onClick={() => { handleClickArchivo(examen.id, examen.titulo) }} className="text-primary-main hover:text-primary-900">
                      <FaDownload size={23} />
                    </button>
                    <button title='Enviar respuesta' onClick={() => { enviarArchivoModal(examen.id) }} className="text-secondary-500 hover:text-secondary-800">
                      <LuSend size={23} />
                    </button>
                  </div>
                </div>
              )
            })
          } else {
            return <></>
          }
        } else {
          return <></>
        }
      })}

    </>
  )
}
