import { Button, Menu, MenuItem } from '@mui/material'
import VerEjercicio from './VerEjercicio'
import { IoMdSettings } from 'react-icons/io'
import { Global } from '../../../../helper/Global'
import { DeleteItems } from '../../../shared/DeleteItems'
import React, { useContext } from 'react'
import { ModalContext } from '../../../../context/ModalProvider'
import { useNavigate } from 'react-router-dom'
import { type TestInterface } from '../../../../interfaces/TestInterface'

export default function EjercicioColumna ({ ejer, token, getExamenes, totalPosts, cantidadRegistros, paginaActual, setpaginaActual }: { ejer: TestInterface, token: string, getExamenes: () => Promise<void>, totalPosts: number, cantidadRegistros: number, paginaActual: number, setpaginaActual: (pagina: number) => void }): JSX.Element {
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
    navigate(`/admin/examenes/editar/${ejer.id ?? ''}`)
  }

  const preguntar = (id: string): void => {
    DeleteItems({
      ruta: 'borrarTest',
      id,
      token,
      getData: getExamenes,
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
        <span>{ejer.id}</span>
      </div>
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Titulo
        </h5>
        <span>
          {ejer.titulo}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Examen
        </h5>
        <span className='text-main'>
          <a href={`${Global.urlImages}${ejer.url_archivo}`}>Ver Ejercicio</a>
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Activo
        </h5>
        <span>
          {ejer.activo ? 'Si' : 'No'}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Tipo
        </h5>
        <span className=''>
          {ejer.tipo_prueba}
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
          <MenuItem onClick={() => { setModalContent({ title: 'Datos del Examen', content: <VerEjercicio ejer={ejer} /> }) }}>Ver</MenuItem>
          <MenuItem onClick={handleEditar}>Editar</MenuItem>
          <MenuItem onClick={() => { preguntar(ejer.id ?? '') }}>Eliminar</MenuItem>
        </Menu>
      </div>

    </div>
  )
}
