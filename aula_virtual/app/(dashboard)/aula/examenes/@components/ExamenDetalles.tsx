'use client'

import { TestResuelto } from '@/interfaces/TestInterface'
import { parseDate } from '@/logic/parseDate'

export function ExamenDetalles({ curUs }: { curUs: TestResuelto }) {
  return (
    <>
      <div className="w-full h-auto p-2">
        <div className="space-y-4">
          <div>
            <h3 className='font-bold'>Código</h3>
            <p className='font-medium'>{curUs.id}</p>
          </div>
          <div>
            <h3 className='font-bold'>Nombre del Curso</h3>
            <p className='font-medium'>{curUs.examen.curso?.nombre}</p>
          </div>
          <div className='flex max-lg:flex-col w-full gap-4'>
            <div className='w-full lg:w-1/2'>
              <h3 className='font-bold'>Titulo del Examen</h3>
              <p className='font-medium'>{curUs.examen.titulo}</p>
            </div>
            <div className='w-full lg:w-1/2'>
              <h3 className='font-bold'>Estado</h3>
              <p className='font-medium'>{curUs.estado}</p>
            </div>
          </div>
          <div className='flex max-lg:flex-col w-full gap-4'>
            <div className='w-full lg:w-1/2'>
              <h3 className='font-bold'>Fecha Finalización</h3>
              <p className='font-medium'>{parseDate(curUs.createdAt)}</p>
            </div>
            <div className='w-full lg:w-1/2'>
              <h3 className='font-bold'>Puntaje Máximo</h3>
              <p className='font-medium'>{curUs.examen.puntaje_maxima}</p>
            </div>
          </div>
          <div className='w-full max-lg:flex-col flex gap-4'>
            {
              curUs.estado === "Finalizado" && (
                <div className='w-full'>
                  <h3 className='font-bold'>Puntaje Final</h3>
                  <p className='font-medium'>{curUs.puntaje_final}</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}