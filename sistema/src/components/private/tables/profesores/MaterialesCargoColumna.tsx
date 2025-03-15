import { type MaterialesInterface } from "../../../../interfaces/MaterialesInterface";

export default function MaterialesCargoColumna ({ materiales, token, getMateriales, totalPosts, cantidadRegistros, paginaActual, setpaginaActual }: { materiales: MaterialesInterface, token: string, getMateriales: () => Promise<void>, totalPosts: number, cantidadRegistros: number, paginaActual: number, setpaginaActual: (pagina: number) => void }): JSX.Element {
  return (
    <div>MaterialesCargoColumna</div>
  )
}
