import { useState } from 'react'
import { RiArrowRightSLine, RiHomeWifiFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'

export default function ProfesorSection (): JSX.Element {
  const { auth } = useAuth()
  const [, setShowMenu] = useState(false)
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const handleItemClick = (itemId: number): void => {
    setActiveItem(itemId)
  }
  return (
    <ul className="ml-0 p-0">
      <li>
        <Link
          onClick={() => {
            setShowMenu(false)
          }}
          to={`cargos/${auth.id}`}
          className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
        >
          <span className="flex items-center gap-4">
            <RiHomeWifiFill className="text-main" /> Cursos a Cargo
          </span>
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            setShowSubmenu(!showSubmenu)
          }}
          className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
        >
          <span className="flex items-center gap-4">
            <RiHomeWifiFill className="text-main" /> Aula
          </span>
          <RiArrowRightSLine
            className={`mt-1 ${showSubmenu ? 'rotate-90' : ''
              } transition-all`}
          />
        </button>
        <ul
          className={` ${showSubmenu ? 'h-[290px]' : 'h-0'
            } overflow-y-hidden transition-all`}
        >
          <li>
            <Link
              to={`materiales/cargo/${auth.id}`}
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 99 ? 'before:bg-main' : 'before:bg-gray-500'
                } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(99)
                setShowMenu(false)
              }}
            >
              Materiales
            </Link>
          </li>

          <li>
            <Link
              to={`examenes/cargo/${auth.id}`}
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 98 ? 'before:bg-main' : 'before:bg-gray-500'
                } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(98)
                setShowMenu(false)
              }}
            >
              Examenes
            </Link>
          </li>

          <li>
            <Link
              to={`ejercicios/cargo/${auth.id}`}
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 97 ? 'before:bg-main' : 'before:bg-gray-500'
                } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(97)
                setShowMenu(false)
              }}
            >
              Ejercicios
            </Link>
          </li>

          <li>
            <Link
              to='examenes/cargo/revisar'
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 96 ? 'before:bg-main' : 'before:bg-gray-500'} before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(96)
                setShowMenu(false)
              }}
            >
              Examenes Por Revisar
            </Link>
          </li>

          <li>
            <Link
              to='tareas/cargo/revisar'
              className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 95 ? 'before:bg-main' : 'before:bg-gray-500'} before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
              onClick={() => {
                handleItemClick(95)
                setShowMenu(false)
              }}
            >
              Tareas Por Revisar
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  )
}
