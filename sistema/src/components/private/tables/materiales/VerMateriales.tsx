import React from 'react'
import { type MaterialesInterface } from '../../../../interfaces/MaterialesInterface'
import { parseDate } from '../../../../logic/parseDate'

export default function VerMateriales({ materiales }: { materiales: MaterialesInterface }): JSX.Element {
  return (
    <div className="space-y-4">
      <div>
        <h3 className='font-bold'>Código</h3>
        <p className='font-medium'>{materiales.id}</p>
      </div>
      <div className='w-full'>
        <h3 className='font-bold'>Título del Material</h3>
        <p className='font-medium'>{materiales.nombre}</p>
      </div>
      <div className='w-full'>
        <h3 className='font-bold'>Nombre de Clase</h3>
        <p className='font-medium'>{materiales.clase?.nombre}</p>
      </div>
      <div className='w-full'>
        <h3 className='font-bold'>Descripción</h3>
        <div dangerouslySetInnerHTML={{ __html: materiales.descripcion }}></div>
      </div>
      <div>
        <h3 className='font-bold'>Fecha de Registro al Sistema</h3>
        <p className='font-medium'>{parseDate(materiales.createdAt ?? new Date())}</p>
      </div>
      <div>
        <h3 className='font-bold'>Fecha de Última Modificación</h3>
        <p className='font-medium'>{parseDate(materiales.updatedAt ?? new Date())}</p>
      </div>
    </div>
  )
}
