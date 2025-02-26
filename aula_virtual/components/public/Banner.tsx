import { JSX } from "react"

const Banner = ({ imagen, titulo }: { imagen: string, titulo: string }): JSX.Element => {
  return (
    <section className="bg-center px-5 py-20 pt-72 pb-32 relative before:absolute before:w-full before:h-full before:bg-black before:opacity-50 before:top-0 before:left-0" style={{ backgroundImage: `url(${imagen})` }}>
        <h1 className='text-white text-5xl text-center relative z-30'>{titulo}</h1>
    </section>
  )
}

export default Banner
