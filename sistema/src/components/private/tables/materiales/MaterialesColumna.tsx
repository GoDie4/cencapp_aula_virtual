import React, { useContext } from 'react'
import { type MaterialesInterface } from '../../../../interfaces/MaterialesInterface'
import { DeleteItems } from '../../../shared/DeleteItems'
import { ModalContext } from '../../../../context/ModalProvider'
import { useNavigate } from 'react-router-dom'
import { Global } from '../../../../helper/Global'
import { Button, Menu, MenuItem } from '@mui/material'
import { IoMdSettings } from 'react-icons/io'
import VerMateriales from './VerMateriales'
import { parseDate } from '../../../../logic/parseDate'
import axios from 'axios'

export default function MaterialesColumna ({ materiales, token, getMateriales, totalPosts, cantidadRegistros, paginaActual, setpaginaActual }: { materiales: MaterialesInterface, token: string, getMateriales: () => Promise<void>, totalPosts: number, cantidadRegistros: number, paginaActual: number, setpaginaActual: (pagina: number) => void }): JSX.Element {
  const { setModalContent } = useContext(ModalContext)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }
  const handleEditar = (): void => {
    navigate(`/admin/materiales/editar/${materiales.id ?? ''}`)
  }

  const preguntar = (id: string): void => {
    DeleteItems({
      ruta: 'borrarMaterial',
      id,
      token,
      getData: getMateriales,
      totalPosts,
      cantidadRegistros,
      paginaActual,
      setpaginaActual
    })
  }

  const handleClickArchivo = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    try {
      const respuesta = await axios.get(`${Global.url}/materiales/documento/${materiales.id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token ?? ''}`
        },
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(respuesta.data)
      const a = document.createElement('a')
      a.href = url
      a.download = `${materiales.nombre}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
    >
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">Código</h5>
        <span>{materiales.id}</span>
      </div>
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Titulo
        </h5>
        <span>
          {materiales.nombre}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Material
        </h5>
        <span className='text-main'>
          <button type='button' onClick={() => { handleClickArchivo() }}>Ver Material</button>
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Creado en
        </h5>
        <span className=''>
          {parseDate(materiales.createdAt)}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Actualización en
        </h5>
        <span className=''>
          {parseDate(materiales.updatedAt)}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Acciones
        </h5>
        <Button
          id="basic-menu"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <IoMdSettings color='gray' size={25} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          aria-labelledby="basic-menu"
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          sx={{
            '& .MuiMenuItem-root': {
              backgroundColor: '#202020 !important',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black'
              }
            },
            '.css-6hp17o-MuiList-root-MuiMenu-list': {
              backgroundColor: '#202020 !important'
            }
          }}
        >
          <MenuItem onClick={() => { setModalContent({ title: 'Datos del Material', content: <VerMateriales materiales={materiales} /> }) }}>Ver</MenuItem>
          <MenuItem onClick={handleEditar}>Editar</MenuItem>
          <MenuItem onClick={() => { preguntar(materiales.id ?? '') }}>Eliminar</MenuItem>
        </Menu>
      </div>

    </div>
  )
}
