// This context just holds the item count for updating the cart icon.

import React from 'react'

const CartContext = React.createContext({
  itemCount: 0,
  setItemCount: () => { }
})

export default CartContext