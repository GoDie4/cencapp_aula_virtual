import { JSX } from "react"

const Banner = ({ imagen, titulo }: { imagen: string, titulo: string }): JSX.Element => {
  return (
    <section className="relative px-5 py-20 pt-32 pb-20 bg-center before:absolute before:w-full before:h-full before:bg-black-main before:opacity-50 before:top-0 before:left-0" style={{ backgroundImage: `url(${imagen})` }}>
        <h1 className='relative z-30 text-3xl text-center text-white-main md:text-4xl'>{titulo}</h1>
    </section>
  )
}

export default Banner
