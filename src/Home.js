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
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">About Us</Link>
            <Link to="/products/new" className="nav-link">Products</Link>
            <Link to="/products/new" className="nav-link">Create new product</Link>
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