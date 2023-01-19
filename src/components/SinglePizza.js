/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { pizza, toppings } from '../pizza';
import { usePizzaContext } from '../context';

const SinglePizza = () => {
  // States and providers
  const [singleProduct, setSingleProduct] = useState([])
  const [toppins, setToppins] = useState([])
  const [size, setSize] = useState('small')
  const [price, setPrice] = useState(0)
  const [result, setResult] = useState(0)
  const {addToCart} = usePizzaContext()
  // React router useParams: Creates unique pages for multiple elements and Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
  const { id } = useParams();

  // Add toppins to pizza
  const addToppins = (e) => {
    let toppinsName = e.currentTarget.innerHTML
    // Checks if toppins haven't been added
    if(!toppins.includes(toppinsName)){
      // Adds new toppins to the end of array
      setToppins([...toppins, toppinsName])
    }


    const small = toppins.slice(0, 2)
    const medium = toppins.slice(0, 3)
    const large = toppins.slice(0, 5)
    // Checks for pizza size then add appropriate number of toppins
    // If pizza size is small, toppins is equal 2
    if(toppins.length >= 2 && size === 'small'){
      setToppins(small)
    }else if(toppins.length >= 3 && size === 'medium'){
      setToppins(medium)
    }else if(toppins.length >= 5 && size === 'large'){
      setToppins(large)
    }
}

  const changeSize = (e) => {
    setSize(e.target.value)
    setToppins([])
  }



  useEffect(() => {
    // Finds the products that matches the id param and find the properties from the pizza object and stores iit in a new variable
    const newProduct = pizza.find(single => single.id === parseInt(id))
    setSingleProduct(newProduct)
    // Sets prices for each pizza sizes
    if(size === "small"){
      setPrice(7.99)
    }else if(size === "medium"){
      setPrice(9.99)
    }else if(size === "large" ){
      setPrice(13.99)
    }

    // Calculates total price of pizza with toppins
    let tempresult = (toppins.length * 1.15) + price
    // Sets price to two decimal places to avoid long float numbers
    tempresult = (Math.round(tempresult * 100) / 100).toFixed(2)
    setResult(Number(tempresult))

  }, [id, price, size, toppins, result])




  // Destructures Array to make it easier accessing object keys
  const { name, Image } = singleProduct
  return (
    // Displays elements of each pizzas
    <article key={id} className="flex flex-col md:flex-row m-10">
      <div className='sm:max-w-3xl'>
        <img src={Image} alt={name} className='w-[100%] rounded'/>
      </div>
      <div className='md:pl-7 pl-0 pt-5 md:pt-0'>
        <h1 className='text-2xl'>{name}</h1>

        <div className='w-[300px] pt-3'>
          <label htmlFor="pizzaSizes" className="block mb-2 text-sm font-medium text-gray-900">Select Size</label>
          {/* This code Gets the current size of pizza and assign it to the size variable */}
          <select id="pizzaSizes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" onChange={(e) => changeSize(e)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className='mt-4'>
            <h1>Toppings (£1.15 for each)</h1>
          <div className='flex flex-col w-[300px] bg-white mt-3 p-5'>
            {/* Maps through toppins and creates a button for each */}
            {toppings.map(topps => {
              const {id, name} = topps
              return(
                <div key={id} className="mt-3">
                  <div className='flex items-center'>
                  <button className='capitalize ml-3 hover:text-[#1B557E]' onClick={(e) => addToppins(e)}>{name}</button>
                  </div>
                </div> 
              )
            })}
          </div>
          {/* If toppins array has elements display them and seperate each with a comma else return nothing*/}
          {toppins.length ? 
          <p className='text-md pt-5 capitalize'>
            Toppings: ({toppins.join(', ')})
          </p> : ""
          }
          {/* Display total price */}
          <p className='mt-10'><span className='text-xl'>Total:</span> £{result}</p>
          
          <Link to='/cart'>
            {/* Add to cart functionality (Created unique ID for each cart element using  Date.now() ) */}
            <button className='px-7 py-3 bg-[#1B557E] text-white mt-5 rounded' onClick={() => addToCart(Date.now(), size, singleProduct, toppins, result)}>Add to basket</button>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default SinglePizza