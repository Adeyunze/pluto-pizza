import React from "react";
import { Route, Routes } from 'react-router-dom';
import Cart from "./components/Cart";
import Layout from "./components/Layout";
import PizzaPage from "./components/PizzaPage";
import SinglePizza from "./components/SinglePizza";


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<PizzaPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="product/:id" element={<SinglePizza />} />
      </Route>
    </Routes>
  );
}

export default App;