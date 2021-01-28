import { useContext } from 'react'
import CartIcon from './CartIcon'
import CartContext from './cartContext'
import getStripe from '../lib/utils/getStripe'

export default function ViewCartButton() {
  const { itemCount } = useContext(CartContext)

  const redirectToCheckout = async (event) => {
    const stripe = await getStripe()
    const response = await fetch("/api/checkout", { method: "POST" })
    const session = await response.json()
    const result = await stripe.redirectToCheckout({ sessionId: session.id })

    if (result.error) {
      // TODO: User surfaced error handling
      console.log("ViewCartButton Error", result.error)
    }
  }

  return (
    <button onClick={redirectToCheckout} className="py-4 px-2 relative rounded-full hover:text-gray-400 focus:text-gray-500" aria-label="Cart">
      <CartIcon />
      <span className="absolute inset-0 object-right-top -mr-6">
        <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white">
          {itemCount}
        </div>
      </span>
    </button>
  )
}