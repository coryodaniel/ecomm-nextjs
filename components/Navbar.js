import Link from 'next/link'
import CheckoutButton from './CheckoutButton'

export default function NavBar({ title }) {
  return (
    <nav className="bg-gray-500">
      <div className="container mx-auto sm:px-6">
        <div className=" flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="text-black">
                  <img className="inline lg:hidden h-8" src="/logo.png" alt="PetShop" />
                  <img className="hidden lg:inline h-8" src="/logo.png" alt="PetShop" />
                  <span className="hidden sm:inline	md:inline lg:inline	px-2">{title}</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="absolute right-0 flex pr-2 sm:static">
            <CheckoutButton />
          </div>
        </div>
      </div>
    </nav>
  )
}