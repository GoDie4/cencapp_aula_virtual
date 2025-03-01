import useAuth from '@/hooks/useAuth'
import React from 'react'
import { FaUserGraduate, FaUserTie } from 'react-icons/fa'

export default function UsuarioAutenticado() {
  const { user } = useAuth()	
  return (
    <div className='flex gap-2 items-center text-primary'>
      <span>{ user?.rolId === 2 ? <FaUserGraduate color=' #00365f' /> : <FaUserTie color=' #00365f' /> }</span>
      <h1>Hola {user?.nombres}</h1>
    </div>
  )
}
