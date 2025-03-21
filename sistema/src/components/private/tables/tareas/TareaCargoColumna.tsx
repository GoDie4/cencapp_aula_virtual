import React, { useContext } from 'react'
import type { TestInterface, TestResuelto } from '../../../../interfaces/TestInterface'
import { type Curso } from '../../../../interfaces/CursoInterface'
import { ModalContext } from '../../../../context/ModalProvider'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import { Button, Menu, MenuItem } from '@mui/material'
import { IoMdSettings } from 'react-icons/io'
import { parseDate } from '../../../../logic/parseDate'
import ColocarPuntaje from './ColocarPuntaje'

export default function TareaCargoColumna({ ejer, curso, test, getEjercicios }: { ejer: TestResuelto, curso?: Curso, test: TestInterface, getEjercicios: () => Promise<void> }): JSX.Element {
  const { setModalContent } = useContext(ModalContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleClickArchivo = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    try {
      const respuesta = await axios.post(`${Global.url}/testsResuelto/documento`, {
        testId: ejer.id,
        userId: ejer.userId
      }, {
        headers: {
          Authorization: `Bearer ${token ?? ''}`
        },
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(respuesta.data)
      const a = document.createElement('a')
      a.href = url
      a.download = `${ejer.usuario.nombres}`
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
        <span>{curso?.nombre}</span>
      </div>
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Nombre Alumno
        </h5>
        <span>
          {ejer.usuario.nombres}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Examen
        </h5>
        <span className='text-main'>
          <button type='button' onClick={() => { handleClickArchivo() }}>Ver Examen</button>
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Estado del Examen
        </h5>
        <span>
          {ejer.estado}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Fecha Subido
        </h5>
        <span className=''>
          {parseDate(ejer.createdAt)}
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
          <MenuItem onClick={() => { setModalContent({ title: 'Colocar Puntaje', content: <ColocarPuntaje test={test} testResuelto={ejer} getEjercicios={getEjercicios} /> }) }}>Colocar Nota</MenuItem>
        </Menu>
      </div>

    </div>
  )
}
