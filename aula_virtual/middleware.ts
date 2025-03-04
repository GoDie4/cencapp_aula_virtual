import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1]; // Obtener el token del encabezado
    console.log(token)
  if (req.nextUrl.pathname.startsWith('/asdas')) {
    console.log(token)
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Llamada a la API para verificar el token
      await axios.get(`http://localhost:4000/api/alumno`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error)
      // Si la llamada a la API falla, el token no es válido
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
  /*
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/nosotros', req.url))
  }
  */
}

export const config = {
  matcher: ['/aula/:path*'],
};