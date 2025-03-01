'use client'
import React from 'react'
import { FaUser } from 'react-icons/fa'

export default function InicioSesionBoton() {
  
  return (
    <div className='px-6 py-3 rounded-lg bg-primary flex gap-2 items-center'>
      <span><FaUser color='white' /></span>
      <span>Iniciar Sesión</span>
    </div>
  )
}
