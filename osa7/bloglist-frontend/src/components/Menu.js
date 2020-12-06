import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/user-actions'
import React from 'react'
import { Button, Navbar, Nav, Row, Col } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  return (
    <Row>
      <Col>
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Item>
                <Link to='/'>
                  <Button
                    variant='outline-info'
                    size='sm'
                    style={{ margin: 5 }}
                  >
                    Blogs
                  </Button>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to='/users'>
                  <Button
                    variant='outline-info'
                    size='sm'
                    style={{ margin: 5 }}
                  >
                    Users
                  </Button>
                </Link>
              </Nav.Item>
            </Nav>
            <Nav className='ml-auto'>
              <Navbar.Text style={{ marginLeft: 5, marginRight: 5 }}>
                {user.name} logged in
              </Navbar.Text>
              <Nav.Item>
                <Button
                  variant='outline-info'
                  size='sm'
                  style={{ margin: 5 }}
                  onClick={() => dispatch(logout())}
                >
                  Log out
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  )
}

export default Menu
