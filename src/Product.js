import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from './ProductContext';
import { Card, Button } from 'react-bootstrap';

function Product() {
    const params = useParams();
    const navigate = useNavigate();
    const { getProduct, deleteProduct } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const product = await getProduct(params.id);
                setProduct(product);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        }
        fetchProduct();
    }, [params.id, getProduct]);

    function handleDeleteProduct(id) {
        deleteProduct(id);
        navigate('/products');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const { productName, description, price, imageUrl } = product;

    return (
        <Card className="align-self-start w-50 m-auto" style={{paddingBottom: '60px'}}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body >
                <Card.Title>{productName}</Card.Title>
                <Card.Subtitle>${price}</Card.Subtitle>
                <p>{description}</p>
                <Button variant="primary" onClick={() => navigate(`/products/${params.id}/edit`)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(params.id)}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default Product;