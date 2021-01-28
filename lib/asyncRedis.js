import { promisify } from "util"

const redis = require("redis")
const client = redis.createClient(process.env.REDIS_URL)

client.on("error", function (error) {
  console.error("Redis Error: ", error)
})

const rpush = promisify(client.rpush).bind(client)
const lrange = promisify(client.lrange).bind(client)
const get = promisify(client.get).bind(client)
const set = promisify(client.set).bind(client)
const del = promisify(client.del).bind(client)

const asyncRedis = { rpush, lrange, get, set, del }
export default asyncRedis