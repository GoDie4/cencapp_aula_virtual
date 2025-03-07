import { RiArrowDownSLine, RiLogoutCircleRLine } from 'react-icons/ri'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../helper/Global'
import { IoSearchSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { icono } from '../../shared/Images'
import { Toaster } from 'sonner'
import { WebSocketNotifications } from '../../shared/notificaciones/WebSocketNotification'

const Header = (): JSX.Element => {
  const { auth, setLoading, setAuth } = useAuth()
  const navigate = useNavigate()
  const [date] = useState(new Date())
  const [hora, setHora] = useState(date.toLocaleTimeString())
  const [, setOpen] = useState(false)

  const cerrarSession = async (): Promise<void> => {
    setLoading(true)
    const token = localStorage.getItem('token')

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

  const renderTime = (): string => {
    const date = new Date()
    const hora = date.toLocaleTimeString()
    return hora
  }

  useEffect(() => {
    setInterval(() => {
      setHora(renderTime())
    }, 1000)
  }, [])

  return (
    <>
      <header className="h-[7vh] md:h-[8vh] border-b border-secondary-100 py-8 px-4 md:p-4 flex items-center justify-between bg-primary md:rounded-xl relative">
        <div className="flex items-center justify-between gap-3 md:gap-0 w-full md:w-1/2 mr-3 md:mr-0">
          <div
            className="p-2"
            onClick={() => {
              setOpen(true)
            }}
          >
            <IoSearchSharp className="text-2xl md:hidden" />
          </div>
          <div className="hidden md:flex gap-3  items-center w-full text-gray-400">
            <p className="">{date.toLocaleDateString()}</p>
            <p>{/* date.toLocaleTimeString() */}{hora}</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
        <WebSocketNotifications/>

          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors">
                <img
                  title='perfil'
                  src={icono}
                  className="w-6 h-6 object-contain rounded-full"
                />
                <span className="line-clamp-1 hidden md:block">
                  {auth.nombres}
                </span>
                <RiArrowDownSLine />
              </MenuButton>
            }
            align="end"
            arrow
            transition
            menuClassName="bg-secondary-100 p-4"
          >
            <MenuItem className="p-0 hover:bg-transparent">
              <Link
                to="/perfil"
                className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
              >
                <img
                  title='perfil'
                  src={icono}
                  className="w-8 h-8 object-contain rounded-full"
                />
                <div className="flex flex-col text-sm">
                  <span className="text-sm text-gray-300">{auth.nombres}</span>
                  <span className="text-xs text-gray-400">{auth.email}</span>
                </div>
              </Link>
            </MenuItem>

            <hr className="my-4 border-gray-500" />
            <MenuItem className="p-0 hover:bg-transparent">
              <Link
                to=""
                onClick={() => {
                  void cerrarSession()
                }}
                className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
              >
                <RiLogoutCircleRLine /> Cerrar sesión
              </Link>
            </MenuItem>
          </Menu>
        </nav>
      </header>
      <Toaster position="top-center" richColors />
    </>
    // <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-between">
    //   <div className="flex gap-3 md:gap-5">
    //     <p className="font-bold text-white  text-sm md:text-xl">{title}</p>
    //   </div>
    //   <nav className="flex items-center gap-2">
    //     <Menu
    //       menuButton={
    //         <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors">
    //           <img
    //             src={icono}
    //             className="w-6 h-6 object-contain rounded-full"
    //           />
    //           <span>{auth.name}</span>
    //           <RiArrowDownSLine />
    //         </MenuButton>
    //       }
    //       align="end"
    //       arrow
    //       transition
    //       menuClassName="bg-secondary-100 p-4"
    //     >
    //       <MenuItem className="p-0 hover:bg-transparent">
    //         <Link
    //           to="/perfil"
    //           className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
    //         >
    //           <img
    //             src={icono}
    //             className="w-8 h-8 object-contain rounded-full"
    //           />
    //           <div className="flex flex-col text-sm">
    //             <span className="text-sm">{auth.name}</span>
    //             <span className="text-xs text-gray-500">{auth.email}</span>
    //           </div>
    //         </Link>
    //       </MenuItem>

  //       <hr className="my-4 border-gray-500" />
  //       <MenuItem className="p-0 hover:bg-transparent">
  //         <Link
  //         to=""
  //           onClick={() => { void cerrarSession() }}
  //           className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
  //         >
  //           <RiLogoutCircleRLine /> Cerrar sesión
  //         </Link>
  //       </MenuItem>
  //     </Menu>
  //   </nav>
  // </header>
  )
}

export default Header
