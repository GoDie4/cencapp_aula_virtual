import { useState } from 'react'
import { RiArrowRightSLine, RiHomeWifiFill, RiStackFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export default function AdminSection (): JSX.Element {
  const [, setShowMenu] = useState(false)
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const handleItemClick = (itemId: number): void => {
    setActiveItem(itemId)
  }
  return (
    <ul className="p-0 ml-0">
      <li>
        <Link
          onClick={() => {
            setShowMenu(false)
          }}
          to="profesores"
          className="flex items-center justify-between w-full px-4 py-2 transition-colors rounded-lg hover:bg-secondary-900"
        >
          <span className="flex items-center gap-4">
            <RiHomeWifiFill className="text-main" /> Profesores
          </span>
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            setShowSubmenu(!showSubmenu)
          }}
          className="flex items-center justify-between w-full px-4 py-2 transition-colors rounded-lg hover:bg-secondary-900"
        >
          <span className="flex items-center gap-4">
            <RiHomeWifiFill className="text-main" /> Aula
          </span>
          <RiArrowRightSLine
            className={`mt-1 ${showSubmenu ? 'rotate-90' : ''} transition-all`}
          />
        </button>
        <ul
          className={` ${
            showSubmenu ? 'h-[360px]' : 'h-0'
          } overflow-y-hidden transition-all`}
        >
          <li>
            <Link
              to="categorias"
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                activeItem == 99 ? 'before:bg-main' : 'before:bg-gray-500'
              } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(99)
                setShowMenu(false)
              }}
            >
              Categorias
            </Link>
          </li>

          <li>
            <Link
              to="beneficios"
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                activeItem == 97 ? 'before:bg-main' : 'before:bg-gray-500'
              } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(98)
                setShowMenu(false)
              }}
            >
              Beneficios
            </Link>
          </li>
          <li>
            <Link
              to="cursos"
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                activeItem == 97 ? 'before:bg-main' : 'before:bg-gray-500'
              } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(97)
                setShowMenu(false)
              }}
            >
              Cursos
            </Link>
          </li>

          <li>
            <Link
              to="secciones"
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                activeItem == 96 ? 'before:bg-main' : 'before:bg-gray-500'
              } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(96)
                setShowMenu(false)
              }}
            >
              Sesiones
            </Link>
          </li>

          <li>
            <Link
              to="clases"
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                activeItem == 95 ? 'before:bg-main' : 'before:bg-gray-500'
              } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(95)
                setShowMenu(false)
              }}
            >
              Clases
            </Link>
          </li>

          <li>
            <Link
              to="examenes"
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                activeItem == 94 ? 'before:bg-main' : 'before:bg-gray-500'
              } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(94)
                setShowMenu(false)
              }}
            >
              Examenes
            </Link>
          </li>

          <li>
            <Link
              to="ejercicios"
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                activeItem == 93 ? 'before:bg-main' : 'before:bg-gray-500'
              } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(93)
                setShowMenu(false)
              }}
            >
              Ejercicios
            </Link>
          </li>

          <li>
            <Link
              to="materiales"
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                activeItem == 92 ? 'before:bg-main' : 'before:bg-gray-500'
              } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(92)
                setShowMenu(false)
              }}
            >
              Materiales
            </Link>
          </li>
        </ul>
      </li>

      {/* <li>
                  <Link
                    onClick={()=> setShowMenu(false)}
                    to="configuracion/1"
                    className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
                  >
                    <RiStackFill className="text-main" /> Configuracion
                  </Link>
                </li> */}
      <li>
        <Link
          onClick={() => {
            setShowMenu(false)
          }}
          to="alumnos"
          className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
        >
          <RiStackFill className="text-main" /> Alumnos
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            setShowMenu(false)
          }}
          to="comentarios"
          className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
        >
          <RiStackFill className="text-main" /> Comentarios
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            setShowMenu(false)
          }}
          to="certificados"
          className="flex items-center justify-between w-full px-4 py-2 transition-colors rounded-lg hover:bg-secondary-900"
        >
          <span className="flex items-center gap-4">
            <RiHomeWifiFill className="text-main" /> Certificados
          </span>
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            setShowMenu(false)
          }}
          to="ventas"
          className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
        >
          <RiStackFill className="text-main" /> Ventas
        </Link>
      </li>
    </ul>
  )
}
