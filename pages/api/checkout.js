import Stripe from 'stripe'
import * as carts from '../../lib/repos/carts'
import * as pets from '../../lib/repos/pets'
import baseUrl from '../../lib/utils/baseUrl'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const skus = await carts.get("fake-user-id")
  const lineItems = createLineItemsFromSKUs(skus)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${baseUrl}/api/stripe-checkout-callback?success=true`,
    cancel_url: `${baseUrl}?canceled=true`,
  })

  res.json({ id: session.id })
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