import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { PizzaProvider } from './context';
import ScrollToTop from './components/ScrollToTop'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PizzaProvider>
      <BrowserRouter>
        <ScrollToTop/>
        <App />
      </BrowserRouter>
    </PizzaProvider>
  </React.StrictMode>
);