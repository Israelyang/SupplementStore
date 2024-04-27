import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from './ProductContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProduct, updateProduct, addProduct } = useContext(ProductContext);
  
    const [product, setProduct] = useState({
      productName: '',
      description: '',
      price: '',
      imageUrl: '',
    });
  
    useEffect(() => {
      if (id) {
        async function fetchProduct() {
          try {
            const fetchedProduct = await getProduct(id);
            setProduct(fetchedProduct);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        }
        fetchProduct();
      }
    }, [id, getProduct]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        if (id) {
          await updateProduct(product);
        } else {
          await addProduct(product);
        }
        navigate('/products');
      } catch (error) {
        console.error('Error updating/adding product:', error);
      }
    };
  
    return (
      <div>
        <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
           <Form.Label>Product Name</Form.Label>
           <Form.Control
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Save</Button>
        </Form>
      </div>
    );
  }

export default ProductForm