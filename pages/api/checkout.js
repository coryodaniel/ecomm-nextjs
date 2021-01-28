import Stripe from 'stripe'
import * as carts from '../../lib/repos/carts'
import * as pets from '../../lib/repos/pets'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const url = getUrl()

export default async (req, res) => {
  const skus = carts.get("fake-user-id")
  const lineItems = createLineItemsFromSKUs(skus)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${url}/success.html`,
    cancel_url: `${url}/cancel.html`,
  })

  res.json({ id: session.id })
}

function getUrl() {
  const proto = process.env.PROTOCOL || "https"
  const domain = process.env.VERCEL_URL
  return `${proto}://${domain}`
}

function createLineItemsFromSKUs(skus) {
  const reducer = (lineItems, sku) => {
    const pet = pets.findBySKU(sku)
    lineItems.push(formatPetAsLineItem(pet))
    return lineItems
  }

  return skus.reduce(reducer, [])
}

function formatPetAsLineItem(pet) {
  return {
    price_data: {
      currency: 'usd',
      product_data: {
        name: pet.name,
        images: [pet.photo],
      },
      unit_amount: pet.price * 100,
    },
    quantity: 1
  }
}