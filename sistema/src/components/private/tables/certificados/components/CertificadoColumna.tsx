import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Menu, MenuItem } from '@mui/material'
import { IoMdSettings } from 'react-icons/io'
import axios from 'axios'
import { type Certificado } from '../../../../../interfaces/CertificadoInterface'
import { DeleteItems } from '../../../../shared/DeleteItems'
import { Global } from '../../../../../helper/Global'

export default function CertificadoColumna ({
  certificado,
  token,
  getExamenes,
  totalPosts,
  cantidadRegistros,
  paginaActual,
  setpaginaActual
}: {
  certificado: Certificado
  token: string
  getExamenes: () => Promise<void>
  totalPosts: number
  cantidadRegistros: number
  paginaActual: number
  setpaginaActual: (pagina: number) => void
}): JSX.Element {
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
    navigate(`/admin/certificados/editar/${String(certificado.id) ?? ''}`)
  }

  const preguntar = (id: string): void => {
    DeleteItems({
      ruta: 'certificados/borrarCertificado',
      id,
      token,
      getData: getExamenes,
      totalPosts,
      cantidadRegistros,
      paginaActual,
      setpaginaActual
    })
  }

  const handleClickArchivo = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    try {
      const respuesta = await axios.get(
        `${Global.url}/certificados/documento/${String(certificado.id ?? '')}`,
        {
          headers: {
            Authorization: `Bearer ${token ?? ''}`
          },
          responseType: 'blob'
        }
      )

      const url = window.URL.createObjectURL(respuesta.data)
      const a = document.createElement('a')
      a.href = url
      a.download = `${certificado.nombre}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="grid items-center grid-cols-1 gap-4 p-4 mb-4 md:grid-cols-6 bg-secondary-900 rounded-xl">
      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">Código</h5>
        <span>{certificado.id}</span>
      </div>
      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">Nombre</h5>
        <span>{certificado.nombre}</span>
      </div>

      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">Certificado</h5>
        <span className="text-main">
          <button
            type="button"
            onClick={() => {
              handleClickArchivo()
            }}
          >
            Ver Certificado
          </button>
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">Curso</h5>
        <span>{certificado.curso.nombre}</span>
      </div>

      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">Usuario</h5>
        <span className="">{certificado.usuario.email}</span>
      </div>

      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">Acciones</h5>
        <Button
          id="basic-menu"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <IoMdSettings color="gray" size={25} />
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

          <MenuItem onClick={handleEditar}>Editar</MenuItem>
          <MenuItem
            onClick={() => {
              preguntar(certificado.id ?? '')
            }}
          >
            Eliminar
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
