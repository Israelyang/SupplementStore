import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import ProductList from './ProductList'
import Product from './Product'
import ProductForm from './ProductForm';
import About from './About';
import HomeProducts from './HomeProducts';
import Footer from './Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeProducts />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="products/:id" element={<Product />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App