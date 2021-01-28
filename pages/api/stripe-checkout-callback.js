import Stripe from 'stripe'
import * as orders from '../../lib/repos/orders'
import * as carts from '../../lib/repos/carts'
import cookie from 'cookie'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const STRIPE_SESSION_ID = 'stripe-session-id'

export default async (req, res) => {
  // TODO: Error handling
  const sessionId = req.cookies[STRIPE_SESSION_ID]
  const charge = await fetchCharge(sessionId)
  const order = await orders.create(charge)
  let results = await carts.clear("fake-user-id")

  res.setHeader('Set-Cookie', [cookie.serialize(STRIPE_SESSION_ID, '', { path: '/', maxAge: -1 })])
  res.writeHead(307, { Location: `/user/orders/${order.id}` })
  res.end()
}

async function fetchCharge(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
  const charges = paymentIntent.charges.data
  const charge = charges[charges.length - 1]

  return {
    total: charge.amount / 100,
    id: charge.id
  }
}