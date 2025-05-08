import { Button, Menu, MenuItem } from '@mui/material'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import { DeleteItems } from '../../../shared/DeleteItems'
import { IoMdSettings } from 'react-icons/io'
import React from 'react'
import { parseDate } from '../../../../logic/parseDate'

export default function AsignarCursoColumna ({ pro, token, getListaProfesores, totalPosts, cantidadRegistros, paginaActual, setpaginaActual }: { pro: CursosUsuarios, token: string, getListaProfesores: () => Promise<void>, totalPosts: number, cantidadRegistros: number, paginaActual: number, setpaginaActual: (pagina: number) => void }): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }
  const preguntar = (idDiscreto: number): void => {
    console.log(idDiscreto)
    DeleteItems({
      ruta: 'cursos/eliminarManualmente',
      id: idDiscreto,
      token,
      getData: getListaProfesores,
      totalPosts,
      cantidadRegistros,
      paginaActual,
      setpaginaActual
    })
  }
  return (
    <>
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
        <span>#{pro.id}</span>
      </div>
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">Curso</h5>
        <span>{pro.curso?.nombre}</span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Categoria
        </h5>
        <span>{pro.curso?.categoria?.nombre}</span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">Horas</h5>
        <span>{pro.curso?.horas}</span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">Creado en</h5>
        <span>{parseDate(pro.curso?.createdAt)}</span>
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
          <MenuItem onClick={() => { preguntar(pro.id ?? 0) }}>Eliminar</MenuItem>
        </Menu>
      </div>
    </>
  )
}
