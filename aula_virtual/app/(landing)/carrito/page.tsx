'use client'
import { useCarrito } from '@/store/useCarrito'
import s2 from '../../../assets/varios/c_banner.webp'
import Banner from '../../../components/public/Banner'
import CardCurso from '../../../components/public/curso/CardCurso'
export default function CarritoPage () {
  const { carrito } = useCarrito()
  return (
    <div className="w-full h-auto">
      <Banner titulo="Carrito" imagen={`${s2.src}`} />
      <main className='py-10 mx-auto w-dvw px-[120px] space-y-10'>
        <h3 className='text-4xl text-primary font-bold'>Mis Cursos en Carrito</h3>
        <div className="cursos__main">
            {
              carrito.map((c, idx) => (
                <CardCurso key={idx} id={String(idx)} img={c.imagen} titulo={c.nombre} precio={c.precio.toString()} horas={`${c.horas} horas`} />
              ))
            }
        </div>
      </main>
    </div>
  )
}