import * as carts from "../../lib/repos/carts"

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  switch (req.method) {
    case 'PUT':
      addToCart(req, res)
      break;
    case 'GET':
      getCart(req, res)
      break;
    default:
      handleError(405, "Method Not Allowed", res)
  }
}

function addToCart(req, res) {
  const [ok, maybeCart] = carts.addProduct("fake-user-id", req.body.sku)
  if (ok) {
    res.statusCode = 201
    res.json({ cart: maybeCart })
  } else {
    handleError(400, "Invalid SKU", res)
  }
}

function getCart(_req, res) {
  const cart = carts.get("fake-user-id")
  res.statusCode = 200
  res.json({ cart })
}

function handleError(code, msg, res) {
  res.statusCode = code
  res.json({ error: msg })
}