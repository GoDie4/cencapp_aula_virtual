export interface carrito {
    id: number | null
    nombre: string
    cantidad: number | null
    precio: number | null
    imagen1: string
}


export interface serviciosValues {
  id: number | null
  nombre: string
  caracteristicas: string
  imagen1: string
  created_at: string
  uptated_at: string
}

export interface mostrarValues{
  enlace: string
  imagen1: string
}
  
  export interface distribuidorValues{
    id: number
    nombre: string
    idCategoria: string
    categoria: string
    direccion: string
    correo: string
    celular: string
    horario: string
    lat: number
    lng: number
    imagen1: string
    departamento: string
    departamentos_id: string
    provincias_id: string
    id_distrito: string
    provincia: string
    distrito: string
  }



  
  export interface distribuidorValuesModificate{
    nombre: string
    idCategoria: string
    direccion: string
    correo: string
    celular: string
    horario: string
    lat: number
    lng: number
    departamento: string
    provincia: string
    distrito: string
  }


  export interface coberturasValuesModificate{
    id: string
    provincias_id: string
    provincia: string
    departamentos_id: string
    departamento: string
    distritos_id: string
    distrito: string
    imagen1: string
  }

  export interface departamentosValues{
    id: number
    nombre: string
  }
  
  export interface provinciasValues{
    id: number
    nombre: string
    id_provincia: string
    id_departamento: string
  }
  
  export interface distritosValues{
    id: number
    nombre: string
    id_provincia: string
  }
  export interface ConfiguracionValues {
    id: number | null
    celular1: string
    celular2: string
    correo1: string
    correo2: string
    direccion1: string
    direccion2: string
    direccion3: string
    facebook: string
    instagram: string
    youtube: string
    linkedin: string
    whatsapp: string
    horario: string
    precio1: string
    precio2: string
  }
  
  export interface Values {
    nombres: string
    celular: string
    email: string
    base_proyecto: string
    nombre_empresa: string
    historia_empresa: string
    principales_servicios: string
    colores: string
    referencias: string
    transmitir: string
  }
  
  export interface ImagenState {
    archivo: File | null
    archivoName: string
  }
  
  export interface ImagePreviewProps {
    url: string
    setUrl: React.Dispatch<React.SetStateAction<string>>
    boton: boolean
    setBoton: React.Dispatch<React.SetStateAction<boolean>>
    setImagen: React.Dispatch<React.SetStateAction<ImagenState>>
    clase: string
  }
  
  export interface ImagePreviewPropsUdpdate {
    globalUrl: string
    url: string
    setUrl: React.Dispatch<React.SetStateAction<string>>
    boton: boolean
    setBoton: React.Dispatch<React.SetStateAction<boolean>>
    imagen: string
    setImagen: React.Dispatch<React.SetStateAction<ImagenState>>
    clase: string
  }
  
  export interface interfaceListaDiseño {
    id: number
    nombres: string
    celular: number
    email: string
    nombre_empresa: string
    created_at: string
    uptated_at: string
  }
  
  // PAGINACION
  export interface paginacionValues {
    totalPosts: number
    cantidadRegistros: number
    paginaActual: number
    setpaginaActual: (pagina: number) => void
  }
  
  // DELETE
  export interface deleteValues {
    ruta: string
    id: number
    token: string | null
    getData: () => Promise<void>
    totalPosts: number
    cantidadRegistros: number
    paginaActual: number
    setpaginaActual: (pagina: number) => void
  }

  // BANNERS
  export interface bannersValues {
    id: number
    imagen1: string
    created_at: string | null
    updated_at: string | null
  }

    // OFERTAS
    export interface ofertasValues {
      id: number
      imagen1: string
      created_at: string | null
      updated_at: string | null
    }
    
  
  // MARCAS
  export interface marcasValues {
    id: number
    nombre: string
    imagen1: string
    created_at: string | null
    updated_at: string | null
  }
  
  // MARCAS
  // export interface marcasValue {
  //   id: number
  //   imagen1: string
  //   imagen2: string
  //   created_at: string | null
  //   updated_at: string | null
  // }
  
  // CATEGORIAS
  // LISTA
  export interface categoriasValues {
    id: number
    nombre: string
    imagen1: string
    descripcion: string
    created_at: string | null
    updated_at: string | null
  }
  // CREACION - UPDATE
  export interface categoriasValuesMoficate {
    nombre: string
  }

  export interface showcategoryValues{
    id: number
    id_categoria: string
    categoria: string
  }
  export interface subcategoriasValues {
    id: number
    nombre: string
    id_categoria: string
    created_at: string | null
    updated_at: string | null
  }
  
  // PRODUCTOS
  export interface productosValuesModificate {
    nombre: string
    descripcion: string
    idCategoria: string
  }
  
  // UPDATE-CREATE
  export interface segundaSeccionValuesModificate {
    titulo: string
    descripcion: string
  }
  
  export interface valoresValues {
    titulo: string
  }

  
  export interface blogsValues{
    titulo: string
    resumen: string
    imagen1: string
    descripcion: string
    created_at: string | null
    updated_at: string | null
  }
  
  export interface mapaValues {
    mapa: string
    mapa2: string
  }
  
  export interface editorValues {
    content: string
    setContent: React.Dispatch<React.SetStateAction<string>>
  }
  
  export interface arrayValues {
    id: number | null
    medida: string
    precio: string
    cantidad: string
    oferta: string
  }

  export interface mantenimientoValues{
    id: number
    valor: number
  }
  
  // PRODUCTOS
  export interface productosValues {
    id: number
    nombre: string
    id_categoria: string
    id_marca: string
    categoria: string
    marcas: string
    favoritos: string
    caracteristicas: string
    precio: number
    imagen1: string
    imagen2: string
    imagen3: string
    created_at: string | null
    updated_at: string | null
}
 

export interface bannerProductosValues{
  id: number
  nombre: string
  imagen1: string
  caracteristicas: string
}