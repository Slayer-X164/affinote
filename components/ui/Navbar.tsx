import Link from "next/link"


const Navbar = () => {
  return (
    <header className="w-full h-20  flex justify-center items-center px-3 mb-3 mt-2">
        <div className="max-w-6xl py-2 items-center w-full bg-rose-100/70  border-rose-300  rounded-full px-2 flex justify-between">
            <Link href={'/'}>
        <h3 className="text-xl lg:text-2xl font-semibold"><span className="text-rose-400  pl-3 font-bold">Affinote</span>.site</h3>
        </Link>
        <Link href={'#'}>
        <button className="cursor-pointer transition-all duration-300 active:scale-90 bg-rose-400 hover:bg-rose-500 py-1.5 px-4 text-neutral-50  border-neutral-900 font-semibold rounded-full">Contact</button>
        </Link>
        </div>
    </header>
  )
}

export default Navbar