import { useContext } from 'react'
import CartIcon from './CartIcon'
import BadgeIcon from './BadgeIcon'
import CartContext from './cartContext'
import getStripe from '../lib/utils/getStripe'
import { useCookies } from 'react-cookie'
const STRIPE_SESSION_ID = 'stripe-session-id'

export default function ViewCartButton() {
  const { itemCount } = useContext(CartContext)
  const [cookies, setCookie] = useCookies([STRIPE_SESSION_ID])

  const redirectToCheckout = async (event) => {
    const stripe = await getStripe()
    const response = await fetch("/api/checkout", { method: "POST" })
    const session = await response.json()
    setCookie(STRIPE_SESSION_ID, session.id, { path: '/' })

    const result = await stripe.redirectToCheckout({ sessionId: session.id })

    if (result.error) {
      // TODO: User surfaced error handling
      console.log("ViewCartButton Error", result.error)
    }
  }

  return (
    <button disabled={itemCount == 0} onClick={redirectToCheckout} className="py-4 px-2 relative rounded-full" aria-label="Cart">
      <CartIcon />
      <BadgeIcon count={itemCount} />
    </button>
  )
}