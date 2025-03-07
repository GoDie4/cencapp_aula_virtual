import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { type ProfesorInterface } from '../../../../interfaces/ProfesoresInterface'

import React, { useContext } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { DeleteItems } from '../../../shared/DeleteItems'
import { ModalContext } from '../../../../context/ModalProvider'
import VerProfesor from './VerProfesor'

function formatTitle (title: string): string {
  if (!title) return title // Manejar cadenas vacías o nulas
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
}

export default function ProfesoresColumnas ({ pro, token, getProfesores, totalPosts, cantidadRegistros, paginaActual, setpaginaActual }: { pro: ProfesorInterface, token: string, getProfesores: () => Promise<void>, totalPosts: number, cantidadRegistros: number, paginaActual: number, setpaginaActual: (pagina: number) => void }): JSX.Element {
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
    navigate(`/admin/profesores/editar/${pro.id ?? ''}`)
  }

  const preguntar = (id: string): void => {
    DeleteItems({
      ruta: 'borrarProfesor',
      id,
      token,
      getData: getProfesores,
      totalPosts,
      cantidadRegistros,
      paginaActual,
      setpaginaActual
    })
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
    >
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">Código</h5>
        <span>{pro.id}</span>
      </div>
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Nombres
        </h5>
        <span>
          {pro.nombres}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Apellidos
        </h5>
        <span>
          {pro.apellidos}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Email
        </h5>
        <span>
          {pro.email}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Rol
        </h5>
        <span className=''>
          {formatTitle(pro.rol?.nombre ?? '')}
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
          <MenuItem onClick={() => { setModalContent({ title: 'Datos del Profesor', content: <VerProfesor pro={pro} /> }) }}>Ver</MenuItem>
          <MenuItem onClick={handleEditar}>Editar</MenuItem>
          <MenuItem onClick={() => { preguntar(pro.id ?? '') }}>Eliminar</MenuItem>
          <MenuItem >Darle un curso</MenuItem>
          <MenuItem >Ver cursos a cargo</MenuItem>
        </Menu>
      </div>

    </div>
  )
}
