export function convertirBytesAMb(bytes: number): string {
  const megabytes: number = bytes / (1024 * 1024);
  return `${megabytes.toFixed(2)} MB`;
}