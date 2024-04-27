import Stack from 'react-bootstrap/Stack'
import { Link, Outlet } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

function Home() {

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4p9-fC1kYw7cEZDkUWu2GTD77PDYE7RlaRA&s" alt="Logo" style={{width: '65px', height: '65px'}}></img>
          </Navbar.Brand>
          <Navbar.Brand>Litness</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/products/add" className="nav-link">Add Product</Link>
          </Nav>
          <Navbar.Text>
          </Navbar.Text>
        </Container>
      </Navbar>
      <Stack gap={3} className="col-md-10 mx-auto mt-3">
        <Outlet />
      </Stack>
    </>
  )
}

export default Home