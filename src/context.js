/* eslint-disable no-unused-vars */
import React, {useContext, useEffect, useState} from "react";


const PizzaContext = React.createContext()


const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}
export const PizzaProvider = ({ children }) => {
  const [cart, setCart] = useState(getLocalStorage())
  
  const addToCart = (id, size, pizza, toppins, price) => {
    const newItem = {
      id,
      size,
      name: pizza.name,
      image: pizza.Image,
      toppins,
      price
    }
    setCart([...cart, newItem])
  }

  const removeCartItem = (id) => {
    const tempCart = cart.filter(item => item.id !== id)
    setCart(tempCart)
  }

  const clearCart = () => {
    setCart([])
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  },[cart])
  return (
    <PizzaContext.Provider value={{
      addToCart,removeCartItem, cart, clearCart
    }}>
      {children}
    </PizzaContext.Provider>
  )

}
export const usePizzaContext = () => {
  return useContext(PizzaContext)
}