import Link from "next/link"


const Navbar = () => {
  return (
    <header className="w-full h-20  flex justify-center items-center px-3">
        <div className="max-w-6xl py-2 items-center w-full border-2 border-neutral-300 rounded-full px-2 flex justify-between">
            <Link href={'/'}>
        <h3 className="text-xl lg:text-2xl font-semibold"><span className="text-rose-400  pl-3 font-bold">Affinote</span>.in</h3>
        </Link>
        <Link href={'#'}>
        <h3 className="bg-rose-500/80 py-1.5 px-4 text-neutral-50  border-neutral-900 font-semibold rounded-full">Contact</h3>
        </Link>
        </div>
    </header>
  )
}

export default Navbar