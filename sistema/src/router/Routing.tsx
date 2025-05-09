import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import { PrivateLayout } from '../components/private/PrivateLayout'
// import { ListaBanners } from '../components/private/tables/banners/ListaBanners'
import { ListaCategorias } from '../components/private/tables/categorias/ListaCategorias'
import { CrearCategoria } from '../components/private/tables/categorias/CrearCategoria'
import { EditarCategoria } from '../components/private/tables/categorias/EditarCategoria'
import { ListaProductos } from '../components/private/tables/productos/ListaProductos'
import { CrearProducto } from '../components/private/tables/productos/CrearProducto'
import { EditarProducto } from '../components/private/tables/productos/EditarProducto'
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
import { ListaAlumnos } from '../components/private/tables/alumnos/ListaAlumnos'
import { CrearAlumno } from '../components/private/tables/alumnos/CrearAlumno'
import { EditarAlumno } from '../components/private/tables/alumnos/EditarAlumno'
import ListaSecciones from '../components/private/tables/secciones/ListaSecciones'
import CrearSeccion from '../components/private/tables/secciones/CrearSeccion'
import EditarSeccion from '../components/private/tables/secciones/EditarSeccion'
import ListaClases from '../components/private/tables/clases/ListaClases'
import CrearClase from '../components/private/tables/clases/CrearClase'
import EditarClase from '../components/private/tables/clases/EditarClase'
import ListaVentas from '../components/private/tables/ventas/ListaVentas'
import ListaExamen from '../components/private/tables/examenes/ListaExamen'
import CrearExamen from '../components/private/tables/examenes/CrearExamen'
import EditarExamen from '../components/private/tables/examenes/EditarExamen'
import ListaEjercicios from '../components/private/tables/ejercicios/ListaEjercicios'
import CrearEjercicios from '../components/private/tables/ejercicios/CrearEjercicios'
import EditarEjercicios from '../components/private/tables/ejercicios/EditarEjercicios'
import CargoCurso from '../components/private/tables/productos/CargoCurso'
import MatriculaCurso from '../components/private/tables/productos/MatriculaCurso'
import ListaMateriales from '../components/private/tables/materiales/ListaMateriales'
import CrearMateriales from '../components/private/tables/materiales/CrearMateriales'
import EditarMateriales from '../components/private/tables/materiales/EditarMateriales'
import VerCursosCargo from '../components/private/tables/profesores/VerCursosCargo'
import AlumnosMatriculados from '../components/private/tables/alumnos/AlumnosMatriculados'
import ExamenesCargo from '../components/private/tables/profesores/ExamenesCargo'
import EjerciciosCargo from '../components/private/tables/profesores/EjerciciosCargo'
import MaterialesCargo from '../components/private/tables/profesores/MaterialesCargo'
import EjerciciosCargoCrear from '../components/private/tables/profesores/EjerciciosCargoCrear'
import ExamenesCargoCrear from '../components/private/tables/profesores/ExamenesCargoCrear'
import MaterialesCargoCrear from '../components/private/tables/profesores/MaterialesCargoCrear'
import { ListaBeneficios } from '../components/private/tables/beneficios/ListarBeneficios'
import { AgregarBeneficio } from '../components/private/tables/beneficios/AgregarBeneficio'
import { EditarBeneficio } from '../components/private/tables/beneficios/EditarBeneficio'
import ExamenesCargoRevisar from '../components/private/tables/examenes/ExamenesCargoRevisar'
import ListaCertificados from '../components/private/tables/certificados/ListarCertificados'
import CrearCertificado from '../components/private/tables/certificados/AgregarCertificado'
import EditarCertificado from '../components/private/tables/certificados/EditarCertificado'
import ListaTareasCargo from '../components/private/tables/tareas/ListaTareasCargo'
import { ListaComentarios } from '../components/private/tables/comentarios/ListarComentarios'
import AsignarCurso from '../components/private/tables/alumnos/AsignarCurso'
import ExamenesTodosRevisar from '../components/private/tables/examenes/ExamenesTodosRevisar'

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="login" element={<Auth />} />
            <Route path="admin" element={<PrivateLayout />}>
              {/** Alumnos */}
              <Route path="alumnos/editar/:id" element={<EditarAlumno />} />
              <Route path="alumnos/agregar" element={<CrearAlumno />} />
              <Route path="alumnos" element={<ListaAlumnos />} />

              {/** Alumnos */}
              <Route path="alumnos/editar/:id" element={<EditarAlumno />} />
              <Route path="alumnos/asignar/:id" element={<AsignarCurso />} />
              <Route path="alumnos/agregar" element={<CrearAlumno />} />
              <Route path="comentarios" element={<ListaComentarios />} />

              {/** Beneficios */}
              <Route
                path="beneficios/editar/:id"
                element={<EditarBeneficio />}
              />
              <Route path="beneficios/agregar" element={<AgregarBeneficio />} />
              <Route path="beneficios" element={<ListaBeneficios />} />

              {/** Profesores */}
              <Route path="profesores" element={<ListaProfesor />} />
              <Route path="profesores/agregar" element={<CrearProfesor />} />
              <Route
                path="profesores/editar/:id"
                element={<EditarProfesor />}
              />
              {/* Ccategorias */}
              <Route index element={<ListaCategorias />} />
              <Route path="categorias" element={<ListaCategorias />} />
              <Route path="categorias/agregar" element={<CrearCategoria />} />
              <Route
                path="categorias/editar/:id"
                element={<EditarCategoria />}
              />
              {/* Cursos */}
              <Route path="cursos" element={<ListaProductos />} />
              <Route path="cursos/agregar" element={<CrearProducto />} />
              <Route path="cursos/editar/:id" element={<EditarProducto />} />
              <Route path="cursos/cargo/:id" element={<CargoCurso />} />
              <Route
                path="cursos/cargos/alumnos/:id"
                element={<AlumnosMatriculados />}
              />
              <Route
                path="cursos/matriculados/:id"
                element={<MatriculaCurso />}
              />
              {/** Secciones */}
              <Route path="secciones" element={<ListaSecciones />} />
              <Route path="secciones/agregar" element={<CrearSeccion />} />
              <Route path="secciones/editar/:id" element={<EditarSeccion />} />

              {/** Clases */}
              <Route path="clases" element={<ListaClases />} />
              <Route path="clases/agregar" element={<CrearClase />} />
              <Route path="clases/editar/:id" element={<EditarClase />} />

              {/** Ventas */}
              <Route path="ventas" element={<ListaVentas />} />

              {/** Examenes */}
              <Route path="examenes" element={<ListaExamen />} />
              <Route path="examenes/agregar" element={<CrearExamen />} />
              <Route path="examenes/editar/:id" element={<EditarExamen />} />
              <Route path="examenes/cargo/:id" element={<ExamenesCargo />} />
              <Route
                path="examenes/cargo/crear"
                element={<ExamenesCargoCrear />}
              />
              <Route
                path="examenes/cargo/revisar"
                element={<ExamenesCargoRevisar />}
              />
              <Route
                path='examenes/todos/revisar'
                element={<ExamenesTodosRevisar />}
              />

              {/* CERTIFICADOS */}
              <Route path="certificados" element={<ListaCertificados />} />
              <Route path="certificados/agregar" element={<CrearCertificado />} />
              <Route path="certificados/editar/:id" element={<EditarCertificado />} />
              <Route path="certificados/cargo/:id" element={<ExamenesCargo />} />

              {/** Ejercicios */}
              <Route path="ejercicios" element={<ListaEjercicios />} />
              <Route path="ejercicios/agregar" element={<CrearEjercicios />} />
              <Route
                path="ejercicios/editar/:id"
                element={<EditarEjercicios />}
              />
              <Route
                path="ejercicios/cargo/:id"
                element={<EjerciciosCargo />}
              />
              <Route
                path="ejercicios/cargo/crear"
                element={<EjerciciosCargoCrear />}
              />
              <Route
                path='tareas/cargo/revisar'
                element={<ListaTareasCargo />}
              />

              {/** Materiales */}
              <Route path="materiales" element={<ListaMateriales />} />
              <Route path="materiales/agregar" element={<CrearMateriales />} />
              <Route
                path="materiales/editar/:id"
                element={<EditarMateriales />}
              />
              <Route
                path="materiales/cargo/:id"
                element={<MaterialesCargo />}
              />
              <Route
                path="materiales/cargo/crear"
                element={<MaterialesCargoCrear />}
              />

              <Route path="cargos/:id" element={<VerCursosCargo />} />

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
