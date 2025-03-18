'use client'
import { DialogResponsiveContext } from "@/context/DialogResponsive";
import { TestResuelto } from "@/interfaces/TestInterface";
import { parseDate } from "@/logic/parseDate";
import { useContext } from "react";
import { ExamenDetalles } from "./ExamenDetalles";
interface Root2 {
  testResueltos: TestResuelto[]
}

export default function ExamenResueltoColumna({ dataResueltos }: { dataResueltos: Root2 }) {
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
          <tr key={curUs.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              {curUs.id}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
              {curUs.examen.titulo}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-black-700">
              {curUs.examen.curso?.nombre}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-black-700">
              {parseDate(curUs.createdAt)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {curUs.estado === 'EnRevision' ?
                (
                  <span className="inline-flex px-2 text-xs font-semibold leading-5 bg-blue-300 rounded-full">
                    {curUs.estado}
                  </span>
                ) : (
                  <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    {`${curUs.puntaje_final}/${curUs.examen.puntaje_maxima}`}
                  </span>)}

            </td>
            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
              <button className="text-primary-main hover:text-primary-900" onClick={() => { handleModal(curUs) }}>
                Ver Detalles
              </button>
            </td>
          </tr>
        )
      })}

    </>
  )
}