import { Button, Menu, MenuItem } from '@mui/material'
import { type Ventas } from '../../../../interfaces/VentasInterface'
import React, { useContext } from 'react'
import { ModalContext } from '../../../../context/ModalProvider'
import { IoMdSettings } from 'react-icons/io'
import VerVenta from './VerVenta'
import VerDetalle from './VerDetalle'

export default function VentaColumnas ({ venta, token, getVentas, totalPosts, cantidadRegistros, paginaActual, setpaginaActual }: { venta: Ventas, token: string, getVentas: () => Promise<void>, totalPosts: number, cantidadRegistros: number, paginaActual: number, setpaginaActual: (pagina: number) => void }): JSX.Element {
  const { setModalContent } = useContext(ModalContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  console.log(venta)
  console.log(token)
  console.log(getVentas)
  console.log(totalPosts)
  console.log(cantidadRegistros)
  console.log(paginaActual)
  console.log(setpaginaActual)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
    >
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">Código</h5>
        <span>{venta.id}</span>
      </div>
      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Total
        </h5>
        <span>
          S/. {venta.total}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Usuario Email
        </h5>
        <span>
          {venta.usuario?.email}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Estado
        </h5>
        <span className='uppercase'>
          {venta.estado}
        </span>
      </div>

      <div className="md:text-center">
        <h5 className="md:hidden text-white font-bold mb-2">
          Id MercadoPago
        </h5>
        <span className=''>
          {venta.pedidoMercadoId}
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
          <MenuItem onClick={() => { setModalContent({ title: 'Datos de la Venta', content: <VerVenta venta={venta} /> }) }}>Ver Venta</MenuItem>
          <MenuItem onClick={() => { setModalContent({ title: 'Datos del Detalle', content: <VerDetalle detalle={venta.detalles ?? []} /> }) }}>Ver Detalle</MenuItem>
        </Menu>
      </div>

    </div>
  )
}
