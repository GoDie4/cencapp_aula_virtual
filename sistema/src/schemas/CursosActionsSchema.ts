import * as yup from 'yup'

export const CursosAsignarSchema = yup.object().shape({
  productoId: yup.string().required('El curso es requerido')
})
