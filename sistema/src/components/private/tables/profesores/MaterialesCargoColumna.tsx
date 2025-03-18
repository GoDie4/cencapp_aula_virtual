import { type MaterialesInterface } from '../../../../interfaces/MaterialesInterface'

export default function MaterialesCargoColumna ({ materiales, token, getMateriales, totalPosts, cantidadRegistros, paginaActual, setpaginaActual }: { materiales: MaterialesInterface, token: string, getMateriales: () => Promise<void>, totalPosts: number, cantidadRegistros: number, paginaActual: number, setpaginaActual: (pagina: number) => void }): JSX.Element {
  console.log(materiales)
  console.log(token)
  console.log(getMateriales)
  console.log(totalPosts)
  console.log(cantidadRegistros)
  console.log(paginaActual)
  console.log(setpaginaActual)
  return (
    <div>MaterialesCargoColumna</div>
  )
}
