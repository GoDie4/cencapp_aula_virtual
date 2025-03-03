export function formatUrl(text: string): string {
  // 1. Reemplazar espacios con guiones
  let formattedText = text.replace(/\s+/g, '-');

  // 2. Reemplazar caracteres con tilde
  const replacements: { [key: string]: string } = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'ñ': 'n',
    'ü': 'u',
    'Á': 'A',
    'É': 'E',
    'Í': 'I',
    'Ó': 'O',
    'Ú': 'U',
    'Ñ': 'N',
    'Ü': 'U',
  };

  formattedText = formattedText.replace(/[áéíóúñüÁÉÍÓÚÑÜ]/g, (match) => replacements[match]);

  // 3. Convertir a minúsculas (opcional, pero común en URLs)
  formattedText = formattedText.toLowerCase();

  return formattedText;
}

export function revertUrl(formattedText: string): string {
  // 1. Reemplazar guiones con espacios
  let revertedText = formattedText.replace(/-/g, ' ');

  /*  revertedText = revertedText.replace(/[aeiounAEIOUN]/g, (match) => replacements[match] || match); */

  return revertedText;
}