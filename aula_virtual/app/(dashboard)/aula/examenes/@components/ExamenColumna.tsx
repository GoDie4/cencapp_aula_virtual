'use client'
import React, { useContext } from 'react'
import { CursosUsuario } from '../../materiales/@interfaces/FetchMaterialInterface'
import { parseDate } from '@/logic/parseDate'
import axios from 'axios'
import { config } from '@/config/config'
import { FaDownload } from 'react-icons/fa'
import { LuSend } from 'react-icons/lu'
import { DialogResponsiveContext } from '@/context/DialogResponsive'
import FormRespuesta from './FormRespuesta'

interface Root {
  examenes: CursosUsuario[]
}

export default function ExamenColumna({ data }: { data: Root }) {
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
  function enviarArchivoModal (id: string) {
    handleClickOpen({ title: 'Enviar respuesta', content: <FormRespuesta id={id} /> })
  }


  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.examenes.map((curUs: CursosUsuario) => {
          console.log(curUs)
          if (curUs.curso) {
            if (curUs.curso.test) {
              return curUs.curso.test?.map((examen) => {
                return (
                  <tr key={examen.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {examen.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {examen.titulo}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-black-700">
                      {examen.curso?.nombre}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-black-700">
                      {parseDate(examen.fecha_fin)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                        {examen.estado}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap flex gap-3 items-center">
                      <button title='descargar' onClick={() => { handleClickArchivo(examen.id, examen.titulo) }} className="text-primary-main hover:text-primary-900">
                        <FaDownload size={23} />
                      </button>
                      <button title='Enviar respuesta' onClick={ () => { enviarArchivoModal(examen.id) }} className="text-secondary-500 hover:text-secondary-800">
                        <LuSend size={23} />
                      </button>
                    </td>
                  </tr>
                )
              })
            } else {
              return <></>
            }
          } else {
            return <></>
          }
        })}
      </tbody>
    </>
  )
}
