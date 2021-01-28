import asyncRedis from '../asyncRedis'

export async function create(order) {
  await asyncRedis.set(`order:${order.id}`, JSON.stringify(order))
  return order
}

export async function get(orderId) {
  const json = await asyncRedis.get(`order:${orderId}`)
  return JSON.parse(json)
}