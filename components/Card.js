import Link from 'next/link'
import AddToCartButton from './AddToCartButton'

export default function Card({ pet }) {
  return (
    <div className="flex pb-2">
      <div className="flex-none w-48 relative">
        <img src={pet.photo} alt={pet.name} className="absolute w-full h-full object-cover" />
      </div>
      <form className="flex-auto p-6">
        <div className="">
          <h1 className="text-xl font-semibold">
            <Link href={`/pets/${pet.id}`}>
              <a>{pet.name}</a>
            </Link>
          </h1>
          <div className="text-xl font-semibold text-gray-500">
            ${pet.price}
          </div>
        </div>
        <div className="flex space-x-3 mb-4 text-sm font-medium">
          <div className="flex-auto flex space-x-3">
            <AddToCartButton pet={pet} />
          </div>
        </div>
      </form>
    </div >
  )
}