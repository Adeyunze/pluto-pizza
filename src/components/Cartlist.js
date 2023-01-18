import React from 'react';
import { usePizzaContext } from '../context';

const Cartlist = () => {
  // Getting functions and states from context api
  const { cart, removeCartItem, clearCart, total } = usePizzaContext()

  return (
    <section className='my-9'>
      <div className='flex flex-wrap items-start px-7'>
        {/* Maps through every items in the cartlist */}
        {cart.map((item) => {
          // Destructuring
          const {id, name, image, toppins, price, size} = item;
          return (
            <div key={id} className="bg-white shadow-md rounded-lg w-[300px] mt-4 mx-5">
              <img src={image} alt="cart-img" className='rounded-t-lg'/>
              <div className='p-3'>
                <p className='capitalize text-lg pt-3'>{name} ({size})</p>
                <p className='pt-2 font-bold'>£{price}</p>
                {/* Displays toppings if there's toppings and seperates them with a comma*/}
                {toppins.length? <p className='capitalize pt-3'>Toppings: {toppins.join(', ')}</p>: ""}
                {/* Removes element from cart */}
                <button className='uppercase text-xs text-red-600' onClick={() => removeCartItem(id)}>remove</button>
              </div>
            </div>
          )

        })}
      </div>
      <div className='px-10 mt-10'>
        <h1 className='text-xl'>Total: £{total}</h1>
        {/* This button Clears all element in cart*/}
        <button className='px-7 py-3 bg-[#1B557E] text-white mt-5 rounded mr-5' onClick={()=> clearCart()}>Clear Cart</button>
        {/* Fancy checkout button just for aesthetics*/}
        <button className='px-7 py-3 border border-[#1B557E] text-[#1B557E] mt-5 rounded'>Checkout</button>
      </div>
    </section>
    
  )
}

export default Cartlist