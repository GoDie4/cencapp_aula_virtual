import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
// Icons
import {
  RiLogoutCircleRLine,
  RiMenu3Line,
  RiCloseLine,
  //   RiStackFill,
  RiArrowRightSLine,
  RiHomeWifiFill,
  RiRadioButtonLine,
  RiStackFill
} from 'react-icons/ri'

import axios from 'axios'
import { Global } from '../../../helper/Global'
import { icono } from '../../shared/Images'

const SideBar = (): JSX.Element => {
  const { auth, setAuth, setLoading, setShowNotificaciones, notificationCount } = useAuth()
  const token = localStorage.getItem('token')
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const [showSubmenu, setShowSubmenu] = useState(false)
  //   const [showSubmenu2, setShowSubmenu2] = useState(false);
  const [activeItem, setActiveItem] = useState(0)

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

  const handleItemClick = (itemId: number): void => {
    setActiveItem(itemId)
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
              className="relative w-fit mx-auto mb-4 cursor-pointer"
              onClick={() => {
                setShowNotificaciones(true)
              }}
            >
              <div className="w-6 h-6 bg-main rounded-full absolute top-0 -right-4 flex items-center justify-center p-2">
                {notificationCount}
              </div>
              <img
                src={icono}
                alt=""
                className="w-20 h-20 object-contain mx-auto border-gray-800 rounded-full border-2 p-2"
              />
              <span className="text-green-500 absolute bottom-0 text-xl right-0 animate-pulse">
                <RiRadioButtonLine />
              </span>
            </div>
            <h2 className="text-center text-gray-300 font-bold text-sm">
              {auth.nombres}
            </h2>
            <h2 className="text-center text-gray-400 text-xs">{auth.email}</h2>
          </nav>
          <div className="mb-5 h-[1px] w-full bg-gray-500 text-gray-500 block" />
          <ul className="ml-0 p-0">
            <li>
              <Link
                onClick={() => {
                  setShowMenu(false)
                }}
                to="profesores"
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
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
                className={` ${showSubmenu ? 'h-[100px]' : 'h-0'
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
              </ul>
            </li>

            {/* <li>
              <Link
                onClick={()=> setShowMenu(false)}
                to="configuracion/1"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
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
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Alumnos
              </Link>
            </li>
            {/* <li>
              <Link
                onClick={() => {
                  setShowMenu(false)
                }}
                to="clientes"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Clientes
              </Link>
            </li> */}
            {/* <li>
              <Link
                onClick={() => {
                  setShowMenu(false)
                }}
                to="cupones"
                className="flex items-center gap-4 py-2 px-4 rounded-lg text-white hover:bg-secondary-900 transition-colors"
              >
                <RiStackFill className="text-main" /> Cupones
              </Link>
            </li> */}
            {/* <li>
              <button
                onClick={() => {
                  setShowSubmenu2(!showSubmenu2);
                }}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiHomeWifiFill className="text-main" /> Delivery
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${
                    showSubmenu2 ? 'rotate-90' : ''
                  } transition-all`}
                />
              </button>
              <ul
                className={` ${
                  showSubmenu2 ? 'h-[100px]' : 'h-0'
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="departamentos"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                      activeItem == 99 ? 'before:bg-main' : 'before:bg-gray-500'
                    } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
                    onClick={() => {
                      handleItemClick(99);
                      setShowMenu(false);
                    }}
                  >
                    Departamentos
                  </Link>
                </li>

                <li>
                  <Link
                    to="distritos"
                    className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute ${
                      activeItem == 97 ? 'before:bg-main' : 'before:bg-gray-500'
                    } before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors`}
                    onClick={() => {
                      handleItemClick(97);
                      setShowMenu(false);
                    }}
                  >
                    Distritos
                  </Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
        <nav>
          <Link
            to={''}
            onClick={() => {
              void cerrarSession()
            }}
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-main_2-100 text-main transition-colors hover:text-main"
          >
            <RiLogoutCircleRLine className="text-main " /> Cerrar sesión
          </Link>
        </nav>
      </div>
      <button
        onClick={() => {
          setShowMenu(!showMenu)
        }}
        className="xl:hidden fixed bottom-4 right-4 bg-main text-white p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  )
}

export default SideBar
