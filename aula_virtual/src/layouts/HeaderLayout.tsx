'use client'
import { usePathname } from "next/navigation"
import { Header } from "../../components/public/estructura/Header"
import { useEffect } from "react"

const rutasPublicas = [
  '',
  '/',
  '/nosotros',
  '/inscripcion',
  '/contacto',
  '/capacitaciones'
]

export function HeaderLayout () {
  
  const pathname = usePathname()

  useEffect(() => {
    console.log(rutasPublicas.includes(pathname))
  }, [pathname])

  return (
    <>
      <Header />
      {
        // rutasPublicas.includes(pathname) || pathname.startsWith('/cursos/') || pathname.startsWith('/curso/') ? <Header /> : null
      }
    </>
  )
}