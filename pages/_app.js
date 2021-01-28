import '../styles/globals.css'
import CartContext from '../components/cartContext'
import { useState, useEffect } from 'react'

function App({ Component, pageProps }) {
  const [itemCount, setItemCount] = useState(0)
  useEffect(async () => {
    const result = await fetch('/api/cart')
    const { cart } = await result.json()
    // TODO: Error handling and auth
    setItemCount(cart.length)
  })

  return (
    <CartContext.Provider value={{ itemCount, setItemCount }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  )
}

export default App
