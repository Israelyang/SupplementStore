// import React, { createContext, useState, useEffect } from "react"
// import axios from "axios"

// export const ProductContext = createContext()

// export const ProductProvider = (props) => {
//   const [products, setProducts] = useState([])

//   useEffect(() => {
//     async function getProducts() {
//       await refreshProducts()
//     }
//     getProducts()
//   }, []);

//   function refreshProducts() {
//     return axios.get("http://localhost:3001/products")
//         .then(response => {
//             setProducts(response.data)
//         })
//   }

//   function getProduct(id) {
//     return axios.get(`http://localhost:3001/products/${id}`)
//       .then(response =>
//         new Promise((resolve) => resolve(response.data))
//       )
//   }

//   function deleteProduct(id) {
//     axios.delete(`http://localhost:3001/products/${id}`)
//       .then(refreshProducts)
//   }

//   function addProduct(product) {
//     return axios.post("http://localhost:3001/products", product)
//     .then(response => {
//       refreshProducts()
//       return new Promise((resolve) => resolve(response.data))
//     })
//   }

//   function updateProduct(product) {
//     return axios.put(`http://localhost:3001/products/${product.id}`, product)
//     .then(response => {
//       refreshProducts()
//       return new Promise((resolve) => resolve(response.data))
//     })
//   }

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         getProduct,
//         deleteProduct,
//         addProduct,
//         updateProduct
//       }}
//     >
//       {props.children}
//     </ProductContext.Provider>
//   )
// }

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    refreshProducts();
  }, []);

  function refreshProducts() {
    axios.get("http://localhost:3001/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }

  function getProduct(id) {
    return axios.get(`http://localhost:3001/products/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching product:", error);
        throw error; // Re-throw error to handle it in the component
      });
  }

  function deleteProduct(id) {
    axios.delete(`http://localhost:3001/products/${id}`)
      .then(refreshProducts)
      .catch(error => {
        console.error("Error deleting product:", error);
      });
  }

  function addProduct(product) {
    return axios.post("http://localhost:3001/products", product)
      .then(response => {
        refreshProducts();
        return response.data;
      })
      .catch(error => {
        console.error("Error adding product:", error);
        throw error; // Re-throw error to handle it in the component
      });
  }

  function updateProduct(product) {
    return axios.put(`http://localhost:3001/products/${product.id}`, product)
      .then(response => {
        refreshProducts();
        return response.data;
      })
      .catch(error => {
        console.error("Error updating product:", error);
        throw error; // Re-throw error to handle it in the component
      });
  }

  // Function to filter products by a search query
  function filterProducts(query) {
    return products.filter(product =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Function to sort products by price (ascending)
  function sortProductsByPrice() {
    return [...products].sort((a, b) => a.price - b.price);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        getProduct,
        deleteProduct,
        addProduct,
        updateProduct,
        filterProducts,
        sortProductsByPrice
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};