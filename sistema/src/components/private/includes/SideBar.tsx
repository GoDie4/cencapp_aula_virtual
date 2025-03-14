import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
// Icons
import {
  RiLogoutCircleRLine,
  RiMenu3Line,
  RiCloseLine,
  //   RiStackFill,
  RiRadioButtonLine
} from 'react-icons/ri'

import axios from 'axios'
import { Global } from '../../../helper/Global'
import { icono } from '../../shared/Images'
import AdminSection from './section/AdminSection'
import ProfesorSection from './section/ProfesorSection'

const SideBar = (): JSX.Element => {
  const { auth, setAuth, setLoading, setShowNotificaciones } = useAuth()
  const token = localStorage.getItem('token')
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  //   const [showSubmenu2, setShowSubmenu2] = useState(false);

  const cerrarSession = async (): Promise<void> => {
    setLoading(true)
    const data = new FormData()
    data.append('_method', 'POST')

    await axios.post(`${Global.url}/logout`, data, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    localStorage.clear()
    setAuth({
      id: '',
      nombres: '',
      apellidos: '',
      email: '',
      rolId: null
    })
    navigate('/login')
    setLoading(false)
  }

  return (
    <>
      <div
        className={`xl:h-[96vh] fixed xl:static w-[70%] md:w-[40%] lg:w-[30%] xl:w-auto h-full lg:ml-4 top-0 my-auto lg:rounded-2xl bg-primary shadow-xl px-4 pb-4 pt-2 flex flex-col justify-between z-50 ${showMenu ? 'left-0' : '-left-full'
          } transition-all`}
      >
        <div>
          <nav className="py-4">
            <div
              className="relative mx-auto mb-4 cursor-pointer w-fit"
              onClick={() => {
                setShowNotificaciones(true)
              }}
            >
              <img
                src={icono}
                alt=""
                className="object-contain w-20 h-20 p-2 mx-auto border-2 border-gray-800 rounded-full"
              />
              <span className="absolute bottom-0 right-0 text-xl text-green-500 animate-pulse">
                <RiRadioButtonLine />
              </span>
            </div>
            <h2 className="text-sm font-bold text-center text-gray-300">
              {auth.nombres}
            </h2>
            <h2 className="text-xs text-center text-gray-400">{auth.email}</h2>
          </nav>
          <div className="mb-5 h-[1px] w-full bg-gray-500 text-gray-500 block" />
          {auth.rolId === 1 ? <AdminSection /> : <ProfesorSection />}
          {/* <ul className="p-0 ml-0">
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
                    to="categorias"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 99 ? 'before:bg-main' : 'before:bg-gray-500'
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
                    to="cursos"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 97 ? 'before:bg-main' : 'before:bg-gray-500'
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
                    to="beneficios"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 97 ? 'before:bg-main' : 'before:bg-gray-500'
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
                    to="secciones"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 96 ? 'before:bg-main' : 'before:bg-gray-500'
                      } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
                    onClick={() => {
                      handleItemClick(96)
                      setShowMenu(false)
                    }}
                  >
                    Secciones
                  </Link>
                </li>

                <li>
                  <Link
                    to="clases"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 95 ? 'before:bg-main' : 'before:bg-gray-500'
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
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 94 ? 'before:bg-main' : 'before:bg-gray-500'
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
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 93 ? 'before:bg-main' : 'before:bg-gray-500'
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
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${activeItem == 92 ? 'before:bg-main' : 'before:bg-gray-500'
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
            </li>
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
                to="ventas"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiStackFill className="text-main" /> Ventas
              </Link>
            </li>
          </ul> */}
        </div>
        <nav>
          <Link
            to={''}
            onClick={() => {
              void cerrarSession()
            }}
            className="flex items-center gap-4 px-4 py-2 transition-colors rounded-lg hover:bg-main_2-100 text-main hover:text-main"
          >
            <RiLogoutCircleRLine className="text-main " /> Cerrar sesión
          </Link>
        </nav>
      </div>
      <button
        onClick={() => {
          setShowMenu(!showMenu)
        }}
        className="fixed z-50 p-3 text-white rounded-full xl:hidden bottom-4 right-4 bg-main"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  )
}

export default SideBar
