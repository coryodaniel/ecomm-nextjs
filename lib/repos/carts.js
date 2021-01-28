import * as pets from "./pets"
import asyncRedis from '../asyncRedis'

export async function addProduct(sessionId, sku) {
  const pet = pets.findBySKU(sku)
  const key = cartSessionKey(sessionId)

  if (pet) {
    await asyncRedis.rpush(key, pet.sku)
    const cart = await get(sessionId)

    return [true, cart]
  } else {
    // TODO: error handling
    return [false, undefined]
  }
}

export async function get(sessionId) {
  const key = cartSessionKey(sessionId)
  const cart = await asyncRedis.lrange(key, 0, -1)
  return cart
}

export async function clear(sessionId) {
  const key = cartSessionKey(sessionId)
  await asyncRedis.del(key)
  return true
}

function cartSessionKey(sessionId) {
  return `cart:${sessionId}`
}