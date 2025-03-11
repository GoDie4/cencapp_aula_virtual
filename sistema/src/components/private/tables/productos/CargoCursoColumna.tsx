import { Button, Menu, MenuItem } from '@mui/material'
import { type CursosUsuarios } from '../../../../interfaces/CursoInterface'
import { DeleteItems } from '../../../shared/DeleteItems'
import { IoMdSettings } from 'react-icons/io'
import React from 'react'

export default function CargoCursoColumna ({ pro, token, getListaProfesores, totalPosts, cantidadRegistros, paginaActual, setpaginaActual }: { pro: CursosUsuarios, token: string, getListaProfesores: () => Promise<void>, totalPosts: number, cantidadRegistros: number, paginaActual: number, setpaginaActual: (pagina: number) => void }): JSX.Element {
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
      ruta: 'eliminarCargoCurso',
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
        <h5 className="md:hidden text-white font-bold mb-2">Nombres</h5>
        <span>{pro.usuario?.nombres}</span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Apellidos
        </h5>
        <span>{pro.usuario?.apellidos}</span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">Email</h5>
        <span>{pro.usuario?.email}</span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">Curso a Cargo</h5>
        <span>{pro.usuario?.celular}</span>
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
