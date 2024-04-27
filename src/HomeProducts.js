import React, { useContext, useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import { ProductContext } from './ProductContext'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import { useParams, useNavigate } from "react-router-dom";


function HomeProducts(props) {

    let {products} = useContext(ProductContext)
    
    let params = useParams();
    let navigate = useNavigate();

    let { getProduct, deleteProduct } = useContext(ProductContext);
    let [product, setProduct] = useState("");

    useEffect(() => {
        async function fetchProduct() {
            try {
                const product = await getProduct(params.productId);
                setProduct(product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        fetchProduct();
    }, [params.productId, getProduct]);

    function productList(products) {
        if (products === null) return
        return products.map((product) =>
            <ListGroup.Item key={product.id} variant={(product.productName)}>
                <Link to={`/products/${product.id}`} key={product.id}>
                    {product.productName}
                </Link>
            </ListGroup.Item>
        )
    }

    function handleDeleteProduct(id) {
        deleteProduct(id);
        navigate('/products');
    }


    let { id, productName, description, price, imageUrl } = product;

    return (
        <>
        <h1>Products</h1>
        <ProductContext.Consumer>
            {({ products }) => (
                <Row xs={1} md={2} lg={3} className="g-4">
                {products.slice(1,4).map(product => (
                    <Col key={product.id}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={product.imageUrl} />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>${product.price}</Card.Text>
                                <Link to={`/products/${product.id}`} className="btn btn-secondary mx-1" onClick={() => setProduct(prevProduct => ({ ...prevProduct, showDescription: !prevProduct.showDescription }))}>View</Link>
                                <Link to={`/products/${product.id}/edit`} className="btn btn-primary mx-3">Edit</Link>
                                <Button variant="danger" onClick={handleDeleteProduct.bind(this, id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
            )}
        </ProductContext.Consumer>
        </>
    )
}    

export default HomeProducts