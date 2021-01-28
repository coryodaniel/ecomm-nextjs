import * as pets from "./pets"

let fakeCartDb = {
  "fake-user-id": []
}

export function addProduct(sessionId, sku) {
  let cart = fakeCartDb[sessionId]
  const pet = pets.findBySKU(sku)

  if (pet) {
    cart.push(sku)
    console.log(`SKU: ${sku} added to cart.`)

    return [true, cart]
  } else {
    // TODO: error handling
    return [false, undefined]
  }
}

export function get(sessionId) {
  return fakeCartDb[sessionId]
}