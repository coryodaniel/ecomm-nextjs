const proto = process.env.PROTOCOL || "https"
const domain = process.env.VERCEL_URL
const baseUrl = `${proto}://${domain}`

export default baseUrl