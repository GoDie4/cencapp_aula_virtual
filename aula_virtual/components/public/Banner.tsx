import { JSX } from "react"

const Banner = ({ imagen, titulo }: { imagen: string, titulo: string }): JSX.Element => {
  return (
    <section className="bg-center px-5 py-20 pt-32  pb-20 relative before:absolute before:w-full before:h-full before:bg-black-main before:opacity-50 before:top-0 before:left-0" style={{ backgroundImage: `url(${imagen})` }}>
        <h1 className='text-white-main text-3xl md:text-4xl  text-center relative z-30'>{titulo}</h1>
    </section>
  )
}

export default Banner
