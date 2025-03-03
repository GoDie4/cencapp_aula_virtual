export function parseDate (fechaISO: Date): string {
  const fecha = new Date(fechaISO)

  if (isNaN(fecha.getTime())) {
    return 'Fecha inválida'
  }

  return fecha.toLocaleString('es-ES')
}
