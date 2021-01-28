import { useContext } from 'react'
import CartContext from '../components/cartContext'

const cartPath = "/api/cart"
const reqHeaders = { 'Content-Type': 'application/json' }

export default function AddToCartButton({ pet }) {
  const { _itemCount, setItemCount } = useContext(CartContext)

  const addToCart = async (event) => {
    const response = await fetch(cartPath, {
      method: "PUT",
      headers: reqHeaders,
      body: JSON.stringify({ sku: pet.sku })
    })

    if (response.ok) {
      const cart = await response.json()
      setItemCount(cart.length)
    } else {
      // TODO: User surfaced error handling
      console.log("AddToCartButton Error", response)
    }
  }

  return (
    <button
      className="p-2 flex items-center justify-center rounded-md h-9 border border-gray-300"
      type="button"
      onClick={addToCart}
    >
      Add to cart
    </button>
  )
}