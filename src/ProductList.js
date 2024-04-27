import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './ProductContext';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

function ProductList() {
    const { products } = useContext(ProductContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState(''); // Default sorting is empty string
    const [priceFilter, setPriceFilter] = useState(''); // Default price filter is empty string
    const { deleteProduct } = useContext(ProductContext);

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter products based on selected price range
    const priceFilteredProducts = priceFilter
        ? filteredProducts.filter(product => {
              switch (priceFilter) {
                  case '10-20':
                      return product.price >= 10 && product.price <= 20;
                  case '20-30':
                      return product.price > 20 && product.price <= 30;
                  case '30+':
                      return product.price > 30;
                  default:
                      return true;
              }
          })
        : filteredProducts;

    // Sort products based on selected sorting option or keep them unsorted
    const sortedProducts = priceFilteredProducts.slice().sort((a, b) => {
        if (sortBy === 'price') {
            return a.price - b.price; // Sort by price
        } else if (sortBy === 'name') {
            return a.productName.localeCompare(b.productName); // Sort by name
        }
        // Default: no sorting
        return 0;
    });

    // Handle search input change
    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    // Handle sorting option change
    const handleSortChange = event => {
        setSortBy(event.target.value);
    };

    // Handle price filter change
    const handlePriceFilterChange = event => {
        setPriceFilter(event.target.value);
    };

    return (
        <>
            <h1>Products</h1>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Form className="mb-3" style={{width: '300px'}}>
                            <FormControl
                                type="text"
                                placeholder="Search by product name"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </Form>
                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-end">
                        <Form className="mb-3" style={{ textAlign: 'right' }}>
                            <Form.Select onChange={handleSortChange} style={{width: 'auto', marginRight: '10px' }}>
                                <option value="">Default</option>
                                <option value="price">Sort by Price</option>
                                <option value="name">Sort by Name</option> {/* New sorting option */}
                            </Form.Select>
                        </Form>
                        <Form className="mb-3" style={{ textAlign: 'right'}}>
                            <Form.Select onChange={handlePriceFilterChange} style={{width: 'auto'}}>
                                <option value="">All Prices</option>
                                <option value="10-20">$10 - $20</option>
                                <option value="20-30">$20 - $30</option>
                                <option value="30+">$30+</option>
                            </Form.Select>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {sortedProducts.map(product => (
                        <Col key={product.id}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={product.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{product.productName}</Card.Title>
                                    <Card.Text>${product.price}</Card.Text>
                                    <Link to={`/products/${product.id}`} className="btn btn-secondary mx-1">
                                        View
                                    </Link>
                                    <Link to={`/products/${product.id}/edit`} className="btn btn-primary mx-3">
                                        Edit
                                    </Link>
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default ProductList;