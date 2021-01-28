import * as carts from "../../lib/repos/carts"

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  switch (req.method) {
    case 'PUT':
      await addToCart(req, res)
      break;
    case 'GET':
      await getCart(req, res)
      break;
    default:
      handleError(405, "Method Not Allowed", res)
  }
}

async function addToCart(req, res) {
  const [ok, maybeCart] = await carts.addProduct("fake-user-id", req.body.sku)
  if (ok) {
    res.statusCode = 201
    res.json({ cart: maybeCart })
  } else {
    handleError(400, "Invalid SKU", res)
  }
}

async function getCart(_req, res) {
  const cart = await carts.get("fake-user-id")
  res.statusCode = 200
  res.json({ cart })
}

function handleError(code, msg, res) {
  res.statusCode = code
  res.json({ error: msg })
}