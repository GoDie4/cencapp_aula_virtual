// export const Global = {
//   url: 'http://127.0.0.1:8000/api',
//   urlImages: 'http://127.0.0.1:8000'
// }

/*
export const Global = {
  url: 'https://api.servipacperu.com/public/api',
  urlImages: 'https://api.servipacperu.com/public'
}
*/

export const Global = {
  url: process.env.NEXT_PUBLIC_API_URL,
  urlImages: process.env.NEXT_PUBLIC_IMAGES_URL
}