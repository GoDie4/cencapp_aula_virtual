import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import { PrivateLayout } from '../components/private/PrivateLayout'
import { ListaBanners } from '../components/private/tables/banners/ListaBanners'
import { ListaCategorias } from '../components/private/tables/categorias/ListaCategorias'
import { CrearCategoria } from '../components/private/tables/categorias/CrearCategoria'
import { EditarCategoria } from '../components/private/tables/categorias/EditarCategoria'
import { ListaProductos } from '../components/private/tables/productos/ListaProductos'
import { CrearProducto } from '../components/private/tables/productos/CrearProducto'
import { EditarProducto } from '../components/private/tables/productos/EditarProducto'
import { EditarConfiguracion } from '../components/private/tables/configuracion/EditarConfiguracion'
import { ListaTransacciones } from '../components/private/tables/transacciones/ListaTransacciones'
import { EditarTransaccion } from '../components/private/tables/transacciones/EditarTransaccion'
import Auth from '../components/public/Auth'
import { ListaDepartamentos } from '../components/private/tables/departamentos/ListaDepartamentos'
import { EditarDepartamento } from '../components/private/tables/departamentos/EditarDepartamento'
import { CrearDepartamento } from '../components/private/tables/departamentos/CrearDepartamento'
import { ListaDistritos } from '../components/private/tables/distritos/ListaDistritos'
import { CrearDistrito } from '../components/private/tables/distritos/CrearDistrito'
import { EditarDistrito } from '../components/private/tables/distritos/EditarDistrito'
import { ListaClientes } from '../components/private/tables/clientes/ListarClientes'
import { VerCliente } from '../components/private/tables/clientes/VerCliente'
import { ListaCupones } from '../components/private/tables/cupones/ListarCupones'
import { AgregarCupon } from '../components/private/tables/cupones/AgregarCupones'
import ListaProfesor from '../components/private/tables/profesores/ListaProfesor'
import CrearProfesor from '../components/private/tables/profesores/CrearProfesor'
import EditarProfesor from '../components/private/tables/profesores/EditarProfesor'
import ModalProvider from '../context/ModalProvider'
import ListaClases from '../components/private/tables/clases/ListaClases'
import CrearClase from '../components/private/tables/clases/CrearClase'
import EditarClase from '../components/private/tables/clases/EditarClase'
import EditarSeccion from '../components/private/tables/secciones/EditarSeccion'
import CrearSeccion from '../components/private/tables/secciones/CrearSeccion'
import ListaSecciones from '../components/private/tables/secciones/ListaSecciones'

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="login" element={<Auth />} />
            <Route path="admin" element={<PrivateLayout />}>
              <Route element={<ListaBanners />} />
              {/** Profesores */}
              <Route path="profesores" element={<ListaProfesor />} />
              <Route path="profesores/agregar" element={<CrearProfesor />} />
              <Route path="profesores/editar/:id" element={<EditarProfesor />} />
              {/* CATEGORIAS */}
              <Route index element={<ListaCategorias />} />
              <Route path="categorias" element={<ListaCategorias />} />
              <Route path="categorias/agregar" element={<CrearCategoria />} />
              <Route path="categorias/editar/:id" element={<EditarCategoria />} />
              {/* CURSOS */}
              <Route path="cursos" element={<ListaProductos />} />
              <Route path="cursos/agregar" element={<CrearProducto />} />
              <Route path="cursos/editar/:id" element={<EditarProducto />} />

              {/** Secciones */}
              <Route path="secciones" element={<ListaSecciones />} />
              <Route path="secciones/agregar" element={<CrearSeccion />} />
              <Route path="secciones/editar/:id" element={<EditarSeccion />} />

              {/** Clases */}
              <Route path="clases" element={<ListaClases />} />
              <Route path="clases/agregar" element={<CrearClase />} />
              <Route path="clases/editar/:id" element={<EditarClase />} />

              <Route path="cupones" element={<ListaCupones />} />
              <Route path="cupones/agregar" element={<AgregarCupon />} />

              <Route path="clientes" element={<ListaClientes />} />
              <Route path="clientes/viewCliente/:id" element={<VerCliente />} />

              <Route path="departamentos" element={<ListaDepartamentos />} />
              <Route
                path="departamentos/editar/:id"
                element={<EditarDepartamento />}
              />
              <Route
                path="departamentos/agregar"
                element={<CrearDepartamento />}
              />

              <Route path="distritos" element={<ListaDistritos />} />
              <Route path="distritos/agregar" element={<CrearDistrito />} />
              <Route path="distritos/editar/:id" element={<EditarDistrito />} />

              {/* CONFIGURACION */}
              <Route path="configuracion/:id" element={<EditarConfiguracion />} />
              <Route path="transacciones" element={<ListaTransacciones />} />
              <Route
                path="transacciones/viewTransaccion/:id"
                element={<EditarTransaccion />}
              />
            </Route>
            <Route path="*" element={<>Error 404</>} />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
