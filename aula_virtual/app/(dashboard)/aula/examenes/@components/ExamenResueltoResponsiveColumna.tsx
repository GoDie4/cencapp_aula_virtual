'use client'
import { TestResuelto } from '@/interfaces/TestInterface'
import { parseDate } from '@/logic/parseDate';
import React, { useContext } from 'react'
import { ExamenDetalles } from './ExamenDetalles';
import { DialogResponsiveContext } from '@/context/DialogResponsive';

interface Root2 {
  testResueltos: TestResuelto[]
}


export default function ExamenResueltoResponsiveColumna({ dataResueltos }: { dataResueltos: Root2 }) {
  const { handleClickOpen } = useContext(DialogResponsiveContext);

  const handleModal = (curUs: TestResuelto) => {
    handleClickOpen({
      title: 'Detalles del Examen',
      content: <ExamenDetalles curUs={curUs} />
    })
  }

  return (
    <>

      {dataResueltos.testResueltos.map((curUs: TestResuelto) => {
        return (
          <div
            key={curUs.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">ID: {curUs.id}</p>
              {curUs.estado === 'EnRevision' ?
                (
                  <span className="inline-flex px-2 text-xs font-semibold leading-5 bg-blue-300 rounded-full">
                    {curUs.estado}
                  </span>
                ) : (
                  <span className="px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                    {`${curUs.puntaje_final}/${curUs.examen.puntaje_maxima}`}
                  </span>)
              }

            </div>
            <p className="mt-2 text-sm text-gray-900">
              <span className="font-semibold">Nombre:</span> {curUs.examen.titulo}
            </p>
            <p className="text-sm text-black-700">
              <span className="font-semibold">Curso:</span> {curUs.examen.curso?.nombre}
            </p>
            <p className="text-sm text-black-700">
              <span className="font-semibold">Fecha Finalización:</span> {parseDate(curUs.createdAt)}
            </p>
            <div className="mt-2">
              <button className="text-primary-main hover:text-primary-900" onClick={() => { handleModal(curUs) }}>
                Ver Detalles
              </button>
            </div>
          </div>
        )
      })}

    </>
  )
}
