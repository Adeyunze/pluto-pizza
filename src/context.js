/* eslint-disable no-unused-vars */
import React, {useContext, useEffect, useState} from "react";

// Initilize react context api
const PizzaContext = React.createContext()

// Initialize local storage
const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}


export const PizzaProvider = ({ children }) => {
  // Initialized cart variables
  const [cart, setCart] = useState(getLocalStorage())
  
  // This code creates and Adds new object to cart array
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

  // Removes cart item form cart using the filter method
  const removeCartItem = (id) => {
    const tempCart = cart.filter(item => item.id !== id)
    setCart(tempCart)
  }

  // This code Clears out the whole cart
  const clearCart = () => {
    setCart([])
  }

  // This code uses the useEffect hook to store the current state of the cart in local storage every time the cart state updates. This allows for persistence of the cart's data even when the user refreshes the page or closes the browser.
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