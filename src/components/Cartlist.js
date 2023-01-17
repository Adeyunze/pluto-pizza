import React from 'react';
import { usePizzaContext } from '../context';

const Cartlist = () => {
  const { cart, removeCartItem, clearCart } = usePizzaContext()

  return (
    <section className='my-9'>
      <div className='flex flex-wrap items-start px-7'>
        {cart.map((item) => {
          const {id, name, image, toppins, price, size} = item;
          return (
            <div key={id} className="bg-white shadow-md rounded-lg w-[300px] mt-4 mx-5">
              <img src={image} alt="cart-img" className='rounded-t-lg'/>
              <div className='p-3'>
                <p className='capitalize text-lg pt-3'>{name} ({size})</p>
                <p className='pt-2 font-bold'>£{price}</p>
                {toppins.length? <p className='capitalize pt-3'>Toppings: {toppins.join(', ')}</p>: ""}
                <button className='uppercase text-xs text-red-600' onClick={() => removeCartItem(id)}>remove</button>
              </div>
            </div>
          )

        })}
      </div>
      <div className='px-10 mt-8'>
        <button className='px-7 py-3 bg-[#1B557E] text-white mt-5 rounded mr-5' onClick={()=> clearCart()}>Clear Cart</button>
        <button className='px-7 py-3 border border-[#1B557E] text-[#1B557E] mt-5 rounded'>Checkout</button>
      </div>
    </section>
    
  )
}

export default Cartlist