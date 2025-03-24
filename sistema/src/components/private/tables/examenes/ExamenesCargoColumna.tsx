import axios from 'axios'
import { type TestInterface, type TestResuelto } from '../../../../interfaces/TestInterface'
import { Global } from '../../../../helper/Global'
import { Button, Menu, MenuItem } from '@mui/material'
import { IoMdSettings } from 'react-icons/io'
import { parseDate } from '../../../../logic/parseDate'
import React, { useContext } from 'react'
import { ModalContext } from '../../../../context/ModalProvider'
import { type Curso } from '../../../../interfaces/CursoInterface'
import { ColocarPuntaje } from './ColocarPuntaje'

export function ExamenesCargoColumna ({ examenResuelto, curso, test, getExamenes }: { examenResuelto: TestResuelto, curso?: Curso, test: TestInterface, getExamenes: () => Promise<void> }): JSX.Element {
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
        testId: examenResuelto.id,
        userId: examenResuelto.userId
      }, {
        headers: {
          Authorization: `Bearer ${token ?? ''}`
        },
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(respuesta.data)
      const a = document.createElement('a')
      a.href = url
      a.download = `${examenResuelto.usuario.nombres}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="grid items-center grid-cols-1 gap-4 p-4 mb-4 md:grid-cols-6 bg-secondary-900 rounded-xl"
    >
      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">Código</h5>
        <span>{curso?.nombre}</span>
      </div>
      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">
          Nombre Alumno
        </h5>
        <span>
          {examenResuelto.usuario.nombres}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">
          Examen
        </h5>
        <span className='text-main'>
          <button type='button' onClick={() => { handleClickArchivo() }}>Ver Examen</button>
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">
          Estado del Examen
        </h5>
        <span>
          {examenResuelto.estado}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">
          Fecha Subido
        </h5>
        <span className=''>
          {parseDate(examenResuelto.createdAt)}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="mb-2 font-bold text-white md:hidden">
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
          <MenuItem onClick={() => { setModalContent({ title: 'Colocar Puntaje', content: <ColocarPuntaje test={test} testResuelto={examenResuelto} getExamenes={getExamenes} /> }) }}>Colocar Nota</MenuItem>
        </Menu>
      </div>

    </div>
  )
}
