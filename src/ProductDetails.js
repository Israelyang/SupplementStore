// import React, { useContext, useState, useEffect } from 'react'
// import ListGroup from 'react-bootstrap/ListGroup'
// import Stack from 'react-bootstrap/Stack'
// import { Link, Outlet, useSearchParams } from 'react-router-dom'
// import { ProductContext } from './ProductContext'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
// import { Row } from 'react-bootstrap'
// import Col from 'react-bootstrap/Col'
// import { useParams, useNavigate } from "react-router-dom";


// function ProductDetails(props) {

//     let {products} = useContext(ProductContext)
//     let [searchParams, setSearchParams] = useSearchParams();
    
//     let params = useParams();
//     let navigate = useNavigate();

//     let { getProduct, deleteProduct } = useContext(ProductContext);
//     let [product, setProduct] = useState("");

//     useEffect(() => {
//         async function fetchProduct() {
//             try {
//                 const product = await getProduct(params.productId);
//                 setProduct(product);
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//             }
//         }
//         fetchProduct();
//     }, [params.productId, getProduct]);

//     function productList(products) {
//         if (products === null) return
//         return products.map((product) =>
//             <ListGroup.Item key={product.id} variant={variantFor(product.productName)}>
//                 <Link to={`/products/${product.id}`} key={product.id}>
//                     {product.productName}
//                 </Link>
//             </ListGroup.Item>
//         )
//     }

//     function handleSearch(event) {
//         let value = event.target.value
//         let params = value ? { query: value } : {}
//         setSearchParams(params)
//       }
    
//       function variantFor(productName) {
//         let query = searchParams.get("query")
//         return (productName.search(query) >= 0) ? "success" : ""
//     }

//     function handleDeleteProduct(id) {
//         deleteProduct(id);
//         navigate('/products');
//     }


//     let { id, productName, description, price, imageUrl } = product;

//     return (
//         <>
//         <h1>Products</h1>
//         <Form className="w-50 mb-3">
//             <FormControl type="search" placeholder="Search" className="me-2"
//                 value={searchParams.get("query") || ""}
//                 onChange={handleSearch} />
//         </Form>
//         <ProductContext.Consumer>
//             {({ product }) => (
//                 <Row xs={1} md={2} lg={3} className="g-4">
//                 {/* {products.map(product => ( */}
//                     <Col key={product.id}>
//                         <Card className="h-100">
//                             <Card.Img variant="top" src={product.imageUrl} />
//                             <Card.Body>
//                                 <Card.Title>{product.productName}</Card.Title>
//                                 <Card.Text>${product.price}</Card.Text>
//                                 {/* <Link to={`/products/${product.id}`} className="btn btn-secondary mx-1" onClick={() => setProduct(prevProduct => ({ ...prevProduct, showDescription: !prevProduct.showDescription }))}>View</Link> */}
//                                 <Link to={`/products/${product.id}/edit`} className="btn btn-primary mx-3">Edit</Link>
//                                 <Button variant="danger" onClick={handleDeleteProduct.bind(this, id)}>Delete</Button>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                     {/* ))} */}
//                 </Row>
//             )}
//         </ProductContext.Consumer>
//         </>
//     )
// }    

// export default ProductDetails

// import React, { useContext, useState, useEffect } from 'react';
// import { ProductContext } from './ProductContext';
// import { useParams } from 'react-router-dom';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

// function ProductDetail() {
//   const { getProduct } = useContext(ProductContext);
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const product = await getProduct(productId);
//         setProduct(product);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     }
//     fetchProduct();
//   }, [getProduct, productId]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const { productName, description, price, imageUrl } = product;

//   return (
//     <Card>
//       <Card.Img variant="top" src={imageUrl} />
//       <Card.Body>
//         <Card.Title>{productName}</Card.Title>
//         <Card.Text>Description: {description}</Card.Text> {/* Display the description */}
//         <Card.Text>Price: ${price}</Card.Text>
//         <Button variant="primary">Edit</Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default ProductDetail;

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from './ProductContext';
import { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Product() {
    let params = useParams();
    let navigate = useNavigate();

    let { getProduct, deleteProduct } = useContext(ProductContext);
    let [product, setProduct] = useState(null);

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

    function handleDeleteProduct(id) {
        deleteProduct(id);
        navigate('/products');
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    let { id, productName, description, price, imageUrl } = product;
    return (
        <Card className="align-self-start w-25">
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Subtitle>${price}</Card.Subtitle>
                <Link to={`/products/${id}`} className="btn btn-secondary mx-1" onClick={() => setProduct(prevProduct => ({ ...prevProduct, showDescription: !prevProduct.showDescription }))}>View</Link>
                {product.showDescription && <p>{description}</p>}
                <Link to={`/products/${id}/edit`} className="btn btn-primary mx-3">Edit</Link>
                <Button variant="danger" onClick={handleDeleteProduct.bind(this, id)}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default Product;